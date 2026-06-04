"use client";

import React from "react";
import { Download, Plus, Search, Upload } from "lucide-react";
import { FighterStatus } from "@/types/Fighter.types";
import { cn } from "@/lib/utils";

export type FighterStatusFilter = "all" | FighterStatus | "pending_review";

export interface FighterFilterValues {
  search: string;
  division: string;
  status: FighterStatusFilter;
}

interface FighterFiltersProps {
  values: FighterFilterValues;
  divisions: string[];
  onChange: (values: FighterFilterValues) => void;
}

const statusFilters: { label: string; value: FighterStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: FighterStatus.ACTIVE },
  { label: "Inactive", value: FighterStatus.INACTIVE },
  { label: "Pending Review", value: "pending_review" },
];

/**
 * @component FighterFilters
 * @description Action strip and filter controls for the Fighter Management page.
 */
export function FighterFilters({
  values,
  divisions,
  onChange,
}: FighterFiltersProps) {
  const updateFilters = (nextValues: Partial<FighterFilterValues>) => {
    onChange({ ...values, ...nextValues });
  };

  return (
    <div className='space-y-10 mb-28`'>
      <div className='flex min-h-10.5 w-full items-start justify-between bg-transparent'>
        <button
          type='button'
          className='inline-flex   py-3 items-center gap-2.25 rounded-[3px] bg-[#dc2626] px-4.5 text-[10px] font-semibold leading-none text-white transition-colors hover:bg-[#b91c1c]'>
          <Plus className='h-3 w-3 stroke-[2.5]' />
          <span className='font-bebas font-normal text-[14px]'>
            ADD FIGHTER
          </span>
        </button>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='inline-flex h-7.5 items-center gap-2 rounded-[3px] border border-[#d9d2c7] bg-[#f5f1e8] px-3 text-[11px] font-medium leading-none text-[#27231e] transition-colors hover:bg-[#f8f5ef]'>
            <Upload className='h-3 w-3 text-[#57514a]' />
            <span>Import CSV</span>
          </button>
          <button
            type='button'
            className='inline-flex h-7.5 items-center gap-2 rounded-[3px] border border-[#d9d2c7] bg-[#f5f1e8] px-3 text-[11px] font-medium leading-none text-[#27231e] transition-colors hover:bg-[#f8f5ef]'>
            <Download className='h-3 w-3 text-[#57514a]' />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className='flex min-h-16` w-full flex-col items-stretch gap-2.25 rounded-[5px] border border-[#e3ded4] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:flex-row lg:items-center llg:gap-2'>
        <div className='relative min-w-0 flex-1 lg:max-w-175'>
          <Search className='pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a867f]' />
          <input
            type='search'
            value={values.search}
            onChange={(event) => updateFilters({ search: event.target.value })}
            className='h-8 w-full rounded-[3px] border border-[#d9d2c7] bg-white pl-8.5 pr-3 text-[11px] leading-none text-[#27231e] outline-none transition-colors placeholder:text-[#8a867f] focus:border-[#dc2626] focus:ring-0'
            placeholder='Search fighter name, alias, nationality...'
          />
        </div>

        <select
          value={values.division}
          onChange={(event) => updateFilters({ division: event.target.value })}
          className='h-8 w-full shrink-0 rounded-[3px] border border-[#d9d2c7] bg-white px-3 text-[11px] leading-none text-[#6f6a62] outline-none transition-colors focus:border-[#dc2626] focus:ring-0 lg:w-58'>
          <option value='all'>All Division</option>
          {divisions.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </select>

        <div className='flex shrink-0 flex-wrap items-center gap-2 lg:flex-nowrap'>
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type='button'
              onClick={() => updateFilters({ status: filter.value })}
              className={cn(
                "h-8 rounded-[3px] border border-[#d9d2c7] bg-white px-3 text-[11px] font-medium leading-none text-[#27231e] transition-colors hover:bg-[#f8f5ef]",
                values.status === filter.value && "bg-[#f8f5ef] font-semibold",
              )}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
