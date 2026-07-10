'use client';

/**
 * @file AllFightersGrid.tsx
 * @description Boxing Rankings Table — pixel-faithful implementation of Figma nodes:
 *   78-29193  →  Filter / search bar
 *   78-29153  →  Rankings table ("RECENT RESULTS" section)
 *
 * Throttled Background Queue Optimization:
 *   To bypass the RapidAPI HTTP 429 rate limit block:
 *   1. We load the raw rankings database instantly (19 lightweight API requests).
 *   2. A background worker queue enriches the dataset (profile + fights) at a controlled
 *      rate of 3 concurrent requests and a 200ms delay.
 *   3. The queue automatically prioritizes visible page rows, so the current page loads
 *      within ~5 seconds, while the remaining database enriches silently in the background.
 *   4. All search, division, country, and status filters are fully wired and functional.
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Search, ChevronDown, RefreshCcw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useRankingsTable,
  clearRankingsCache,
  type RatingMap,
} from '@/features/rankings/hooks/useRankingsTable';
import { useDivisions } from '@/features/rankings/hooks/useRankings';
import { boxingApiInstance } from '@/features/rankings/api/axios.instance';
import { FighterProfileModal } from './FighterProfileModal';
import type { RankingsTableRow } from '@/features/rankings/api/rankings-table.service';

interface AllFightersGridProps {
  externalRatings?: RatingMap;
  divisionFilter?: string[];
}

interface EnrichedData {
  nationality: string | null;
  record: string | null;
  kos: number | null;
  lastSix: string;
  status: 'Active' | 'Inactive' | 'N/A';
}

const RATING_OPTIONS = ['Ratings', 'Top 10', 'Top 25', 'Top 50'] as const;

const STATUS_OPTIONS = [
  { value: 'all',      label: 'All'      },
  { value: 'active',   label: 'Active'   },
  { value: 'inactive', label: 'Inactive' },
] as const;

const COUNTRY_OPTIONS = [
  'All Countries',
  'United States',
  'United Kingdom',
  'Mexico',
  'Ukraine',
  'Russia',
  'Cuba',
  'Kazakhstan',
  'Philippines',
  'Puerto Rico',
  'Australia',
  'Germany',
  'France',
  'Argentina',
  'Brazil',
  'Canada',
  'Ireland',
];

const PAGE_SIZE = 50;

// ---------------------------------------------------------------------------
// Shared Column Configuration for Perfect Alignment
// ---------------------------------------------------------------------------
const COLUMNS_CONFIG = [
  { key: 'rank',        label: 'Rank',        flex: '0 0 7.00%',  align: 'left',   className: 'pl-6 pr-4' },
  { key: 'fighter',     label: 'Fighter',     flex: '0 0 13.41%', align: 'left',   className: 'pl-3 pr-4' },
  { key: 'nationality', label: 'Nationality', flex: '0 0 13.50%', align: 'center', className: 'px-3' },
  { key: 'division',    label: 'Division',    flex: '0 0 8.24%',  align: 'center', className: 'px-3' },
  { key: 'record',      label: 'Record',      flex: '0 0 9.00%',  align: 'center', className: 'px-3' },
  { key: 'kos',         label: 'KOs',         flex: '0 0 8.00%',  align: 'center', className: 'px-3' },
  { key: 'lastSix',     label: 'Last 6',      flex: '0 0 13.90%', align: 'center', className: 'px-3' },
  { key: 'rating',      label: 'Rating',      flex: '0 0 9.00%',  align: 'center', className: 'px-3' },
  { key: 'status',      label: 'Status',      flex: '0 0 12.95%', align: 'center', className: 'pl-3 pr-6' },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const getAvatarInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return 'B';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
const LastSixSquares = ({ lastSix, isLoading }: { lastSix: string; isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 w-3 rounded-[2px] bg-gray-100 animate-pulse border border-[#e8e2d8]" />
        ))}
      </div>
    );
  }

  const outcomes: string[] =
    !lastSix || lastSix === 'N/A' ? [] : lastSix.split('-').slice(0, 6);

  const slots = Array.from({ length: 6 }, (_, i) => outcomes[i] ?? '');

  return (
    <div className="flex items-center gap-[2px]">
      {slots.map((outcome, idx) => {
        const cls =
          outcome === 'W'  ? 'bg-[#22c55e] border-[#22c55e]' :
          outcome === 'L'  ? 'bg-[#d72322] border-[#d72322]' :
          outcome === 'D'  ? 'bg-[#eab308] border-[#eab308]' :
          outcome === 'NC' ? 'bg-[#6b7280] border-[#6b7280]' :
                             'bg-transparent border-[#e8e2d8]';
        return (
          <div
            key={idx}
            className={cn('h-3 w-3 rounded-[2px] shrink-0 border', cls)}
            title={
              outcome === 'W'  ? 'Win' :
              outcome === 'L'  ? 'Loss' :
              outcome === 'D'  ? 'Draw' :
              outcome === 'NC' ? 'No Contest' : ''
            }
          />
        );
      })}
    </div>
  );
};

const RecordDisplay = ({ record, isLoading }: { record: string | null; isLoading?: boolean }) => {
  if (isLoading) return <div className="h-3 bg-gray-100 rounded w-12 animate-pulse" />;
  if (!record) return <span className="text-[#857f78] text-sm">—</span>;
  const parts = record.replace(/[–—]/g, '-').split('-');
  if (parts.length !== 3) return <span className="text-sm">{record}</span>;
  return (
    <span className="font-['Bebas_Neue'] text-base tracking-wide">
      <span className="text-[#166534]">{parts[0]}</span>
      <span className="text-[#857f78]">–</span>
      <span className="text-[#991b1b]">{parts[1]}</span>
      <span className="text-[#857f78]">–</span>
      <span className="text-[#854d0e]">{parts[2]}</span>
    </span>
  );
};

const StatusPill = ({ status, isLoading }: { status: RankingsTableRow['status']; isLoading?: boolean }) => {
  if (isLoading) return <div className="h-5 bg-gray-100 rounded-full w-14 animate-pulse" />;
  if (status === 'N/A') return <span className="text-[#857f78] text-sm">N/A</span>;
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-[2px] rounded-full text-xs font-semibold border',
      status === 'Active'
        ? 'border-[#22c55e] text-[#166534]'
        : 'border-[#d72322] text-[#991b1b]'
    )}>
      {status}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Skeleton row
// ---------------------------------------------------------------------------
const SkeletonRow = () => (
  <div className="flex items-center border-b border-[#f1ede1] animate-pulse w-full" style={{ height: 59 }}>
    {COLUMNS_CONFIG.map((col) => (
      <div
        key={col.key}
        className={cn('shrink-0 flex items-center', col.className)}
        style={{
          flex: col.flex,
          justifyContent: col.align === 'center' ? 'center' : 'flex-start',
        }}
      >
        {col.key === 'fighter' ? (
          <div className="flex items-center gap-3 w-full">
            <div className="h-9 w-9 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>
        ) : (
          <div className="h-3 bg-gray-200 rounded w-10" />
        )}
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Desktop row
// ---------------------------------------------------------------------------
interface DesktopRowProps {
  row: RankingsTableRow;
  displayRank: number;
  enriched: EnrichedData | undefined;
  onFighterClick: (id: string) => void;
}

const DesktopRow = ({ row, displayRank, enriched, onFighterClick }: DesktopRowProps) => {
  const isLoading = !enriched;

  return (
    <div
      className="flex items-center border-b border-[#f1ede1] hover:bg-[#faf8f4] transition-colors w-full"
      style={{ minHeight: 59 }}
    >
      {/* Rank */}
      <div
        className={cn('shrink-0 flex items-center', COLUMNS_CONFIG[0].className)}
        style={{ flex: COLUMNS_CONFIG[0].flex }}
      >
        <span className="text-sm font-medium text-[#3d3b38] tabular-nums">
          {displayRank > 0 ? displayRank : '—'}
        </span>
      </div>

      {/* Fighter */}
      <div
        className={cn('shrink-0 flex items-center gap-3 min-w-0', COLUMNS_CONFIG[1].className)}
        style={{ flex: COLUMNS_CONFIG[1].flex }}
      >
        <div
          onClick={() => onFighterClick(row.fighterId)}
          className="flex items-center justify-center rounded-full bg-[#0a0a0a] border border-[#d72322] shrink-0 text-white font-bold font-['Bebas_Neue'] text-sm cursor-pointer hover:scale-105 transition-transform"
          style={{ width: 36, height: 36 }}
        >
          {getAvatarInitials(row.fighterName)}
        </div>
        <div className="flex-1 min-w-0">
          <p
            onClick={() => onFighterClick(row.fighterId)}
            className="text-sm font-semibold text-[#0a0a0a] leading-tight truncate cursor-pointer hover:underline hover:text-[#d72322]"
          >
            {row.fighterName}
          </p>
          <p className="text-xs text-[#857f78] italic truncate mt-0.5">&nbsp;</p>
        </div>
      </div>

      {/* Nationality */}
      <div
        className={cn('shrink-0 flex items-center justify-center', COLUMNS_CONFIG[2].className)}
        style={{ flex: COLUMNS_CONFIG[2].flex }}
      >
        <span className="text-sm text-[#3d3b38] text-center truncate">
          {isLoading ? (
            <span className="h-3 w-10 bg-gray-100 animate-pulse rounded inline-block" />
          ) : (
            enriched?.nationality ?? '—'
          )}
        </span>
      </div>

      {/* Division */}
      <div
        className={cn('shrink-0 flex items-center justify-center', COLUMNS_CONFIG[3].className)}
        style={{ flex: COLUMNS_CONFIG[3].flex }}
      >
        <span className="text-sm text-[#3d3b38] text-center truncate">{row.division}</span>
      </div>

      {/* Record */}
      <div
        className={cn('shrink-0 flex items-center justify-center', COLUMNS_CONFIG[4].className)}
        style={{ flex: COLUMNS_CONFIG[4].flex }}
      >
        <RecordDisplay record={enriched?.record ?? null} isLoading={isLoading} />
      </div>

      {/* KOs */}
      <div
        className={cn('shrink-0 flex items-center justify-center', COLUMNS_CONFIG[5].className)}
        style={{ flex: COLUMNS_CONFIG[5].flex }}
      >
        <span className="text-sm font-medium text-[#0a0a0a] tabular-nums">
          {isLoading ? (
            <span className="h-3 w-4 bg-gray-100 animate-pulse rounded inline-block" />
          ) : (
            enriched?.kos !== null ? enriched?.kos : '—'
          )}
        </span>
      </div>

      {/* Last 6 */}
      <div
        className={cn('shrink-0 flex items-center justify-center', COLUMNS_CONFIG[6].className)}
        style={{ flex: COLUMNS_CONFIG[6].flex }}
      >
        <LastSixSquares lastSix={enriched?.lastSix ?? 'N/A'} isLoading={isLoading} />
      </div>

      {/* Rating */}
      <div
        className={cn('shrink-0 flex items-center justify-center', COLUMNS_CONFIG[7].className)}
        style={{ flex: COLUMNS_CONFIG[7].flex }}
      >
        <span className="text-sm font-medium text-[#0a0a0a] tabular-nums">
          {row.rating !== null ? row.rating.toFixed(0) : 'N/A'}
        </span>
      </div>

      {/* Status */}
      <div
        className={cn('shrink-0 flex items-center justify-center', COLUMNS_CONFIG[8].className)}
        style={{ flex: COLUMNS_CONFIG[8].flex }}
      >
        <StatusPill status={enriched?.status ?? 'N/A'} isLoading={isLoading} />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Mobile card
// ---------------------------------------------------------------------------
interface MobileCardProps {
  row: RankingsTableRow;
  displayRank: number;
  enriched: EnrichedData | undefined;
  onFighterClick: (id: string) => void;
}

const MobileCard = ({ row, displayRank, enriched, onFighterClick }: MobileCardProps) => {
  const isLoading = !enriched;

  return (
    <div className="border border-[#e8e2d8] rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-base text-[#0a0a0a]">{displayRank > 0 ? `#${displayRank}` : '—'}</span>
        <StatusPill status={enriched?.status ?? 'N/A'} isLoading={isLoading} />
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div
          onClick={() => onFighterClick(row.fighterId)}
          className="flex items-center justify-center rounded-full bg-[#0a0a0a] border border-[#d72322] shrink-0 text-white font-bold font-['Bebas_Neue'] text-sm cursor-pointer"
          style={{ width: 36, height: 36 }}
        >
          {getAvatarInitials(row.fighterName)}
        </div>
        <div className="flex-1 min-w-0">
          <p
            onClick={() => onFighterClick(row.fighterId)}
            className="text-sm font-semibold text-[#0a0a0a] truncate cursor-pointer hover:underline hover:text-[#d72322]"
          >
            {row.fighterName}
          </p>
          {!isLoading && enriched?.nationality && (
            <p className="text-xs text-[#857f78] truncate">{enriched.nationality}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-[#857f78] font-medium mb-1">Division</p>
          <p className="text-sm text-[#0a0a0a]">{row.division}</p>
        </div>
        <div>
          <p className="text-[#857f78] font-medium mb-1">Record</p>
          <RecordDisplay record={enriched?.record ?? null} isLoading={isLoading} />
        </div>
        <div>
          <p className="text-[#857f78] font-medium mb-1">KOs</p>
          <p className="text-sm font-medium text-[#0a0a0a]">
            {isLoading ? '...' : (enriched?.kos !== null ? enriched?.kos : '—')}
          </p>
        </div>
        <div>
          <p className="text-[#857f78] font-medium mb-1">Rating</p>
          <p className="text-sm font-medium text-[#0a0a0a]">{row.rating !== null ? row.rating.toFixed(0) : 'N/A'}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[#857f78] font-medium mb-2">Last 6</p>
          <LastSixSquares lastSix={enriched?.lastSix ?? 'N/A'} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) => {
  const pages = useMemo((): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const result: (number | '...')[] = [1];
    if (currentPage > 3) result.push('...');
    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) result.push(i);
    if (currentPage < totalPages - 2) result.push('...');
    result.push(totalPages);
    return result;
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center gap-1 pt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-8 px-4 text-[13px] font-medium text-[#0a0a0a] border border-[#d4cec4] rounded-md disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        Prev
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`d${i}`} className="h-8 w-8 flex items-center justify-center text-[#857f78] text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors',
              currentPage === p ? 'bg-[#d72322] text-white' : 'text-[#0a0a0a] hover:bg-gray-50'
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-8 px-4 text-[13px] font-medium text-[#0a0a0a] border border-[#d4cec4] rounded-md disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const AllFightersGrid = ({ externalRatings, divisionFilter }: AllFightersGridProps) => {
  const queryClient = useQueryClient();

  // ── States ────────────────────────────────────────────────────────────────
  const [query,             setQuery]             = useState('');
  const [inputValue,        setInputValue]        = useState('');
  const [division,          setDivision]          = useState('All Division');
  const [country,           setCountry]           = useState('All Countries');
  const [status,            setStatus]            = useState<'all' | 'active' | 'inactive'>('all');
  const [rating,            setRating]            = useState('Ratings');
  const [currentPage,       setCurrentPage]       = useState(1);
  const [selectedFighterId, setSelectedFighterId] = useState<string | null>(null);

  // Background loading state for all filtered profiles
  const [enrichedDataMap, setEnrichedDataMap] = useState<Record<string, EnrichedData>>({});

  // ── Data ──────────────────────────────────────────────────────────────────
  const { data: divisionsData } = useDivisions();
  const divisionsList: { id: string; name: string }[] = useMemo(
    () => (divisionsData?.data ?? []).filter((d: any) => d.name !== 'Unclassified'),
    [divisionsData]
  );

  const { data, isLoading, error, isFetching } = useRankingsTable({
    externalRatings,
    divisionFilter,
  });

  const handleRefresh = useCallback(() => {
    clearRankingsCache();
    setEnrichedDataMap({});
    queryClient.invalidateQueries({ queryKey: ['rankings-table'] });
    queryClient.invalidateQueries({ queryKey: ['fighter-profile-modal'] });
    setCurrentPage(1);
  }, [queryClient]);

  // Flatten all divisions into a single ranked list
  const allRows: RankingsTableRow[] = useMemo(
    () => data?.divisions.flatMap((d) => d.rows) ?? [],
    [data]
  );

  // Client-side filtering by name and division
  const filteredRows = useMemo(() => {
    let rows = allRows;

    // Name search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter((r) => r.fighterName.toLowerCase().includes(q));
    }

    // Division filter
    if (division && division !== 'All Division') {
      rows = rows.filter((r) => r.division === division);
    }

    // Country filter
    if (country && country !== 'All Countries') {
      const q = country.toLowerCase();
      rows = rows.filter((r) => {
        const enriched = enrichedDataMap[r.fighterId];
        return enriched?.nationality?.toLowerCase().includes(q);
      });
    }

    // Status filter
    if (status !== 'all') {
      rows = rows.filter((r) => {
        const enriched = enrichedDataMap[r.fighterId];
        if (!enriched) return true; // Keep visible while loading
        return enriched.status.toLowerCase() === status;
      });
    }

    return rows;
  }, [allRows, query, division, country, status, enrichedDataMap]);

  const totalFiltered = filteredRows.length;
  const totalPages    = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const safePage      = Math.min(currentPage, totalPages);
  const startIndex    = (safePage - 1) * PAGE_SIZE;
  const pageRows      = filteredRows.slice(startIndex, startIndex + PAGE_SIZE);
  const endIndex      = startIndex + pageRows.length;

  // ── Background Throttled Enrichment Worker ─────────────────────────────────
  useEffect(() => {
    if (allRows.length === 0) return;

    let isCancelled = false;
    const CONCURRENCY = 3;
    const DELAY_MS = 200;
    const activeRequests = new Set<string>();

    // Copy queue
    const queue = [...allRows];

    const fetchNext = async () => {
      if (isCancelled || queue.length === 0) return;

      // Prioritize loading visible page rows first
      const visibleIds = new Set(pageRows.map((r) => r.fighterId));
      let targetIndex = queue.findIndex(
        (r) => visibleIds.has(r.fighterId) && !enrichedDataMap[r.fighterId] && !activeRequests.has(r.fighterId)
      );

      // If no prioritized rows left, load remaining
      if (targetIndex === -1) {
        targetIndex = queue.findIndex(
          (r) => !enrichedDataMap[r.fighterId] && !activeRequests.has(r.fighterId)
        );
      }

      if (targetIndex === -1) {
        // Queue fully processed or currently active
        setTimeout(fetchNext, 1000);
        return;
      }

      const target = queue.splice(targetIndex, 1)[0];
      const fid = target.fighterId;

      activeRequests.add(fid);

      try {
        const [profileRes, fightsRes] = await Promise.all([
          boxingApiInstance.get(`/fighters/${fid}`).catch(() => null),
          boxingApiInstance.get(`/fights`, {
            params: { fighter_id: fid, date_sort: 'DESC', page_size: 6 }
          }).catch(() => null)
        ]);

        if (isCancelled) return;

        const profile = profileRes?.data?.data ?? profileRes?.data ?? null;
        const fights   = fightsRes?.data?.data   ?? [];

        const nationality = profile?.nationality ?? profile?.nationality_code ?? null;

        const wins   = profile?.stats?.wins   ?? profile?.stats?.win;
        const losses = profile?.stats?.losses ?? profile?.stats?.loss;
        const draws  = profile?.stats?.draws  ?? profile?.stats?.draw;
        const record = (wins !== undefined && losses !== undefined && draws !== undefined)
          ? `${wins}-${losses}-${draws}`
          : null;

        const kos = profile?.stats?.ko_wins != null ? Number(profile.stats.ko_wins) : null;

        let lastSix = 'N/A';
        if (Array.isArray(fights) && fights.length > 0) {
          const finished = fights.filter((f: any) => f?.status === 'FINISHED' && f?.results != null);
          if (finished.length > 0) {
            const recent = finished.slice(0, 6);
            const outcomes: string[] = [];
            recent.forEach((fight: any) => {
              const f1 = fight?.fighters?.fighter_1;
              const f2 = fight?.fighters?.fighter_2;
              const outcome = fight?.results?.outcome ?? '';
              if (outcome.toUpperCase() === 'NC') {
                outcomes.push('NC');
                return;
              }
              const isF1 = f1?.fighter_id === fid;
              const isF2 = f2?.fighter_id === fid;
              if (!isF1 && !isF2) return;
              const targetF = isF1 ? f1 : f2;
              const opponent = isF1 ? f2 : f1;
              if (targetF?.winner === true) outcomes.push('W');
              else if (opponent?.winner === true) outcomes.push('L');
              else outcomes.push('D');
            });
            if (outcomes.length > 0) {
              outcomes.reverse();
              lastSix = outcomes.join('-');
            }
          }
        }

        let statusVal: 'Active' | 'Inactive' | 'N/A' = 'N/A';
        if (Array.isArray(fights) && fights.length > 0) {
          const mostRecent = fights.find((f: any) => f?.status === 'FINISHED' && f?.date);
          if (mostRecent?.date) {
            try {
              const fightDate = new Date(mostRecent.date);
              const now = new Date();
              const diffMonths = (now.getTime() - fightDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
              statusVal = diffMonths > 18 ? 'Inactive' : 'Active';
            } catch {
              statusVal = 'N/A';
            }
          }
        }

        setEnrichedDataMap((prev) => ({
          ...prev,
          [fid]: { nationality, record, kos, lastSix, status: statusVal },
        }));

      } catch (err) {
        console.error(`Failed to background enrich fighter: ${fid}`, err);
      } finally {
        activeRequests.delete(fid);
        setTimeout(fetchNext, DELAY_MS);
      }
    };

    for (let i = 0; i < CONCURRENCY; i++) {
      fetchNext();
    }

    return () => {
      isCancelled = true;
    };
  }, [allRows, pageRows]);

  const handleFilterChange = useCallback((fn: () => void) => {
    fn();
    setCurrentPage(1);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilterChange(() => setQuery(inputValue.trim()));
  };

  return (
    <div className="w-full">
      {/* FILTER BAR — Figma node 78-29193 */}
      <section className="w-full bg-white border-b border-[#e8e2d8] px-4 sm:px-6 lg:px-[50px] py-[14px]">
        <div className="flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-0 xl:justify-between">
          {/* Left group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex h-[38px] items-center gap-2 rounded-[6px] border border-[#d4cec4] bg-white px-[13px] w-full sm:w-[360px] xl:w-[582px] shrink-0"
            >
              <Search className="h-4 w-4 shrink-0 text-[#857f78]" />
              <input
                type="search"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleFilterChange(() => setQuery(e.target.value));
                }}
                placeholder="Search by name..."
                className="flex-1 border-0 bg-transparent p-0 text-[13px] text-[#0a0a0a] placeholder:text-[#857f78] outline-none focus:outline-none"
              />
            </form>

            {/* Division */}
            <div className="relative h-[36px] w-full sm:w-[200px] xl:w-[262px] shrink-0">
              <select
                value={division}
                onChange={(e) => handleFilterChange(() => setDivision(e.target.value))}
                className="h-full w-full rounded-[6px] border border-[#d4cec4] bg-white pl-[10px] pr-8 text-[13px] text-[#857f78] outline-none appearance-none cursor-pointer hover:border-[#b0a898] transition-colors"
              >
                <option value="All Division">All Division</option>
                {divisionsList.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 h-4 w-4 text-[#857f78]" />
            </div>

            {/* Countries */}
            <div className="relative h-[36px] w-full sm:w-[220px] xl:w-[290px] shrink-0">
              <select
                value={country}
                onChange={(e) => handleFilterChange(() => setCountry(e.target.value))}
                className="h-full w-full rounded-[6px] border border-[#d4cec4] bg-white pl-[10px] pr-8 text-[13px] text-[#857f78] outline-none appearance-none cursor-pointer hover:border-[#b0a898] transition-colors"
              >
                {COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 h-4 w-4 text-[#857f78]" />
            </div>
          </div>

          {/* Right group */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-[6px] sm:gap-[22px]">
            {/* Status pills */}
            <div className="flex items-center gap-[6px]">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleFilterChange(() => setStatus(opt.value as any))}
                  className={cn(
                    'h-[26.5px] px-4 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap',
                    status === opt.value
                      ? 'bg-[#d72322] text-white'
                      : 'border border-[#d4cec4] text-[#857f78] hover:bg-gray-50'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Ratings */}
            <div className="relative h-[36px] w-[120px] xl:w-[161px] shrink-0">
              <select
                value={rating}
                onChange={(e) => handleFilterChange(() => setRating(e.target.value))}
                className="h-full w-full rounded-[6px] border border-[#d4cec4] bg-white pl-[10px] pr-8 text-[13px] text-[#857f78] outline-none appearance-none cursor-pointer hover:border-[#b0a898] transition-colors"
              >
                {RATING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 h-4 w-4 text-[#857f78]" />
            </div>

            {!isLoading && (
              <p className="text-[11px] text-[#857f78] whitespace-nowrap hidden sm:block">
                Showing {totalFiltered === 0 ? 0 : startIndex + 1}–{endIndex} of{' '}
                {totalFiltered.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* TABLE SECTION — Figma node 78-29153 */}
      <div className="px-4 sm:px-6 lg:px-[50px] py-8">
        {/* Section title */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-['Bebas_Neue'] uppercase tracking-wide text-[#0a0a0a]">
            RECENT RESULTS
          </h2>
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-1 text-[11px] font-medium text-[#857f78] hover:text-[#0a0a0a] transition-colors disabled:opacity-50"
            title="Refresh rankings data"
          >
            <RefreshCcw className={cn('h-3 w-3', isFetching && 'animate-spin')} />
            {isFetching ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="w-full bg-white rounded-lg overflow-hidden">
            <div className="hidden sm:flex border-b border-[#e8e2d8] w-full" style={{ height: 41 }}>
              {COLUMNS_CONFIG.map((col) => (
                <div
                  key={col.key}
                  className={cn('shrink-0 flex items-center', col.className)}
                  style={{
                    flex: col.flex,
                    justifyContent: col.align === 'center' ? 'center' : 'flex-start',
                  }}
                >
                  <p className="text-xs font-medium text-[#857f78] uppercase tracking-wider">{col.label}</p>
                </div>
              ))}
            </div>
            {Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-lg border border-red-200 bg-red-50">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700">Failed to load rankings</p>
              <p className="text-xs text-red-600 mt-0.5">
                {(error as Error).message || 'An unexpected error occurred.'}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#d72322] hover:text-[#b51d1c] transition-colors shrink-0"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* Data Table */}
        {!isLoading && !error && (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block w-full bg-white rounded-lg overflow-hidden">
              <div
                className="flex border-b border-[#e8e2d8] w-full bg-white"
                style={{ height: 41 }}
              >
                {COLUMNS_CONFIG.map((col) => (
                  <div
                    key={col.key}
                    className={cn('shrink-0 flex items-center', col.className)}
                    style={{
                      flex: col.flex,
                      justifyContent: col.align === 'center' ? 'center' : 'flex-start',
                    }}
                  >
                    <p className="text-xs font-medium text-[#857f78] uppercase tracking-wider">
                      {col.label}
                    </p>
                  </div>
                ))}
              </div>

              {pageRows.length === 0 ? (
                <div className="flex items-center justify-center py-16">
                  <p className="text-[#857f78] text-sm">
                    {allRows.length === 0 ? 'No rankings data available.' : 'No results match your filters.'}
                  </p>
                </div>
              ) : (
                pageRows.map((row, idx) => (
                  <DesktopRow
                    key={`${row.fighterId}-${idx}`}
                    row={row}
                    displayRank={row.rank > 0 ? row.rank : startIndex + idx + 1}
                    enriched={enrichedDataMap[row.fighterId]}
                    onFighterClick={(id) => setSelectedFighterId(id)}
                  />
                ))
              )}
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden">
              {pageRows.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-[#857f78] text-sm text-center">
                    {allRows.length === 0 ? 'No rankings data available.' : 'No results match your filters.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pageRows.map((row, idx) => (
                    <MobileCard
                      key={`${row.fighterId}-${idx}`}
                      row={row}
                      displayRank={row.rank > 0 ? row.rank : startIndex + idx + 1}
                      enriched={enrichedDataMap[row.fighterId]}
                      onFighterClick={(id) => setSelectedFighterId(id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setCurrentPage(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Fighter Profile Modal */}
      <FighterProfileModal
        fighterId={selectedFighterId}
        onClose={() => setSelectedFighterId(null)}
      />
    </div>
  );
};

export default AllFightersGrid;
