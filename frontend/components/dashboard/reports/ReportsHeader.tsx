"use client";

import React from "react";
import { Button } from "@/components/ui/button";

/**
 * @component ReportsHeader
 * @description Header for the Stats & Reports page with title, description, and period filters.
 */
export function ReportsHeader() {
  return (
    <header className='space-y-4' data-purpose='dashboard-header'>
      <div>
        <h1 className='font-oswald text-3xl font-bold tracking-wide uppercase'>
          Stats & Reports
        </h1>
        <p className='mt-1 text-sm text-slate-500'>
          Platform-wide statistics, KO data, weight class breakdowns, and performance reports.
        </p>
      </div>

      {/* Filters */}
      <div className='flex flex-wrap items-center gap-3 text-xs'>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 px-3 text-[11px] font-medium bg-white">Last 7 days</Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-[11px] font-medium bg-white">Last 30 days</Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-[11px] font-medium bg-white">Last 12 months</Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-[11px] font-medium bg-white">All time</Button>
        </div>
        
        <div className='flex items-center space-x-2 lg:ml-4'>
          <input
            className='w-24 rounded border border-slate-300 bg-white px-2 py-1.5 focus:border-red-600 focus:ring-red-600 outline-none transition-all'
            placeholder='Start Date'
            type='text'
          />
          <span className='text-slate-500'>to</span>
          <input
            className='w-24 rounded border border-slate-300 bg-white px-2 py-1.5 focus:border-red-600 focus:ring-red-600 outline-none transition-all'
            placeholder='End Date'
            type='text'
          />
        </div>
      </div>
    </header>
  );
}
