"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddBeltDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @component AddBeltDrawer
 * @description A side drawer that slides in from the right to add a new belt.
 */
export function AddBeltDrawer({ isOpen, onClose }: AddBeltDrawerProps) {
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
            Add New Belt
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
            {/* First Row: Belt Name */}
            <div>
              <label
                className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                htmlFor='beltName'>
                Belt Name
              </label>
              <input
                id='beltName'
                type='text'
                className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all placeholder:text-gray-300'
                placeholder='e.g. WBC Silver Middle'
              />
            </div>

            {/* Second Row: Organization & Tier */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='org'>
                  Organization
                </label>
                <select
                  id='org'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select ORG</option>
                  <option value='WBC'>WBC</option>
                  <option value='WBA'>WBA</option>
                  <option value='IBF'>IBF</option>
                  <option value='WBO'>WBO</option>
                  <option value='IBO'>IBO</option>
                </select>
              </div>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='tier'>
                  Tier
                </label>
                <select
                  id='tier'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select Tier</option>
                  <option value='World'>World Title</option>
                  <option value='Intercontinental'>Intercontinental</option>
                  <option value='Continental'>Continental</option>
                  <option value='National'>National / Regional</option>
                </select>
              </div>
            </div>

            {/* Third Row: Division & Status */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='block text-[10px] font-bold text-[#757575] uppercase mb-1.5 tracking-wider'
                  htmlFor='division'>
                  Division
                </label>
                <select
                  id='division'
                  className='w-full border-[#E0E0E0] rounded-[4px] focus:ring-[#D32F2F] focus:border-[#D32F2F] text-sm py-2.5 px-3 outline-none border transition-all text-[#333333] cursor-pointer'>
                  <option value=''>Select Division</option>
                  <option value='Heavyweight'>Heavyweight</option>
                  <option value='Cruiserweight'>Cruiserweight</option>
                  <option value='Light Heavyweight'>Light Heavyweight</option>
                  <option value='Super Middleweight'>Super Middleweight</option>
                  <option value='Middleweight'>Middleweight</option>
                  <option value='Welterweight'>Welterweight</option>
                </select>
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
                  <option value='Vacant'>Vacant</option>
                  <option value='Active'>Active</option>
                  <option value='Interim'>Interim</option>
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
            Save Belt
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
