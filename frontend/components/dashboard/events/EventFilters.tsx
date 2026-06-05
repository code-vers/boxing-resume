"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface EventFilterValues {
  search: string;
  status: string;
}

interface EventFiltersProps {
  values: EventFilterValues;
  onChange: (values: EventFilterValues) => void;
}

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Live", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

/**
 * @component EventFilters
 * @description Search and status filter controls for the Events Management page.
 */
export function EventFilters({ values, onChange }: EventFiltersProps) {
  const updateFilters = (nextValues: Partial<EventFilterValues>) => {
    onChange({ ...values, ...nextValues });
  };

  return (
    <section className='bg-white rounded-md shadow-sm p-3 flex flex-wrap items-center gap-4 mb-6 border border-border'>
      {/* Search Input */}
      <div className='relative flex-grow max-w-xl'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-4 w-4 text-gray-400' />
        </div>
        <input
          type='text'
          value={values.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className='block w-full pl-10 pr-3 text-[12px] py-2 border border-[#D4CEC4] rounded-md leading-5 bg-white focus:outline-none placeholder:text-[#0A0A0A80] focus:ring-1 focus:ring-gray-300 focus:border-gray-300 sm:text-sm'
          placeholder='Search event name, venue, or fighter...'
        />
      </div>

      {/* Filter Buttons */}
      <div className='flex flex-wrap gap-2'>
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            type='button'
            onClick={() => updateFilters({ status: filter.value })}
            className={cn(
              "px-4 py-2 border border-[#D4CEC4] rounded-md text-[11px] font-medium transition-colors",
              values.status === filter.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-[#3D3B38] hover:bg-gray-50",
            )}>
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}
