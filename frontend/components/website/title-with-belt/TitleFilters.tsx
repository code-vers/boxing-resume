'use client';

import React from 'react';

const imgIcon = 'https://www.figma.com/api/mcp/asset/defb0b38-a242-4561-a70d-df659a203e59';

export type FilterState = {
  search: string;
  tier: string;
  division: string;
  organization: string;
};

interface TitleFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount?: number;
  currentCount?: number;
}

const TIERS = ['All', 'World', 'Super', 'Interim', 'Ring'];
const DIVISIONS = ['All Division', 'Middleweight', 'Welterweight', 'Heavyweight', 'Lightweight'];
const ORGANIZATIONS = ['All Organization', 'WBC', 'NABF', 'IBF', 'WBO', 'WBA', 'EBU'];

export default function TitleFilters({ filters, onFilterChange, totalCount = 4200, currentCount = 10 }: TitleFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleTierChange = (tier: string) => {
    onFilterChange({ ...filters, tier });
  };

  const handleDivisionChange = (division: string) => {
    onFilterChange({ ...filters, division });
  };

  const handleOrganizationChange = (organization: string) => {
    onFilterChange({ ...filters, organization });
  };

  return (
    <div className="bg-white border-b border-[#e8e2d8] px-4 py-4 sm:px-6">
      <div className="mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search (full width on mobile, fixed on desktop) */}
          <div className="w-full sm:w-[340px]">
            <div className="flex items-center gap-3 rounded-md border border-[#d4cec4] bg-white px-3 py-2">
              <img src={imgIcon} alt="search" className="h-4 w-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search belt name, fighter, or organization..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full bg-transparent text-[#857f78] text-sm placeholder:text-[#857f78] outline-none"
              />
            </div>
          </div>

          {/* Chips: horizontally scrollable on mobile, inline on larger screens */}
          <div className="mt-2 sm:mt-0 sm:ml-4 flex-1">
            <div className="-mx-2 flex w-full overflow-x-auto px-2 sm:overflow-visible sm:px-0">
              <div className="flex gap-3">
                {TIERS.map((tierOption) => (
                  <button
                    key={tierOption}
                    onClick={() => handleTierChange(tierOption)}
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      filters.tier === tierOption
                        ? 'bg-[#d72322] text-white'
                        : 'border border-[#d4cec4] text-[#857f78] hover:bg-[#f5f5f5]'
                    }`}
                  >
                    {tierOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: dropdowns and count (stack on mobile) */}
          <div className="mt-2 flex w-full items-center justify-between gap-3 sm:mt-0 sm:w-auto">
            <div className="flex w-full gap-2 sm:w-auto sm:flex-row flex-col">
              <select
                value={filters.division}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="rounded-md border border-[#d4cec4] bg-white px-3 py-2 w-full sm:w-[260px] text-[#857f78] text-sm outline-none cursor-pointer"
              >
                {DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>

              <select
                value={filters.organization}
                onChange={(e) => handleOrganizationChange(e.target.value)}
                className="rounded-md border border-[#d4cec4] bg-white px-3 py-2 w-full sm:w-[260px] text-[#857f78] text-sm outline-none cursor-pointer"
              >
                {ORGANIZATIONS.map((org) => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block text-sm text-[#857f78]">Showing {currentCount} of {totalCount}+</div>
            <div className="block sm:hidden text-sm text-[#857f78] text-right">{currentCount} of {totalCount}+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
