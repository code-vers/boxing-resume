'use client';

import React, { useMemo, useState, useEffect } from 'react';
import type { FilterState } from './TitleFilters';

export type BeltRow = {
  id: string;
  beltName: string;
  org: string;
  orgColor?: string;
  tier: string;
  tierColor?: string;
  division: string;
  holderInitials: string;
  holderName: string;
  heldSince: string;
  status: 'Active' | 'Vacant' | 'Interim';
  holderId: string | null;
};

interface TitleTableProps {
  filters?: FilterState;
  onHistoryClick?: (row: BeltRow) => void;
}

const ORGS = [
  { code: 'WBC', color: 'bg-[#dcfce7] text-[#166534]' },
  { code: 'NABF', color: 'bg-[#eeedfe] text-[#26215c]' },
  { code: 'IBF', color: 'bg-[#e6f1fb] text-[#185fa5]' },
  { code: 'WBO', color: 'bg-[#faece7] text-[#993c1d]' },
  { code: 'WBA', color: 'bg-[#fef9c3] text-[#854d0e]' },
  { code: 'EBU', color: 'bg-[#e1f5ee] text-[#04342c]' },
];

const TIERS = [
  { label: 'Intercontinental', color: 'bg-[#eeedfe] text-[#26215c]' },
  { label: 'Continental', color: 'bg-[#faece7] text-[#4a1b0c]' },
  { label: 'National', color: 'bg-[#fff3db] text-[#854d0e]' },
];

import { useQuery } from '@tanstack/react-query';
import { getTitles, getAllRankings } from '@/features/rankings/api/rankings.api';
import { ApiTitle } from '@/features/rankings/types';

function mapApiTitleToBeltRow(apiTitle: ApiTitle, allRankings: any[] = []): BeltRow {
  const orgName = apiTitle.organization.name;
  let orgCode = orgName.split(' ')[0];
  if (orgName.includes('WBC')) orgCode = 'WBC';
  else if (orgName.includes('IBF')) orgCode = 'IBF';
  else if (orgName.includes('WBO')) orgCode = 'WBO';
  else if (orgName.includes('WBA')) orgCode = 'WBA';
  else if (orgName.includes('Ring')) orgCode = 'Ring';

  const colorConfig = ORGS.find((o) => o.code === orgCode) || ORGS[0];

  let tier = 'World';
  let tierColor = 'bg-[#eeedfe] text-[#26215c]';
  const nameLower = apiTitle.name.toLowerCase();

  if (apiTitle.title_type === 'interim' || nameLower.includes('interim')) {
    tier = 'Interim';
    tierColor = 'bg-[#faece7] text-[#4a1b0c]';
  } else if (nameLower.includes('super')) {
    tier = 'Super';
    tierColor = 'bg-[#fff3db] text-[#854d0e]';
  } else if (orgCode === 'Ring' || nameLower.includes('ring')) {
    tier = 'Ring';
    tierColor = 'bg-[#e1f5ee] text-[#04342c]';
  }

  let holderName = 'Vacant';
  let isVacant = true;
  let heldSince = 'N/A';
  let holderId: string | null = null;

  // Find the current holder from the rankings data
  for (const rankingGroup of allRankings) {
    const titleIds = rankingGroup.title_ids || {};
    const matchesTitle = 
      titleIds.full === apiTitle.id || 
      titleIds.regular === apiTitle.id || 
      titleIds.interim === apiTitle.id;

    if (matchesTitle) {
      const champion = rankingGroup.champions?.[0];
      if (champion && !champion.is_vacant) {
        holderName = champion.fighter_name;
        isVacant = false;
        heldSince = rankingGroup.updated_at ? new Date(rankingGroup.updated_at).toLocaleDateString() : 'Unknown';
        holderId = champion.fighter_id || null;
      }
      break;
    }
  }

  const holderInitials = holderName !== 'Vacant' 
    ? holderName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() 
    : 'V';

  return {
    id: apiTitle.id,
    beltName: apiTitle.name,
    org: orgCode,
    orgColor: colorConfig.color,
    tier,
    tierColor,
    division: apiTitle.division.name,
    holderInitials,
    holderName,
    heldSince,
    status: isVacant ? 'Vacant' : 'Active',
    holderId,
  };
}

function applyFilters(data: BeltRow[], filters: FilterState | undefined): BeltRow[] {
  if (!filters) return data;

  return data.filter((row) => {
    // Search filter: check belt name, holder name, org
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        row.beltName.toLowerCase().includes(searchLower) ||
        row.holderName.toLowerCase().includes(searchLower) ||
        row.org.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Tier filter (only if not "All")
    if (filters.tier && filters.tier !== 'All') {
      if (row.tier !== filters.tier) return false;
    }

    // Division filter (only if not "All Division")
    if (filters.division && filters.division !== 'All Division') {
      if (row.division !== filters.division) return false;
    }

    // Organization filter (only if not "All Organization")
    if (filters.organization && filters.organization !== 'All Organization') {
      if (row.org !== filters.organization) return false;
    }

    return true;
  });
}

export default function TitleTable({ filters, onHistoryClick }: TitleTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 7; // match visual density

  const { data: titlesData, isLoading: isLoadingTitles, error: titlesError } = useQuery({
    queryKey: ['boxingTitles'],
    queryFn: () => getTitles(),
  });

  const { data: rankingsData, isLoading: isLoadingRankings, error: rankingsError } = useQuery({
    queryKey: ['allBoxingRankings'],
    queryFn: () => getAllRankings(),
    staleTime: 24 * 60 * 60 * 1000, // cache for a day since rankings don't change very often and we fetch many pages
  });

  const isLoading = isLoadingTitles || isLoadingRankings;
  const error = titlesError || rankingsError;

  const allData = useMemo(() => {
    if (!titlesData?.data) return [];
    const rankings = rankingsData || [];
    return titlesData.data.map(title => mapApiTitleToBeltRow(title, rankings));
  }, [titlesData, rankingsData]);

  const filteredData = useMemo(() => applyFilters(allData, filters), [allData, filters]);

  const total = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  if (isLoading) {
    return <div className="text-center py-20 text-[#0a0a0a]">Loading titles...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Failed to load titles.</div>;
  }

  return (
    <div className="mt-6 md:mx-10 my-14 p-4">
      <div className="overflow-hidden rounded-md border border-[#e8e2d8] bg-white">
        {/* Desktop table (sm and up) */}
        <div className="hidden sm:block ">
          <table className="w-full table-fixed text-sm">
            <thead className="border-b border-[#e8e2d8] bg-white">
              <tr>
                <th className="w-[320px] px-6 py-3 text-left text-xs font-bold text-[#656464]">BELT NAME</th>
                <th className="w-[140px] px-6 py-3 text-center text-xs font-bold text-[#656464]">ORG</th>
                <th className="w-[220px] px-4 py-3 text-center text-xs font-bold text-[#656464]">TIER</th>
                <th className="w-[150px] px-4 py-3 text-center text-xs font-bold text-[#656464]">DIVISION</th>
                <th className="w-[240px] px-4 py-3 text-center text-xs font-bold text-[#656464]">CURRENT HOLDER</th>
                <th className="w-[180px] px-4 py-3 text-center text-xs font-bold text-[#656464]">HELD SINCE</th>
                <th className="w-[160px] px-4 py-3 text-right text-xs font-bold text-[#656464]">STATUS</th>
                <th className="w-[140px] px-4 py-3 text-center text-xs font-bold text-[#656464]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((row) => (
                <tr key={row.id} className="border-b border-[#f1ede1]">
                  <td className="px-6 py-4">
                    <div className="text-[12px] font-medium text-[#0a0a0a]">{row.beltName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${row.orgColor}`}>
                      {row.org}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium ${row.tierColor}`}>
                      {row.tier}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-[#656464]">{row.division}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0a] text-xs text-white">
                        {row.holderInitials}
                      </div>
                      <div className="text-[12px] font-medium">{row.holderName}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-[#857f78]">{row.heldSince}</td>
                  <td className="px-4 py-4 text-right">
                    <div
                      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium ${
                        row.status === 'Active'
                          ? 'bg-[#dcfce7] text-[#166534]'
                          : row.status === 'Vacant'
                          ? 'bg-[#fee2e2] text-[#991b1b]'
                          : 'bg-[#fef9c3] text-[#854d0e]'
                      }`}
                    >
                      {row.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => onHistoryClick?.(row)}
                      className="text-[#d72322] hover:underline transition-all"
                    >
                      History →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list (visible below sm) */}
        <div className="block sm:hidden">
          <div className="divide-y divide-[#f1ede1]">
            {paginated.map((row) => (
              <div key={row.id} className="px-4 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#0a0a0a]">{row.beltName}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <div className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${row.orgColor}`}>
                        {row.org}
                      </div>
                      <div className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium ${row.tierColor}`}>
                        {row.tier}
                      </div>
                      <div className="text-xs text-[#656464]">{row.division}</div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0a] text-xs text-white">
                        {row.holderInitials}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#857f78]">
                  <div>{row.holderName} · {row.heldSince}</div>
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium ${
                      row.status === 'Active'
                        ? 'bg-[#dcfce7] text-[#166534]'
                        : row.status === 'Vacant'
                        ? 'bg-[#fee2e2] text-[#991b1b]'
                        : 'bg-[#fef9c3] text-[#854d0e]'
                    }`}>{row.status}</div>
                    <button 
                      onClick={() => onHistoryClick?.(row)}
                      className="text-[#d72322] hover:underline"
                    >
                      History →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          className="rounded-md border border-[#e8e2d8] px-3 py-2 disabled:opacity-50"
        >
          ‹
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={`rounded-md px-3 py-2 ${p === page ? 'bg-[#d72322] text-white' : 'border border-[#e8e2d8]'}`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages}
          className="rounded-md border border-[#e8e2d8] px-3 py-2 disabled:opacity-50"
        >
          ›
        </button>
      </div>
    </div>
  );
}
