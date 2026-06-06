"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WinMethod } from "@/types/MatchRecords.types";

interface AddMatchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  divisions: string[];
}

/**
 * @component AddMatchDrawer
 * @description A side drawer that slides in from the right to add a new match result.
 */
export function AddMatchDrawer({
  isOpen,
  onClose,
  divisions,
}: AddMatchDrawerProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 500);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-[60] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isVisible ? "opacity-100 backdrop-blur-[2px]" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[70] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform flex flex-col",
          isVisible ? "translate-x-0" : "translate-x-full shadow-none"
        )}>
        {/* Header */}
        <div className='flex justify-between items-center px-6 pt-6 pb-4 border-b border-[#F5F5F5]'>
          <h2 className='text-xl font-bold text-[#333333] tracking-wide uppercase font-heading'>
            Add Fight Result
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full'
            aria-label='Close drawer'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Body (Form) */}
        <div className='px-6 py-8 flex-grow overflow-y-auto custom-scrollbar'>
          <form className='space-y-6'>
            {/* First Row: Event & Date */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='eventSelect'>
                  Event
                </label>
                <select
                  id='eventSelect'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select Event</option>
                  <option value='e1'>Fury vs Usyk II</option>
                  <option value='e2'>Inoue vs Nery</option>
                  <option value='e3'>Crawford vs Madrimov</option>
                </select>
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='matchDate'>
                  Date
                </label>
                <input
                  id='matchDate'
                  type='date'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333]'
                />
              </div>
            </div>

            {/* Second Row: Winner & Loser */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='winnerSelect'>
                  Winner
                </label>
                <select
                  id='winnerSelect'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-green-700 font-semibold cursor-pointer'>
                  <option value=''>Select Winner</option>
                  <option value='f1'>Canelo Alvarez</option>
                  <option value='f2'>Tyson Fury</option>
                  <option value='f3'>Oleksandr Usyk</option>
                </select>
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='loserSelect'>
                  Loser
                </label>
                <select
                  id='loserSelect'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-red-700 font-semibold cursor-pointer'>
                  <option value=''>Select Loser</option>
                  <option value='f1'>Canelo Alvarez</option>
                  <option value='f2'>Tyson Fury</option>
                  <option value='f3'>Oleksandr Usyk</option>
                </select>
              </div>
            </div>

            {/* Third Row: Method & Round */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='winMethod'>
                  Win Method
                </label>
                <select
                  id='winMethod'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select Method</option>
                  {Object.values(WinMethod).map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='round'>
                  Round
                </label>
                <input
                  id='round'
                  type='number'
                  min='1'
                  max='12'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='e.g. 12'
                />
              </div>
            </div>

            {/* Fourth Row: Division & Title */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='weightClass'>
                  Weight Division
                </label>
                <select
                  id='weightClass'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='titleMatch'>
                  Title (Optional)
                </label>
                <input
                  id='titleMatch'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='e.g. Undisputed Title'
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer (Actions) */}
        <div className='px-6 py-6 border-t border-[#F5F5F5] flex items-center justify-start gap-3 bg-gray-50/50'>
          <button
            type='button'
            className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-2.5 rounded-[4px] text-xs tracking-widest font-bold uppercase font-heading transition-all duration-200 active:scale-[0.98] shadow-sm'>
            Save Result
          </button>
          <button
            type='button'
            onClick={onClose}
            className='bg-white border border-[#E0E0E0] text-[#333333] hover:bg-gray-50 px-8 py-2.5 rounded-[4px] text-xs font-bold uppercase font-heading transition-all duration-200 active:scale-[0.98] shadow-sm'>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
