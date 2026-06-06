'use client';

import { useState } from 'react';

/**
 * @constant FILTER_OPTIONS
 * @description Available filter options for the events page.
 */
const FILTER_OPTIONS = ['All', 'Upcoming', 'Past', 'PPV Only', 'Live'];

/**
 * @component EventsFilter
 * @description Horizontal filter bar with pill-shaped buttons to categorize boxing events.
 */
export default function EventsFilter() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section className='bg-surface-white border-b border-[#e8e2d8] py-3 px-4 sm:px-6 md:px-8 xl:px-12'>
      <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
        {FILTER_OPTIONS.map((option) => {
          const isActive = activeFilter === option;
          return (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`whitespace-nowrap px-6 py-1.5 text-[11px] font-medium rounded-full transition-all duration-200 border ${
                isActive
                  ? 'bg-text-accent border-text-accent text-surface-white'
                  : 'bg-transparent border-[#d4cec4] text-[#857f78] hover:border-[#857f78] hover:text-text-primary'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}
