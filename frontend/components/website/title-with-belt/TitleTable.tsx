'use client';

import React, { useMemo, useState } from 'react';
import type { FilterState } from './TitleFilters';

type BeltRow = {
  id: number;
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

function makeDemoData(count = 42): BeltRow[] {
  const rows: BeltRow[] = [];
  for (let i = 0; i < count; i++) {
    const org = ORGS[i % ORGS.length];
    const tier = TIERS[i % TIERS.length];
    const status = i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Vacant' : 'Interim';
    const division = ['Middleweight', 'Welterweight', 'Heavyweight', 'Lightweight'][i % 4];
    const holderName = ['Carlos Adames', 'John Doe', 'Jane Smith', 'Alex Brown'][i % 4];

    rows.push({
      id: i + 1,
      beltName: `WBC Silver Middleweight`,
      org: org.code,
      orgColor: org.color,
      tier: tier.label,
      tierColor: tier.color,
      division,
      holderInitials: holderName
        .split(' ')
        .map((n) => n[0])
        .join(''),
      holderName,
      heldSince: 'Nov 2023',
      status: status as BeltRow['status'],
    });
  }
  return rows;
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

export default function TitleTable({ filters }: TitleTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 7; // match visual density

  const allData = useMemo(() => makeDemoData(35), []);
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
                  <td className="px-4 py-4 text-center text-[#d72322]">History →</td>
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
                    <div className="text-[#d72322]">History →</div>
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
