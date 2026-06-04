"use client";

import React from "react";
import { Search, Plus } from "lucide-react";

interface RankingToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

/**
 * @component RankingToolbar
 * @description Toolbar for search and adding fighters to the rankings.
 */
export function RankingToolbar({
  search,
  onSearchChange,
}: RankingToolbarProps) {
  return (
    <div className='flex justify-end items-center gap-3'>
      {/* Search Input */}
      <div className='relative w-72'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-4 w-4 text-slate-400' />
        </div>
        <input
          type='text'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='block text-[#0A0A0A80] placeholder:text-[#0A0A0A80] w-full pl-9 pr-3 py-2  rounded-md leading-5  border border-[#D4CEC4] focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors'
          placeholder='Search fighter to add...'
        />
      </div>

      {/* Add Button */}
      <button className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-btn-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors'>
        <Plus size={16} className='-ml-1 mr-2' strokeWidth={2.5} />
        Add
      </button>
    </div>
  );
}
