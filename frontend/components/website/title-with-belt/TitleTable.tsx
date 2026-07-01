'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTitles } from '@/features/rankings/api/rankings.api';
import { ApiTitle } from '@/features/rankings/types';
import type { FilterState } from './TitleFilters';

export type BeltRow = {
  id: string | number;
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
  { label: 'full', color: 'bg-[#dcfce7] text-[#166534]' },
  { label: 'interim', color: 'bg-[#fff3db] text-[#854d0e]' },
];

const getOrgColor = (orgName: string) => {
  const found = ORGS.find(o => orgName.toUpperCase().includes(o.code) || o.code.includes(orgName.toUpperCase()));
  return found?.color || 'bg-[#f1ede1] text-[#0a0a0a]';
};

const getTierColor = (tier: string) => {
  const found = TIERS.find(t => t.label.toLowerCase() === tier.toLowerCase());
  return found?.color || 'bg-[#f1ede1] text-[#0a0a0a]';
};

function mapApiTitleToBeltRow(apiTitle: ApiTitle): BeltRow {
  // Determine organization short code if possible
  let orgCode = apiTitle.organization?.name || 'Unknown';
  if (orgCode.includes('WBC')) orgCode = 'WBC';
  else if (orgCode.includes('WBA')) orgCode = 'WBA';
  else if (orgCode.includes('WBO')) orgCode = 'WBO';
  else if (orgCode.includes('IBF')) orgCode = 'IBF';
  else if (orgCode.includes('Ring')) orgCode = 'The Ring';

  const holderName = apiTitle.fighter?.name || 'Vacant';
  const holderInitials = holderName !== 'Vacant'
    ? holderName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : '-';

  const status = holderName === 'Vacant' ? 'Vacant' : apiTitle.title_type === 'interim' ? 'Interim' : 'Active';

  return {
    id: apiTitle.id,
    beltName: apiTitle.name || `${orgCode} ${apiTitle.division?.name || ''} Title`,
    org: orgCode,
    orgColor: getOrgColor(orgCode),
    tier: apiTitle.title_type || 'Unknown',
    tierColor: getTierColor(apiTitle.title_type || ''),
    division: apiTitle.division?.name || 'Unknown',
    holderInitials,
    holderName,
    heldSince: 'N/A', // The API doesn't provide this directly in the basic titles endpoint
    status: status,
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
      if (row.tier.toLowerCase() !== filters.tier.toLowerCase()) return false;
    }

    // Division filter (only if not "All Division")
    if (filters.division && filters.division !== 'All Division') {
      if (row.division.toLowerCase() !== filters.division.toLowerCase()) return false;
    }

    // Organization filter (only if not "All Organization")
    if (filters.organization && filters.organization !== 'All Organization') {
      if (row.org.toLowerCase() !== filters.organization.toLowerCase()) return false;
    }

    return true;
  });
}

export default function TitleTable({ filters, onHistoryClick }: TitleTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 7; // match visual density

  const { data, isLoading, error } = useQuery({
    queryKey: ['boxingTitles'],
    queryFn: () => getTitles(),
  });

  const allData: BeltRow[] = useMemo(() => {
    return data?.data?.map(mapApiTitleToBeltRow) || [];
  }, [data]);

  const filteredData = useMemo(() => applyFilters(allData, filters), [allData, filters]);

  const total = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="mt-6 md:mx-10 my-14 p-4">
      {isLoading && <div className="text-center py-10">Loading titles...</div>}
      {error && <div className="text-center py-10 text-red-500">Failed to load titles.</div>}

      {!isLoading && !error && (
        <>
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
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-10 text-center text-[#656464]">
                        No titles found matching the selected filters.
                      </td>
                    </tr>
                  )}
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
                {paginated.length === 0 && (
                  <div className="px-6 py-10 text-center text-[#656464]">
                    No titles found matching the selected filters.
                  </div>
                )}
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
              disabled={page === 1 || totalPages === 0}
              className="rounded-md border border-[#e8e2d8] px-3 py-2 disabled:opacity-50"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              // To avoid rendering too many buttons, show only nearby pages if totalPages is large
              if (totalPages > 7) {
                 if (p !== 1 && p !== totalPages && Math.abs(p - page) > 1) {
                    if (p === 2 || p === totalPages - 1) return <span key={p}>...</span>;
                    return null;
                 }
              }

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
              disabled={page === totalPages || totalPages === 0}
              className="rounded-md border border-[#e8e2d8] px-3 py-2 disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}
