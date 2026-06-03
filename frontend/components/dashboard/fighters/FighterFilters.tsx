"use client";

import React from "react";
import { Download, Plus, Upload } from "lucide-react";

/**
 * @component FighterFilters
 * @description Action strip for the Fighter Management page.
 */
export function FighterFilters() {
  return (
    <div className='flex min-h-[40px] w-full items-start justify-between bg-transparent'>
      <button
        type='button'
        className='inline-flex h-[25px] items-center gap-[9px] rounded-[3px] bg-[#dc2626] px-[16px] text-[14px] font-semibold leading-none text-white transition-colors hover:bg-[#b91c1c]'>
        <Plus className='h-[9px] w-[9px] stroke-[2.5]' />
        <span>ADD FIGHTER</span>
      </button>

      <div className='flex items-center gap-[6px] pt-[2px]'>
        <button
          type='button'
          className='inline-flex h-[21px] items-center gap-[8px] rounded-[3px] border border-[#d9d2c7] bg-[#f5f1e8] px-[11px] text-[9px] font-medium leading-none text-[#27231e] transition-colors hover:bg-[#f8f5ef]'>
          <Upload className='h-[10px] w-[10px] text-[#57514a]' />
          <span>Import CSV</span>
        </button>
        <button
          type='button'
          className='inline-flex h-[21px] items-center gap-[8px] rounded-[3px] border border-[#d9d2c7] bg-[#f5f1e8] px-[11px] text-[9px] font-medium leading-none text-[#27231e] transition-colors hover:bg-[#f8f5ef]'>
          <Download className='h-[10px] w-[10px] text-[#57514a]' />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
