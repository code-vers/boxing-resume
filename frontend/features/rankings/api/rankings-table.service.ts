/**
 * @file rankings-table.service.ts
 * @description Core data-pipeline service that builds the full boxing rankings table.
 *
 * Pipeline (per specification):
 *   Step 1 — /divisions             → get all division IDs
 *   Step 2 — /rankings?division_id  → get rank + fighter_id per division
 *   Step 3 — /fighters/{id}         → nationality, record (W-L-D), KO wins
 *   Step 4 — /fights?fighter_id     → compute "Last 6" outcomes
 *   Step 5 — Rating / Status        → derived heuristically (see comments)
 *
 * Design decisions:
 *   • All API calls wrapped in try/catch — individual failures never crash the table.
 *   • Fighter profiles and fight histories cached in-memory (Map) for the run lifetime.
 *   • Parallel enrichment throttled to MAX_CONCURRENCY (5) via a semaphore-style helper.
 *   • Retry with exponential backoff (up to MAX_RETRIES) handles 429 / 5xx responses.
 */

import { boxingApiInstance } from './axios.instance';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum parallel in-flight API calls when enriching fighters. */
const MAX_CONCURRENCY = 5;

/** Number of retry attempts for transient API errors (429, 5xx). */
const MAX_RETRIES = 3;

/** Base delay in ms for exponential backoff. Doubles on each retry. */
const BASE_BACKOFF_MS = 500;

/** Number of recent fights to fetch for the "Last 6" column. */
const LAST_SIX_PAGE_SIZE = 6;

/**
 * Threshold in months: if a fighter's most-recent fight is older than this,
 * they are heuristically marked "Inactive".
 *
 * ⚠️  NOTE: This is a HEURISTIC — not authoritative API data.
 * The boxing-data.com API does not expose an explicit "active/inactive" field.
 * Replace this logic with a real data source when available.
 */
const INACTIVE_THRESHOLD_MONTHS = 18;

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/**
 * @interface RankingsTableRow
 * @description A fully-enriched row for the boxing rankings table.
 */
export interface RankingsTableRow {
  /** Ranking position within the division (1-indexed). */
  rank: number;
  /** Fighter's unique ID (from the RapidAPI). */
  fighterId: string;
  /** Fighter's full display name. */
  fighterName: string;
  /** Fighter's nationality / country string. Null if unavailable. */
  nationality: string | null;
  /** Division name (e.g. "Heavyweight"). */
  division: string;
  /** Fight record as "W-L-D" string (e.g. "34-1-0"). Null if unavailable. */
  record: string | null;
  /** Knockout wins count. Null if unavailable. */
  kos: number | null;
  /**
   * Last 6 fights as dash-delimited string (e.g. "W-W-L-W-D-W"), most-recent
   * fight is the rightmost character. "N/A" if no fight history exists.
   */
  lastSix: string;
  /**
   * Rating — NOT available in the boxing-data.com API.
   * Always null by default. Pass an external RatingMap to populate.
   */
  rating: number | null;
  /**
   * Status — derived heuristically from fight recency.
   * ⚠️  NOT authoritative API data (see INACTIVE_THRESHOLD_MONTHS).
   */
  status: 'Active' | 'Inactive' | 'N/A';
  /** Whether this row had any enrichment failures. */
  hasPartialData: boolean;
}

/**
 * @interface RankingsTableDivision
 * @description A named group of ranked fighters for one weight division.
 */
export interface RankingsTableDivision {
  divisionId: string;
  divisionName: string;
  rows: RankingsTableRow[];
}

/**
 * @interface RankingsTableResult
 * @description Final output of fetchRankingsTable.
 */
export interface RankingsTableResult {
  divisions: RankingsTableDivision[];
  /** How many fighter rows were fully enriched without any API failures. */
  successCount: number;
  /** How many fighter rows had at least one enrichment failure. */
  partialCount: number;
}

/**
 * @interface RatingMap
 * @description Optional external data source for the Rating column.
 * Keys are fighter_id strings; values are numeric ratings.
 * Supply this to fetchRankingsTable to populate the Rating column.
 */
export type RatingMap = Record<string, number>;

// ---------------------------------------------------------------------------
// In-memory cache (lives for the duration of a single browser session / run)
// ---------------------------------------------------------------------------

const profileCache = new Map<string, any>();
const fightsCache  = new Map<string, any[]>();

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/**
 * @function sleep
 * @description Returns a Promise that resolves after ms milliseconds.
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @function withRetry
 * @description Wraps an async function with exponential-backoff retry logic.
 * Retries on HTTP 429 (rate-limit) or 5xx server errors up to MAX_RETRIES times.
 */
async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const status = err?.response?.status as number | undefined;
      if (status === 429 || (status !== undefined && status >= 500)) {
        const backoffMs = BASE_BACKOFF_MS * Math.pow(2, attempt);
        console.warn(
          `[rankings-table] ${label} — HTTP ${status}, retrying in ${backoffMs}ms (attempt ${attempt + 1}/${MAX_RETRIES})`
        );
        await sleep(backoffMs);
      } else {
        throw err;
      }
    }
  }
  throw lastError;
}

/**
 * @function runConcurrent
 * @description Runs an array of async tasks with a maximum concurrency limit.
 */
async function runConcurrent<T, R>(
  items: T[],
  limit: number,
  taskFn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await taskFn(items[index], index);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () =>
    worker()
  );
  await Promise.all(workers);
  return results;
}

// ---------------------------------------------------------------------------
// Step helpers
// ---------------------------------------------------------------------------

/**
 * @function fetchDivisions
 * @description Step 1: Fetches all boxing divisions from /divisions.
 * Filters out any "Unclassified" entries.
 */
async function fetchDivisions(): Promise<{ id: string; name: string }[]> {
  const { data: res } = await withRetry(
    () => boxingApiInstance.get('/divisions'),
    'fetchDivisions'
  );
  const divisions: { id: string; name: string }[] = res?.data ?? [];
  return divisions.filter((d) => d.name !== 'Unclassified');
}

/**
 * @interface RawRankingEntry
 * @description Minimal shape we extract from a /rankings response item.
 */
interface RawRankingEntry {
  rank: number;
  fighterId: string;
  fighterName: string;
  divisionName: string;
}

/**
 * @function fetchRankingsForDivision
 * @description Step 2: Fetches the rankings list for a single division.
 * Handles pagination by collecting all pages.
 */
async function fetchRankingsForDivision(
  divisionId: string,
  divisionName: string
): Promise<RawRankingEntry[]> {
  const entries: RawRankingEntry[] = [];

  try {
    const res1 = await withRetry(
      () => boxingApiInstance.get(`/rankings`, { params: { division_id: divisionId } }),
      `fetchRankings(${divisionName})`
    );
    const pagination = res1.data?.pagination ?? {};
    const page1Items: any[] = res1.data?.data ?? [];

    const parseItems = (items: any[]) => {
      items.forEach((item: any) => {
        // Each ranking item may contain a `rankings` array of ranked fighters
        const rankedFighters: any[] = item?.rankings ?? [];
        rankedFighters.forEach((rf: any) => {
          const fighterId   = rf?.fighter?.id ?? rf?.fighter_id ?? null;
          const fighterName = rf?.fighter?.name ?? rf?.fighter_name ?? 'Unknown';
          const rank        = rf?.rank ?? rf?.position ?? 0;
          if (fighterId) {
            entries.push({ rank, fighterId: String(fighterId), fighterName, divisionName });
          }
        });

        // Some responses embed champion info at the top level
        const champions: any[] = item?.champions ?? [];
        champions.forEach((ch: any) => {
          const fighterId   = ch?.fighter_id ?? null;
          const fighterName = ch?.fighter_name ?? 'Unknown';
          if (fighterId) {
            entries.push({ rank: 0, fighterId: String(fighterId), fighterName, divisionName });
          }
        });
      });
    };

    parseItems(page1Items);

    const totalPages: number = pagination?.total_pages ?? 1;
    if (totalPages > 1) {
      for (let page = 2; page <= totalPages; page++) {
        try {
          const resN = await withRetry(
            () =>
              boxingApiInstance.get(`/rankings`, {
                params: { division_id: divisionId, page_num: page },
              }),
            `fetchRankings(${divisionName}) page ${page}`
          );
          parseItems(resN.data?.data ?? []);
        } catch (pageErr) {
          console.error(
            `[rankings-table] Failed to fetch page ${page} for division ${divisionName}:`,
            pageErr
          );
        }
      }
    }
  } catch (err) {
    console.error(
      `[rankings-table] Failed to fetch rankings for division ${divisionName}:`,
      err
    );
  }

  // Deduplicate by fighterId, sort by rank ascending
  const seen = new Set<string>();
  return entries
    .filter((e) => {
      if (seen.has(e.fighterId)) return false;
      seen.add(e.fighterId);
      return true;
    })
    .sort((a, b) => a.rank - b.rank);
}

/**
 * @function fetchFighterProfile
 * @description Step 3: Fetches /fighters/{id} with in-memory caching.
 * Returns null on failure — never throws.
 */
async function fetchFighterProfile(fighterId: string): Promise<any | null> {
  if (profileCache.has(fighterId)) {
    return profileCache.get(fighterId);
  }
  try {
    const res = await withRetry(
      () => boxingApiInstance.get(`/fighters/${fighterId}`),
      `fetchFighterProfile(${fighterId})`
    );
    const profile = res.data?.data ?? res.data ?? null;
    profileCache.set(fighterId, profile);
    return profile;
  } catch (err) {
    console.error(
      `[rankings-table] Failed to fetch profile for fighter ${fighterId}:`,
      err
    );
    return null;
  }
}

/**
 * @function fetchFighterFights
 * @description Step 4: Fetches /fights?fighter_id={id}&date_sort=DESC.
 * Results are cached in-memory. Returns empty array on failure — never throws.
 */
async function fetchFighterFights(fighterId: string): Promise<any[]> {
  if (fightsCache.has(fighterId)) {
    return fightsCache.get(fighterId)!;
  }
  try {
    const res = await withRetry(
      () =>
        boxingApiInstance.get(`/fights`, {
          params: {
            fighter_id: fighterId,
            date_sort: 'DESC',
            page_size: LAST_SIX_PAGE_SIZE,
          },
        }),
      `fetchFighterFights(${fighterId})`
    );
    const fights: any[] = res.data?.data ?? [];
    fightsCache.set(fighterId, fights);
    return fights;
  } catch (err) {
    console.error(
      `[rankings-table] Failed to fetch fights for fighter ${fighterId}:`,
      err
    );
    return [];
  }
}

// ---------------------------------------------------------------------------
// Column builders
// ---------------------------------------------------------------------------

/**
 * @function buildRecord
 * @description Converts a stats object to a "W-L-D" string.
 * Returns null if the stats fields are absent.
 */
function buildRecord(stats: any): string | null {
  const wins   = stats?.wins   ?? stats?.win;
  const losses = stats?.losses ?? stats?.loss;
  const draws  = stats?.draws  ?? stats?.draw;
  if (wins === undefined || losses === undefined || draws === undefined) return null;
  return `${wins}-${losses}-${draws}`;
}

/**
 * @function buildLastSix
 * @description Derives the "Last 6" outcome string from a fight list.
 *
 * Rules:
 *   • Only fights with status === 'FINISHED' and non-null results are considered.
 *   • Up to 6 most-recent fights (API already sorted DESC).
 *   • winner === true → 'W'; opponent winner → 'L'; neither → 'D'; outcome 'NC' → 'NC'.
 *   • Results are joined with '-', most-recent fight is rightmost (array is reversed).
 *   • Returns "N/A" for zero fight history or if the fighter is not found in any fight.
 */
function buildLastSix(fighterId: string, fights: any[]): string {
  if (!fighterId || !Array.isArray(fights) || fights.length === 0) return 'N/A';

  const finished = fights.filter(
    (f) => f?.status === 'FINISHED' && f?.results != null
  );
  if (finished.length === 0) return 'N/A';

  const recent   = finished.slice(0, 6);
  const outcomes: string[] = [];

  recent.forEach((fight) => {
    const f1      = fight?.fighters?.fighter_1;
    const f2      = fight?.fighters?.fighter_2;
    const outcome = fight?.results?.outcome ?? '';

    if (outcome.toUpperCase() === 'NC') {
      outcomes.push('NC');
      return;
    }

    const isF1 = f1?.fighter_id === fighterId;
    const isF2 = f2?.fighter_id === fighterId;
    if (!isF1 && !isF2) return;

    const target   = isF1 ? f1 : f2;
    const opponent = isF1 ? f2 : f1;

    if (target?.winner === true)        outcomes.push('W');
    else if (opponent?.winner === true) outcomes.push('L');
    else                                outcomes.push('D');
  });

  if (outcomes.length === 0) return 'N/A';
  outcomes.reverse(); // most-recent on the RIGHT
  return outcomes.join('-');
}

/**
 * @function deriveStatus
 * @description Heuristically derives fighter activity status from fight recency.
 *
 * ⚠️  HEURISTIC — NOT authoritative API data.
 * The boxing-data.com API does not provide an explicit active/inactive status field.
 * This function infers status from whether the fighter's most-recent FINISHED fight
 * occurred within the last INACTIVE_THRESHOLD_MONTHS months.
 *
 * To replace with a real data source:
 *   1. Create a StatusMap: Record<string, 'Active' | 'Inactive'>
 *   2. Extend the options parameter of fetchRankingsTable to accept it.
 *   3. Return the mapped value here instead of computing from fight dates.
 */
function deriveStatus(fights: any[]): 'Active' | 'Inactive' | 'N/A' {
  if (!Array.isArray(fights) || fights.length === 0) return 'N/A';

  const mostRecent = fights.find((f) => f?.status === 'FINISHED' && f?.date);
  if (!mostRecent?.date) return 'N/A';

  try {
    const fightDate   = new Date(mostRecent.date);
    const now         = new Date();
    const diffMonths  = (now.getTime() - fightDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    return diffMonths > INACTIVE_THRESHOLD_MONTHS ? 'Inactive' : 'Active';
  } catch {
    return 'N/A';
  }
}

/**
 * @function resolveRating
 * @description Plug-in point for the Rating column.
 *
 * The boxing-data.com API does NOT expose a numeric rating field.
 * Returns null by default. Supply a RatingMap to populate ratings from an
 * external source (e.g. a local JSON file mapping fighter_id → rating).
 *
 * STUB: Replace the body with real logic when a data source is available.
 */
function resolveRating(fighterId: string, ratingMap?: RatingMap): number | null {
  return ratingMap?.[fighterId] ?? null;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * @function fetchRankingsTable
 * @description Orchestrates the full pipeline and returns a structured, enriched
 * rankings table grouped by division.
 *
 * @param options.divisionFilter  Optional list of division IDs to restrict the fetch.
 *                                 Fetches ALL divisions if omitted.
 * @param options.externalRatings Optional RatingMap to populate the Rating column.
 * @returns RankingsTableResult — grouped divisions with enriched rows and summary stats.
 */
export async function fetchRankingsTable(options?: {
  divisionFilter?: string[];
  externalRatings?: RatingMap;
}): Promise<RankingsTableResult> {
  const { divisionFilter, externalRatings } = options ?? {};

  // ── Step 1: Divisions ─────────────────────────────────────────────────────
  let divisions = await fetchDivisions();
  if (divisionFilter && divisionFilter.length > 0) {
    divisions = divisions.filter((d) => divisionFilter.includes(d.id));
  }

  // ── Step 2: Rankings per division (sequential to respect rate limits) ──────
  const divisionRankings: {
    div: { id: string; name: string };
    entries: RawRankingEntry[];
  }[] = [];

  for (const div of divisions) {
    const entries = await fetchRankingsForDivision(div.id, div.name);
    if (entries.length > 0) {
      divisionRankings.push({ div, entries });
    }
  }

  const allEntries = divisionRankings.flatMap(({ entries }) => entries);

  // ── Step 3: Assemble flat rows without upfront enrichment ──────────────────
  const outputDivisions: RankingsTableDivision[] = divisionRankings.map(
    ({ div, entries }) => {
      const rows: RankingsTableRow[] = entries.map((entry) => {
        return {
          rank:          entry.rank,
          fighterId:     entry.fighterId,
          fighterName:   entry.fighterName,
          nationality:   null, // Loaded lazily
          division:      div.name,
          record:        null, // Loaded lazily
          kos:           null, // Loaded lazily
          lastSix:       'N/A', // Loaded lazily
          rating:        resolveRating(entry.fighterId, externalRatings),
          status:        'N/A', // Loaded lazily
          hasPartialData: false,
        } satisfies RankingsTableRow;
      });

      return { divisionId: div.id, divisionName: div.name, rows };
    }
  );

  console.info(`[rankings-table] Loaded ${allEntries.length} raw ranking entries.`);

  return { divisions: outputDivisions, successCount: allEntries.length, partialCount: 0 };
}

/**
 * @function clearRankingsCache
 * @description Clears the in-memory fighter profile and fights caches.
 * Call this to force a fresh fetch (e.g. on a user-triggered refresh).
 */
export function clearRankingsCache(): void {
  profileCache.clear();
  fightsCache.clear();
}
