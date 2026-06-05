"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ROLES } from "@/constants/roles";

export interface UserFilterValues {
  search: string;
  status: string;
  role: string;
}

interface UserFiltersProps {
  values: UserFilterValues;
  onChange: (values: UserFilterValues) => void;
}

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
  { label: "Pending", value: "pending" },
];

const roleFilters = [
  { label: "All Roles", value: "all" },
  { label: "User", value: ROLES.USER },
  { label: "Admin", value: ROLES.ADMIN },
];

export function UserFilters({ values, onChange }: UserFiltersProps) {
  const updateFilters = (nextValues: Partial<UserFilterValues>) => {
    onChange({ ...values, ...nextValues });
  };

  return (
    <section className='bg-white rounded-lg px-3 py-2.5 flex flex-wrap items-center justify-between shadow-sm border border-gray-200 mb-8'>
      <div className='flex items-center gap-2.5 flex-1'>
        {/* Search Input */}
        <div className='relative w-64'>
          <Search className='w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none' />
          <input
            type='text'
            value={values.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className='pl-8 pr-3 py-[5px] text-[12px]  w-full  text-gray-700 border border-[#D4CEC4] rounded-[5px] outline-none placeholder:text-gray-400 focus:border-gray-300 focus:ring-0'
            placeholder='Search by name, email, or username...'
          />
        </div>

        {/* Status Filters */}
        <div className='flex rounded-[5px] text-[13px] overflow-hidden'>
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type='button'
              onClick={() => updateFilters({ status: filter.value })}
              className={cn(
                "px-3 py-[5px] leading-[1.5] border border-[#D4CEC4] mx-1 rounded transition-colors whitespace-nowrap",
                values.status === filter.value
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-500 hover:bg-gray-50",
              )}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Role Filters */}
      <div className='flex rounded-[5px] text-[13px] overflow-hidden'>
        {roleFilters.map((filter) => (
          <button
            key={filter.value}
            type='button'
            onClick={() => updateFilters({ role: filter.value })}
            className={cn(
              "px-3 py-[5px] leading-[1.5] border border-[#D4CEC4] mx-1 rounded transition-colors whitespace-nowrap",
              values.role === filter.value
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-500 hover:bg-gray-50",
            )}>
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}
