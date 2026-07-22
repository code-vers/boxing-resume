'use client';

import { useState, useCallback } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { ChevronDown, Search, X, Swords, TrendingUp, Shield, HandFist } from 'lucide-react';
import { boxingApiInstance } from '@/features/rankings/api/axios.instance';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Division {
  id: string;
  name: string;
}

interface FighterSummary {
  id: string;
  name: string;
  nationality?: string;
  alias?: string;
  division?: { id: string; name: string };
}

interface FighterDetail {
  id: string;
  name: string;
  alias?: string;
  nationality?: string;
  height?: string;
  reach?: string;
  stance?: string;
  date_of_birth?: string;
  status?: string;
  division?: { id: string; name: string };
  stats?: {
    wins: number;
    losses: number;
    draws: number;
    ko_wins?: number;
    tko_wins?: number;
  };
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

/**
 * @function fetchDivisions
 * @description Fetches all available weight divisions from the boxing API.
 * @returns {Promise<Division[]>}
 */
const fetchDivisions = async (): Promise<Division[]> => {
  const { data } = await boxingApiInstance.get('/divisions');
  return (data?.data || []).filter((d: Division) => d.name !== 'Unclassified');
};

/**
 * @function fetchFightersByName
 * @description Searches fighters by a partial name string.
 * @param {string} name - Search query
 * @returns {Promise<FighterSummary[]>}
 */
const fetchFightersByName = async (name: string): Promise<FighterSummary[]> => {
  if (!name || name.trim().length < 2) return [];
  const { data } = await boxingApiInstance.get('/fighters', {
    params: { name: name.trim(), page_size: 20 },
  });
  return data?.data || [];
};

/**
 * @function fetchFightersByDivision
 * @description Fetches fighters filtered by a specific division ID.
 * @param {string} divisionId - Division ID
 * @returns {Promise<FighterSummary[]>}
 */
const fetchFightersByDivision = async (divisionId: string): Promise<FighterSummary[]> => {
  const { data } = await boxingApiInstance.get('/fighters', {
    params: { division_id: divisionId, page_size: 50 },
  });
  return data?.data || [];
};

/**
 * @function fetchFighterDetail
 * @description Fetches full fighter profile by ID.
 * @param {string} id - Fighter ID
 * @returns {Promise<FighterDetail | null>}
 */
const fetchFighterDetail = async (id: string): Promise<FighterDetail | null> => {
  const { data } = await boxingApiInstance.get(`/fighters/${id}`);
  return data?.data || null;
};

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/**
 * @function getInitials
 * @description Returns 1–2 uppercase initials from a fighter's name.
 */
const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

/**
 * @function getFlagEmoji
 * @description Maps common nationality strings to flag emojis.
 */
const getFlagEmoji = (nationality?: string): string => {
  const map: Record<string, string> = {
    USA: '🇺🇸',
    'United States': '🇺🇸',
    GBR: '🇬🇧',
    'United Kingdom': '🇬🇧',
    UKR: '🇺🇦',
    Ukraine: '🇺🇦',
    KAZ: '🇰🇿',
    Kazakhstan: '🇰🇿',
    MEX: '🇲🇽',
    Mexico: '🇲🇽',
    JPN: '🇯🇵',
    Japan: '🇯🇵',
    IRL: '🇮🇪',
    Ireland: '🇮🇪',
    CUB: '🇨🇺',
    Cuba: '🇨🇺',
    ARG: '🇦🇷',
    Argentina: '🇦🇷',
  };
  return nationality && map[nationality] ? map[nationality] : '🏳️';
};

/**
 * @function parseRecord
 * @description Returns a "W-L-D" record string from fighter stats.
 */
const parseRecord = (stats?: FighterDetail['stats']): string =>
  stats ? `${stats.wins}-${stats.losses}-${stats.draws}` : 'N/A';

/**
 * @function calcKoRate
 * @description Returns KO % string.
 */
const calcKoRate = (stats?: FighterDetail['stats']): string => {
  if (!stats || stats.wins === 0) return 'N/A';
  const rate = ((stats.ko_wins || 0) / stats.wins) * 100;
  return `${Math.round(rate)}%`;
};

// ---------------------------------------------------------------------------
// FighterSelector sub-component
// ---------------------------------------------------------------------------

interface FighterSelectorProps {
  /**
   * @prop {string} label - "Fighter 1" or "Fighter 2" label for the panel.
   */
  label: string;
  /**
   * @prop {string | null} selectedId - Currently selected fighter ID.
   */
  selectedId: string | null;
  /**
   * @prop {(id: string | null) => void} onSelect - Called when fighter is selected or cleared.
   */
  onSelect: (id: string | null) => void;
  /**
   * @prop {Division[]} divisions - List of available divisions for filtering.
   */
  divisions: Division[];
}

/**
 * @component FighterSelector
 * @description A panel that allows a user to search for a fighter by name or filter by division,
 * then select one from the resulting dropdown list.
 */
function FighterSelector({ label, selectedId, onSelect, divisions }: FighterSelectorProps) {
  const [mode, setMode] = useState<'name' | 'division'>('name');
  const [nameQuery, setNameQuery] = useState('');
  const [selectedDivisionId, setSelectedDivisionId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /** @query Debounced fighter search by name */
  const nameSearchQuery = useQuery({
    queryKey: ['compare-fighter-search', nameQuery],
    queryFn: () => fetchFightersByName(nameQuery),
    enabled: mode === 'name' && nameQuery.trim().length >= 2,
    staleTime: 30_000,
  });

  /** @query Fighter list filtered by division */
  const divisionSearchQuery = useQuery({
    queryKey: ['compare-fighter-division', selectedDivisionId],
    queryFn: () => fetchFightersByDivision(selectedDivisionId),
    enabled: mode === 'division' && !!selectedDivisionId,
    staleTime: 60_000,
  });

  const results =
    mode === 'name' ? (nameSearchQuery.data ?? []) : (divisionSearchQuery.data ?? []);
  const isSearching =
    mode === 'name' ? nameSearchQuery.isFetching : divisionSearchQuery.isFetching;

  /** @function handleSelect - Selects a fighter and collapses the dropdown. */
  const handleSelect = useCallback(
    (fighter: FighterSummary) => {
      onSelect(fighter.id);
      setIsDropdownOpen(false);
      setNameQuery(fighter.name);
    },
    [onSelect],
  );

  /** @function handleClear - Resets all selection state. */
  const handleClear = useCallback(() => {
    onSelect(null);
    setNameQuery('');
    setSelectedDivisionId('');
    setIsDropdownOpen(false);
  }, [onSelect]);

  const showResults = isDropdownOpen && (results.length > 0 || isSearching);

  return (
    <div className='flex flex-col gap-4'>
      {/* Panel Header */}
      <div className='flex items-center gap-2'>
        <span className='h-1 w-6 rounded-full bg-text-accent' />
        <span className='text-xs font-bold uppercase tracking-widest text-text-placeholder'>
          {label}
        </span>
      </div>

      {/* Mode Tabs */}
      <div className='flex items-center gap-0 rounded-[6px] border border-[#e8e2d8] bg-[#f0ebe1] p-1'>
        <button
          type='button'
          onClick={() => { setMode('name'); setIsDropdownOpen(false); }}
          className={`flex-1 rounded-[4px] px-4 py-1.5 text-[12px] font-semibold transition-all duration-150 ${
            mode === 'name'
              ? 'bg-card-dark text-surface-white shadow-sm'
              : 'text-text-placeholder hover:text-text-primary'
          }`}
        >
          By Name
        </button>
        <button
          type='button'
          onClick={() => { setMode('division'); setIsDropdownOpen(false); }}
          className={`flex-1 rounded-[4px] px-4 py-1.5 text-[12px] font-semibold transition-all duration-150 ${
            mode === 'division'
              ? 'bg-card-dark text-surface-white shadow-sm'
              : 'text-text-placeholder hover:text-text-primary'
          }`}
        >
          By Division
        </button>
      </div>

      {/* Search inputs */}
      {mode === 'name' ? (
        <div className='relative'>
          <div className='flex h-[42px] items-center gap-2 rounded-[6px] border border-[#d4cec4] bg-surface-white px-3 shadow-sm focus-within:border-[#0a0a0a] transition-colors'>
            <Search className='h-4 w-4 shrink-0 text-text-placeholder' />
            <input
              type='search'
              value={nameQuery}
              onChange={(e) => {
                setNameQuery(e.target.value);
                setIsDropdownOpen(true);
                if (!e.target.value) handleClear();
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder='Search fighter name…'
              className='flex-1 bg-transparent text-[13px] font-medium text-text-primary placeholder:text-text-placeholder outline-none'
            />
            {nameQuery && (
              <button type='button' onClick={handleClear} className='text-text-placeholder hover:text-text-primary transition-colors'>
                <X className='h-3.5 w-3.5' />
              </button>
            )}
          </div>

          {/* Name search results dropdown */}
          {showResults && (
            <div className='absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded-[6px] border border-[#e8e2d8] bg-surface-white shadow-lg custom-scrollbar'>
              {isSearching ? (
                <div className='flex items-center justify-center py-4'>
                  <span className='text-[12px] text-text-placeholder'>Searching…</span>
                </div>
              ) : (
                results.map((fighter) => (
                  <button
                    key={fighter.id}
                    type='button'
                    onClick={() => handleSelect(fighter)}
                    className='flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#faf8f4]'
                  >
                    <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card-dark text-[11px] font-bold text-surface-white'>
                      {getInitials(fighter.name)}
                    </span>
                    <div className='min-w-0'>
                      <p className='truncate text-[13px] font-semibold text-text-primary'>{fighter.name}</p>
                      <p className='text-[11px] text-text-placeholder'>
                        {fighter.division?.name || 'Unknown Division'} · {getFlagEmoji(fighter.nationality)} {fighter.nationality || ''}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {/* Division select */}
          <div className='relative'>
            <select
              value={selectedDivisionId}
              onChange={(e) => {
                setSelectedDivisionId(e.target.value);
                setIsDropdownOpen(true);
                onSelect(null);
              }}
              className='h-[42px] w-full appearance-none rounded-[6px] border border-[#d4cec4] bg-surface-white px-3 pr-9 text-[13px] text-text-secondary outline-none cursor-pointer focus:border-[#0a0a0a] transition-colors'
            >
              <option value=''>Select a division…</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-placeholder' />
          </div>

          {/* Fighter dropdown for division results */}
          {selectedDivisionId && (
            <div className='relative'>
              <select
                value={selectedId || ''}
                onChange={(e) => onSelect(e.target.value || null)}
                className='h-[42px] w-full appearance-none rounded-[6px] border border-[#d4cec4] bg-surface-white px-3 pr-9 text-[13px] text-text-secondary outline-none cursor-pointer focus:border-[#0a0a0a] transition-colors'
              >
                <option value=''>
                  {isSearching ? 'Loading fighters…' : 'Select a fighter…'}
                </option>
                {results.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-placeholder' />
            </div>
          )}
        </div>
      )}

      {/* Selected fighter badge */}
      {selectedId && (
        <div className='flex items-center gap-2 rounded-[6px] border border-[#d4cec4] bg-[#faf8f4] px-3 py-2'>
          <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-text-accent text-[10px] font-bold text-surface-white'>
            ✓
          </span>
          <span className='flex-1 truncate text-[12px] font-semibold text-text-primary'>
            Fighter selected
          </span>
          <button
            type='button'
            onClick={handleClear}
            className='text-text-placeholder transition-colors hover:text-text-accent'
          >
            <X className='h-3.5 w-3.5' />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FighterCard sub-component
// ---------------------------------------------------------------------------

interface FighterCardProps {
  /**
   * @prop {FighterDetail} fighter - Full fighter data to display.
   */
  fighter: FighterDetail;
  /**
   * @prop {'left' | 'right'} side - Controls text alignment and accent placement.
   */
  side: 'left' | 'right';
}

/**
 * @component FighterCard
 * @description Renders the header card for a single fighter in the comparison panel.
 */
function FighterCard({ fighter, side }: FighterCardProps) {
  const align = side === 'left' ? 'items-start text-left' : 'items-end text-right';

  return (
    <div className={`flex flex-col gap-3 ${align}`}>
      {/* Avatar */}
      <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-text-accent bg-card-dark'>
        <span className='font-bebas text-[32px] text-surface-white'>
          {getInitials(fighter.name)}
        </span>
      </div>

      {/* Name */}
      <div className={`flex flex-col gap-1 ${align}`}>
        <h2 className='font-heading text-2xl uppercase tracking-tight text-surface-white md:text-3xl leading-tight'>
          {fighter.name}
        </h2>
        {fighter.alias && (
          <span className='text-sm italic text-text-accent'>
            &ldquo;{fighter.alias}&rdquo;
          </span>
        )}
        <span className='text-[13px] text-text-placeholder'>
          {getFlagEmoji(fighter.nationality)} {fighter.nationality || 'Unknown'}
        </span>
      </div>

      {/* Record pills */}
      <div className='flex items-center gap-2'>
        <span className='rounded-[4px] bg-[#E6F5EA] px-3 py-1 text-xs font-bold text-[#16A34A]'>
          {fighter.stats?.wins ?? 0}W
        </span>
        <span className='rounded-[4px] bg-[#FCE8E8] px-3 py-1 text-xs font-bold text-text-accent'>
          {fighter.stats?.losses ?? 0}L
        </span>
        <span className='rounded-[4px] bg-[#FFF9D6] px-3 py-1 text-xs font-bold text-[#CA8A04]'>
          {fighter.stats?.draws ?? 0}D
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// StatRow sub-component
// ---------------------------------------------------------------------------

interface StatRowProps {
  label: string;
  val1: string | number;
  val2: string | number;
  /** @prop {boolean} highlight - Whether to visually highlight the better value. */
  highlight?: 'f1' | 'f2' | 'equal' | null;
}

/**
 * @component StatRow
 * @description Renders a single comparison row in the "Tale of the Tape" table.
 * The center label is fixed-width so both sides align cleanly.
 */
function StatRow({ label, val1, val2, highlight }: StatRowProps) {
  const v1Class = highlight === 'f1' ? 'text-text-accent font-black' : 'text-text-primary font-medium';
  const v2Class = highlight === 'f2' ? 'text-text-accent font-black' : 'text-text-primary font-medium';

  return (
    <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-[#f0ebe1] px-4 py-3 last:border-0 hover:bg-[#faf8f4] transition-colors'>
      <span className={`text-[14px] ${v1Class}`}>{val1 !== undefined && val1 !== null && val1 !== '' ? val1 : '—'}</span>
      <span className='min-w-[110px] text-center text-[11px] font-semibold uppercase tracking-widest text-text-placeholder'>
        {label}
      </span>
      <span className={`text-right text-[14px] ${v2Class}`}>{val2 !== undefined && val2 !== null && val2 !== '' ? val2 : '—'}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ComparisonPage component
// ---------------------------------------------------------------------------

/**
 * @component ComparisonPage
 * @description Full fighter comparison page. Allows selecting two fighters either
 * by name search or by division filter, then shows a detailed side-by-side comparison.
 * Data is fetched directly from the RapidAPI boxing endpoint.
 * @returns {JSX.Element}
 */
export default function ComparisonPage() {
  const [fighter1Id, setFighter1Id] = useState<string | null>(null);
  const [fighter2Id, setFighter2Id] = useState<string | null>(null);

  /** @query Available weight divisions */
  const divisionsQuery = useQuery({
    queryKey: ['compare-divisions'],
    queryFn: fetchDivisions,
    staleTime: 5 * 60_000,
  });

  const divisions = divisionsQuery.data ?? [];

  /** @queries Concurrent fetch of both selected fighter profiles */
  const [q1, q2] = useQueries({
    queries: [
      {
        queryKey: ['compare-detail', fighter1Id],
        queryFn: () => fetchFighterDetail(fighter1Id!),
        enabled: !!fighter1Id,
        staleTime: 60_000,
      },
      {
        queryKey: ['compare-detail', fighter2Id],
        queryFn: () => fetchFighterDetail(fighter2Id!),
        enabled: !!fighter2Id,
        staleTime: 60_000,
      },
    ],
  });

  const isLoadingFighters = q1.isFetching || q2.isFetching;
  const fighter1 = q1.data ?? null;
  const fighter2 = q2.data ?? null;
  const canCompare = !!fighter1 && !!fighter2;

  /**
   * @function getWinner
   * @description Compares two numeric values and returns which side wins.
   */
  const getWinner = (
    n1: number | undefined,
    n2: number | undefined,
  ): 'f1' | 'f2' | 'equal' | null => {
    if (n1 === undefined || n2 === undefined) return null;
    if (n1 > n2) return 'f1';
    if (n2 > n1) return 'f2';
    return 'equal';
  };

  return (
    <div className='bg-page-bg min-h-screen'>
      {/* ------------------------------------------------------------------ */}
      {/* Hero Banner                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className='w-full bg-card-dark py-14 md:py-20'>
        <div className='mx-auto flex w-full max-w-none flex-col gap-5 px-4 sm:px-6 md:px-8 xl:px-12'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <HandFist className='h-10 w-10 text-text-accent' aria-hidden='true' />
              <h1 className='font-heading text-4xl uppercase tracking-tight text-surface-white md:text-5xl'>
                Fighter Comparison
              </h1>
            </div>
            <p className='max-w-[600px] text-[15px] leading-relaxed text-text-placeholder'>
              Select any two fighters to see a detailed side-by-side comparison of their records,
              stats, physical attributes, and career details — pulled live from our boxing database.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Selection Controls                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className='w-full border-b border-[#e8e2d8] bg-surface-white py-8'>
        <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr_56px_1fr]'>
            {/* Fighter 1 Selector */}
            <FighterSelector
              label='Fighter 1'
              selectedId={fighter1Id}
              onSelect={setFighter1Id}
              divisions={divisions}
            />

            {/* VS Badge */}
            <div className='flex items-center justify-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-text-accent shadow-lg'>
                <span className='font-heading text-[20px] italic text-surface-white'>VS</span>
              </div>
            </div>

            {/* Fighter 2 Selector */}
            <FighterSelector
              label='Fighter 2'
              selectedId={fighter2Id}
              onSelect={setFighter2Id}
              divisions={divisions}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Comparison Results                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className='w-full py-10'>
        <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12'>

          {/* Empty state */}
          {!fighter1Id && !fighter2Id && (
            <div className='flex flex-col items-center justify-center gap-4 py-20 text-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[#d4cec4] bg-[#faf8f4]'>
                <HandFist className='h-8 w-8 text-text-placeholder' />
              </div>
              <p className='max-w-[360px] text-[15px] font-medium text-text-placeholder'>
                Use the selectors above to choose two fighters and start comparing their stats.
              </p>
            </div>
          )}

          {/* Partial selection hint */}
          {(fighter1Id || fighter2Id) && !canCompare && !isLoadingFighters && (
            <div className='flex flex-col items-center justify-center gap-3 py-16 text-center'>
              <p className='text-[14px] font-medium text-text-placeholder'>
                Now select the {fighter1Id ? 'second' : 'first'} fighter to begin the comparison.
              </p>
            </div>
          )}

          {/* Loading state */}
          {isLoadingFighters && (fighter1Id || fighter2Id) && (
            <div className='flex flex-col items-center justify-center gap-3 py-16'>
              <div className='h-8 w-8 animate-spin rounded-full border-2 border-[#e8e2d8] border-t-text-accent' />
              <p className='text-[13px] text-text-placeholder'>Loading fighter data…</p>
            </div>
          )}

          {/* Full comparison panel */}
          {canCompare && !isLoadingFighters && (
            <div className='flex flex-col gap-8'>

              {/* Fighter Header Cards */}
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr]'>
                {/* Fighter 1 Card */}
                <div className='rounded-[10px] bg-card-dark p-6 md:p-8'>
                  <FighterCard fighter={fighter1} side='left' />
                </div>

                {/* VS Center */}
                <div className='hidden items-center justify-center lg:flex'>
                  <div className='flex flex-col items-center gap-2'>
                    <div className='h-24 w-[2px] bg-gradient-to-b from-transparent via-text-accent to-transparent' />
                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-text-accent shadow-lg'>
                      <span className='font-heading text-[20px] italic text-surface-white'>VS</span>
                    </div>
                    <div className='h-24 w-[2px] bg-gradient-to-b from-transparent via-text-accent to-transparent' />
                  </div>
                </div>

                {/* Mobile VS divider */}
                <div className='flex items-center justify-center gap-4 lg:hidden'>
                  <div className='h-[1px] flex-1 bg-gradient-to-r from-transparent to-text-accent' />
                  <span className='font-heading text-xl italic text-text-accent'>VS</span>
                  <div className='h-[1px] flex-1 bg-gradient-to-l from-transparent to-text-accent' />
                </div>

                {/* Fighter 2 Card */}
                <div className='rounded-[10px] bg-card-dark p-6 md:p-8'>
                  <FighterCard fighter={fighter2} side='right' />
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* Tale of the Tape Table                                       */}
              {/* ---------------------------------------------------------- */}
              <div className='overflow-hidden rounded-[10px] border border-[#e8e2d8] bg-surface-white shadow-sm'>
                {/* Table header */}
                <div className='flex items-center gap-2 border-b border-[#e8e2d8] bg-[#f0ebe1] px-6 py-4'>
                  <TrendingUp className='h-4 w-4 text-text-accent' />
                  <h3 className='font-heading text-xl uppercase tracking-wider text-text-primary'>
                    Tale of the Tape
                  </h3>
                </div>

                {/* Fighter name sub-header */}
                <div className='grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#e8e2d8] bg-[#faf8f4] px-4 py-3'>
                  <span className='truncate text-[13px] font-bold uppercase tracking-wide text-text-primary'>
                    {fighter1.name}
                  </span>
                  <span className='min-w-[110px] text-center text-[11px] font-semibold uppercase tracking-widest text-text-placeholder'>
                    —
                  </span>
                  <span className='truncate text-right text-[13px] font-bold uppercase tracking-wide text-text-primary'>
                    {fighter2.name}
                  </span>
                </div>

                {/* Stat rows */}
                <div className='flex flex-col py-1'>
                  <StatRow
                    label='Record (W-L-D)'
                    val1={parseRecord(fighter1.stats)}
                    val2={parseRecord(fighter2.stats)}
                  />
                  <StatRow
                    label='Total Bouts'
                    val1={(fighter1.stats ? fighter1.stats.wins + fighter1.stats.losses + fighter1.stats.draws : 0)}
                    val2={(fighter2.stats ? fighter2.stats.wins + fighter2.stats.losses + fighter2.stats.draws : 0)}
                    highlight={getWinner(
                      fighter1.stats ? fighter1.stats.wins + fighter1.stats.losses + fighter1.stats.draws : undefined,
                      fighter2.stats ? fighter2.stats.wins + fighter2.stats.losses + fighter2.stats.draws : undefined,
                    )}
                  />
                  <StatRow
                    label='Wins'
                    val1={fighter1.stats?.wins ?? '—'}
                    val2={fighter2.stats?.wins ?? '—'}
                    highlight={getWinner(fighter1.stats?.wins, fighter2.stats?.wins)}
                  />
                  <StatRow
                    label='KO Wins'
                    val1={fighter1.stats?.ko_wins ?? '—'}
                    val2={fighter2.stats?.ko_wins ?? '—'}
                    highlight={getWinner(fighter1.stats?.ko_wins, fighter2.stats?.ko_wins)}
                  />
                  <StatRow
                    label='KO Rate'
                    val1={calcKoRate(fighter1.stats)}
                    val2={calcKoRate(fighter2.stats)}
                  />
                  <StatRow
                    label='Losses'
                    val1={fighter1.stats?.losses ?? '—'}
                    val2={fighter2.stats?.losses ?? '—'}
                  />
                  <StatRow
                    label='Draws'
                    val1={fighter1.stats?.draws ?? '—'}
                    val2={fighter2.stats?.draws ?? '—'}
                  />
                  <StatRow
                    label='Division'
                    val1={fighter1.division?.name ?? '—'}
                    val2={fighter2.division?.name ?? '—'}
                  />
                  <StatRow
                    label='Height'
                    val1={fighter1.height ?? '—'}
                    val2={fighter2.height ?? '—'}
                  />
                  <StatRow
                    label='Reach'
                    val1={fighter1.reach ?? '—'}
                    val2={fighter2.reach ?? '—'}
                  />
                  <StatRow
                    label='Stance'
                    val1={fighter1.stance
                      ? fighter1.stance.charAt(0).toUpperCase() + fighter1.stance.slice(1)
                      : '—'}
                    val2={fighter2.stance
                      ? fighter2.stance.charAt(0).toUpperCase() + fighter2.stance.slice(1)
                      : '—'}
                  />
                  <StatRow
                    label='Date of Birth'
                    val1={fighter1.date_of_birth ?? '—'}
                    val2={fighter2.date_of_birth ?? '—'}
                  />
                  <StatRow
                    label='Status'
                    val1={fighter1.status
                      ? fighter1.status.charAt(0).toUpperCase() + fighter1.status.slice(1)
                      : 'Active'}
                    val2={fighter2.status
                      ? fighter2.status.charAt(0).toUpperCase() + fighter2.status.slice(1)
                      : 'Active'}
                  />
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* KO / Win Breakdown Visual Bars                              */}
              {/* ---------------------------------------------------------- */}
              <div className='overflow-hidden rounded-[10px] border border-[#e8e2d8] bg-surface-white shadow-sm'>
                <div className='flex items-center gap-2 border-b border-[#e8e2d8] bg-[#f0ebe1] px-6 py-4'>
                  <Shield className='h-4 w-4 text-text-accent' />
                  <h3 className='font-heading text-xl uppercase tracking-wider text-text-primary'>
                    Win Breakdown
                  </h3>
                </div>

                <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2'>
                  {[fighter1, fighter2].map((f, idx) => {
                    const total = (f.stats?.wins ?? 0) + (f.stats?.losses ?? 0) + (f.stats?.draws ?? 0);
                    const winRate = total > 0 ? ((f.stats?.wins ?? 0) / total) * 100 : 0;
                    const koRate = (f.stats?.wins ?? 0) > 0
                      ? (((f.stats?.ko_wins ?? 0)) / (f.stats?.wins ?? 1)) * 100
                      : 0;

                    return (
                      <div key={f.id} className='flex flex-col gap-4'>
                        <p className='text-[13px] font-bold uppercase tracking-wide text-text-primary'>
                          {f.name}
                        </p>

                        {/* Win Rate bar */}
                        <div className='flex flex-col gap-1.5'>
                          <div className='flex items-center justify-between'>
                            <span className='text-[11px] text-text-placeholder uppercase tracking-wide'>Win Rate</span>
                            <span className='text-[12px] font-bold text-text-primary'>{Math.round(winRate)}%</span>
                          </div>
                          <div className='h-2 w-full overflow-hidden rounded-full bg-[#f0ebe1]'>
                            <div
                              className='h-full rounded-full bg-[#16A34A] transition-all duration-700'
                              style={{ width: `${winRate}%` }}
                            />
                          </div>
                        </div>

                        {/* KO Rate bar */}
                        <div className='flex flex-col gap-1.5'>
                          <div className='flex items-center justify-between'>
                            <span className='text-[11px] text-text-placeholder uppercase tracking-wide'>KO Rate</span>
                            <span className='text-[12px] font-bold text-text-primary'>{Math.round(koRate)}%</span>
                          </div>
                          <div className='h-2 w-full overflow-hidden rounded-full bg-[#f0ebe1]'>
                            <div
                              className='h-full rounded-full bg-text-accent transition-all duration-700'
                              style={{ width: `${koRate}%` }}
                            />
                          </div>
                        </div>

                        {/* Loss Rate bar */}
                        <div className='flex flex-col gap-1.5'>
                          <div className='flex items-center justify-between'>
                            <span className='text-[11px] text-text-placeholder uppercase tracking-wide'>Loss Rate</span>
                            <span className='text-[12px] font-bold text-text-primary'>
                              {total > 0 ? Math.round(((f.stats?.losses ?? 0) / total) * 100) : 0}%
                            </span>
                          </div>
                          <div className='h-2 w-full overflow-hidden rounded-full bg-[#f0ebe1]'>
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${idx === 0 ? 'bg-[#d72322]' : 'bg-[#f97316]'}`}
                              style={{ width: total > 0 ? `${((f.stats?.losses ?? 0) / total) * 100}%` : '0%' }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </div>
  );
}
