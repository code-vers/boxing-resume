/**
 * @file useRankingsTable.ts
 * @description TanStack React Query hook that orchestrates the full rankings-table
 * data pipeline via the `fetchRankingsTable` service.
 *
 * Usage:
 *   const { data, isLoading, error } = useRankingsTable();
 *   // data.divisions — array of { divisionName, rows[] }
 *   // data.successCount / data.partialCount — summary stats
 *
 * Options:
 *   • divisionFilter — limit to specific division IDs (fetches all if omitted).
 *   • externalRatings — RatingMap (fighter_id → rating) to populate the Rating column.
 */

import { useQuery } from '@tanstack/react-query';
import {
  fetchRankingsTable,
  clearRankingsCache,
  type RankingsTableResult,
  type RatingMap,
} from '../api/rankings-table.service';

interface UseRankingsTableOptions {
  /** Optional list of division IDs to restrict fetching to specific divisions. */
  divisionFilter?: string[];
  /**
   * Optional external rating data (fighter_id → numeric rating).
   * The boxing-data.com API does not expose ratings; supply this from your own
   * data source to populate the Rating column.
   */
  externalRatings?: RatingMap;
  /**
   * Whether the query should execute. Defaults to true.
   * Set to false to defer fetching (e.g. until a user action).
   */
  enabled?: boolean;
}

/**
 * @hook useRankingsTable
 * @description Fetches, enriches, and returns the full boxing rankings table
 * grouped by division, with all required columns:
 *   Rank | Fighter | Nationality | Division | Record | KOs | Last 6 | Rating | Status
 *
 * The underlying data pipeline:
 *   1. Fetches all divisions (/divisions)
 *   2. Fetches rankings per division (/rankings?division_id=...)
 *   3. Enriches each fighter in parallel with concurrency=5:
 *      a. Profile details (/fighters/{id})
 *      b. Fight history (/fights?fighter_id=...)
 *   4. Derives Rating (stub — N/A unless externalRatings supplied)
 *   5. Derives Status (heuristic from fight recency — see service comments)
 *
 * Caching: Results are stale after 10 minutes; the in-memory fighter cache is
 * preserved across re-renders but cleared on manual refetch.
 */
export const useRankingsTable = (options: UseRankingsTableOptions = {}) => {
  const { divisionFilter, externalRatings, enabled = true } = options;

  return useQuery<RankingsTableResult, Error>({
    queryKey: ['rankings-table', divisionFilter ?? 'all', externalRatings ? 'rated' : 'unrated'],
    queryFn: () =>
      fetchRankingsTable({
        divisionFilter,
        externalRatings,
      }),
    enabled,
    // Data stays fresh for 10 minutes — rankings don't change frequently.
    staleTime: 10 * 60 * 1000,
    // Keep cached data for 30 minutes after the component unmounts.
    gcTime: 30 * 60 * 1000,
    // Do not retry on error at the React Query level — retries are handled
    // per-request inside fetchRankingsTable with exponential backoff.
    retry: false,
  });
};

/**
 * @function useRefreshRankingsTable
 * @description Returns a function that clears the in-memory API cache and
 * invalidates the React Query cache, forcing a fresh full fetch on next render.
 *
 * Use this when a user manually requests a data refresh.
 */
export { clearRankingsCache };

export type { RankingsTableResult, RatingMap };
