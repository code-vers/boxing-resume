'use client';

import React from 'react';

const BELT_INFO = [
  { label: 'Organization', value: 'NABF' },
  { label: 'Tier Level', value: 'Continental' },
  { label: 'Weight Class', value: 'Welterweight' },
  { label: 'First Awarded', value: 'Mar 12, 2023' },
  { label: 'Total Reigns', value: '2' },
  { label: 'Active Holder Count', value: '2' },
  { label: 'Current Status', value: 'Active' },
];

export default function TitleBeltInfo() {
  return (
    <div className="w-full mx-auto px-6 md:px-12 py-10">
      <div className="bg-white border border-[#e8e2d8] rounded-[10px] p-6 flex flex-col gap-1">
        <h4 className="text-[16px] font-['Bebas_Neue'] text-[#0a0a0a] tracking-[0.48px] uppercase border-b border-[#e8e2d8] pb-3 mb-2">
          BELT INFORMATION
        </h4>
        <div className="flex flex-col">
          {BELT_INFO.map((info) => (
            <div
              key={info.label}
              className="flex items-center justify-between py-2 border-b border-[#f0ebe1] last:border-0"
            >
              <span className="text-[11px] text-[#857f78]">{info.label}</span>
              <span className="text-[12px] font-medium text-[#0a0a0a]">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
