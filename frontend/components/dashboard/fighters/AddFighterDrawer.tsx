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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[70] transition-transform duration-300 ease-in-out transform flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
        {/* Header */}
        <div className='flex justify-between items-center px-6 pt-6 pb-4'>
          <h2 className='text-xl font-bold text-[#333333] tracking-wide uppercase font-heading'>
            Add Fighter
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
            aria-label='Close drawer'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Body (Form) */}
        <div className='px-6 py-4 flex-grow overflow-y-auto'>
          <form className='space-y-4'>
            {/* First Row: First Name & Last Name */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5'
                  htmlFor='firstName'>
                  First Name
                </label>
                <input
                  id='firstName'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2 px-3 outline-none border transition-all'
                  placeholder='Enter first name'
                />
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5'
                  htmlFor='lastName'>
                  Last Name
                </label>
                <input
                  id='lastName'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2 px-3 outline-none border transition-all'
                  placeholder='Enter last name'
                />
              </div>
            </div>

            {/* Second Row: Alias / Nickname */}
            <div>
              <label
                className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5'
                htmlFor='alias'>
                Alias / Nickname
              </label>
              <input
                id='alias'
                type='text'
                className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2 px-3 outline-none border transition-all'
                placeholder='e.g. The Monster'
              />
            </div>

            {/* Third Row: DOB & Nationality */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5'
                  htmlFor='dob'>
                  Date of Birth
                </label>
                <input
                  id='dob'
                  type='text'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2 px-3 outline-none border transition-all'
                  placeholder='YYYY-MM-DD'
                />
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5'
                  htmlFor='nationality'>
                  Nationality
                </label>
                <select
                  id='nationality'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2 px-3 outline-none border transition-all text-[#333333]'>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5'
                  htmlFor='weightDivision'>
                  Weight Division
                </label>
                <select
                  id='weightDivision'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2 px-3 outline-none border transition-all text-[#333333]'>
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
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5'
                  htmlFor='stance'>
                  Stance
                </label>
                <select
                  id='stance'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2 px-3 outline-none border transition-all text-[#333333]'>
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
        <div className='px-6 py-6 border-t border-[#F5F5F5] flex items-center justify-start gap-3 bg-white'>
          <button
            type='button'
            className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-2.5 rounded-[4px] text-xs tracking-widest font-bold uppercase font-heading transition-colors shadow-sm'>
            Save Fighter
          </button>
          <button
            type='button'
            onClick={onClose}
            className='bg-white border border-[#E0E0E0] text-[#333333] hover:bg-gray-50 px-6 py-2.5 rounded-[4px] text-xs font-bold uppercase font-heading transition-colors shadow-sm'>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
