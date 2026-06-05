"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddFighterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  divisions: string[];
}

/**
 * @component AddFighterDrawer
 * @description A side drawer that slides in from the right to add a new fighter.
 */
export function AddFighterDrawer({
  isOpen,
  onClose,
  divisions,
}: AddFighterDrawerProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Double requestAnimationFrame ensures the DOM has painted the initial "hidden" state
      // before we flip isVisible to true, which guarantees the CSS transition will trigger.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      // Wait for transition (500ms) before unmounting
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
            Add Fighter
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
            {/* First Row: First Name & Last Name */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='firstName'>
                  First Name
                </label>
                <input
                  id='firstName'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='Enter first name'
                />
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='lastName'>
                  Last Name
                </label>
                <input
                  id='lastName'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='Enter last name'
                />
              </div>
            </div>

            {/* Second Row: Alias / Nickname */}
            <div>
              <label
                className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                htmlFor='alias'>
                Alias / Nickname
              </label>
              <input
                id='alias'
                type='text'
                className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                placeholder='e.g. The Monster'
              />
            </div>

            {/* Third Row: DOB & Nationality */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='dob'>
                  Date of Birth
                </label>
                <input
                  id='dob'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                  placeholder='YYYY-MM-DD'
                />
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='nationality'>
                  Nationality
                </label>
                <select
                  id='nationality'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select Nationality</option>
                  <option value='USA'>USA</option>
                  <option value='Mexico'>Mexico</option>
                  <option value='UK'>United Kingdom</option>
                  <option value='Ukraine'>Ukraine</option>
                  <option value='Japan'>Japan</option>
                </select>
              </div>
            </div>

            {/* Fourth Row: Weight Division & Stance */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='weightDivision'>
                  Weight Division
                </label>
                <select
                  id='weightDivision'
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
                  htmlFor='stance'>
                  Stance
                </label>
                <select
                  id='stance'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select Stance</option>
                  <option value='Orthodox'>Orthodox</option>
                  <option value='Southpaw'>Southpaw</option>
                  <option value='Switch'>Switch</option>
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
            Save Fighter
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
