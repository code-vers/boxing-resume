"use client";

import React from "react";

/**
 * @component ReportsHeader
 * @description Header for the Stats & Reports page with title, description, and period filters.
 */
export function ReportsHeader() {
  const periods = ["Last 7 days", "Last 30 days", "Last 12 months", "All time"];

  return (
    <header
      className='-mt-5 -ml-3.5 space-y-3.75'
      data-purpose='dashboard-header'>
      {/* Filters */}
      <div className='flex flex-wrap ml-4 mt-4 items-center gap-x-2.5 gap-y-2 text-[9px] leading-none text-[#27231e]'>
        <div className='flex gap-2.5'>
          {periods.map((period) => (
            <button
              key={period}
              type='button'
              className='h-5.25 rounded-[3px] border border-[#d9d2c7] bg-[#f5f1e8] px-3  text-[11px] font-medium leading-none text-[#27231e] shadow-none transition-colors hover:bg-[#f8f5ef]'>
              {period}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <input
            className='h-5 w-20.75rounded-[3px] border border-[#d9d2c7] bg-[#f5f1e8] px-2 text-[9px] text-[#27231e] outline-none transition-colors focus:border-[#d72322] focus:ring-0'
            aria-label='Start date'
            type='text'
          />
          <span className='text-[9px] leading-none text-[#858178]'>to</span>
          <input
            className='h-5 w-20.75 rounded-[3px] border border-[#d9d2c7] bg-[#f5f1e8] px-2 text-[9px] text-[#27231e] outline-none transition-colors focus:border-[#d72322] focus:ring-0'
            aria-label='End date'
            type='text'
          />
        </div>
      </div>
    </header>
  );
}
