"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddEventDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @component AddEventDrawer
 * @description A side drawer that slides in from the right to add a new event.
 */
export function AddEventDrawer({ isOpen, onClose }: AddEventDrawerProps) {
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
            Add Event
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
            {/* First Row: Event Name */}
            <div>
              <label
                className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                htmlFor='eventName'>
                Event Name
              </label>
              <input
                id='eventName'
                type='text'
                className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                placeholder='e.g. Fury vs Usyk II'
              />
            </div>

            {/* Second Row: Main Bout */}
            <div>
              <label
                className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                htmlFor='mainBout'>
                Main Bout
              </label>
              <input
                id='mainBout'
                type='text'
                className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                placeholder='e.g. Tyson Fury vs Oleksandr Usyk'
              />
            </div>

            {/* Third Row: Venue & Location */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='venue'>
                  Venue
                </label>
                <input
                  id='venue'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='e.g. Kingdom Arena'
                />
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='location'>
                  Location
                </label>
                <input
                  id='location'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='e.g. Riyadh, Saudi Arabia'
                />
              </div>
            </div>

            {/* Fourth Row: Date & Broadcast */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='date'>
                  Date
                </label>
                <input
                  id='date'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='YYYY-MM-DD'
                />
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='broadcast'>
                  Broadcast
                </label>
                <input
                  id='broadcast'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='e.g. DAZN PPV'
                />
              </div>
            </div>

            {/* Fifth Row: Bouts & Status */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='bouts'>
                  Total Bouts
                </label>
                <input
                  id='bouts'
                  type='number'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='e.g. 10'
                />
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='status'>
                  Status
                </label>
                <select
                  id='status'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value='upcoming'>Upcoming</option>
                  <option value='ongoing'>Live / Ongoing</option>
                  <option value='completed'>Completed</option>
                  <option value='cancelled'>Cancelled</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Footer (Actions) */}
        <div className='px-6 py-6 border-t border-[#F5F5F5] flex items-center justify-start gap-3 bg-gray-50/50'>
          <button
            type='button'
            className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-2.5 rounded-[4px] text-xs tracking-widest font-bold uppercase font-heading transition-all duration-200 active:scale-[0.98] shadow-sm'>
            Save Event
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
