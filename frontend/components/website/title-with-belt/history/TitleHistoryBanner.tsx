'use client';

import React from 'react';

interface TitleHistoryBannerProps {
  beltName: string;
  onBack: () => void;
}

const STATS = [
  { label: 'TOTAL REIGNS', value: '2' },
  { label: 'LONGEST REIGN', value: '8 mo' },
  { label: 'MOST DEFENSES', value: '3' },
  { label: 'CURRENT HOLDER SINCE', value: 'Nov 2023' },
  { label: 'TOTAL VACANT PERIODS', value: '0' },
];

export default function TitleHistoryBanner({ beltName, onBack }: TitleHistoryBannerProps) {
  return (
    <div className="flex flex-col items-start w-full">
      {/* Dark Section */}
      <div className="bg-[#0a0a0a] w-full px-6 md:px-12 pt-8 pb-10 border-b border-white/20">
        <div className="mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-[11px] text-[#929aa3]">
              <li>
                <button onClick={onBack} className="hover:text-white transition-colors">
                  Titles
                </button>
              </li>
              <li>→</li>
              <li>Minor Belts</li>
              <li>→</li>
              <li className="text-white">{beltName}</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-white uppercase tracking-tight mb-0">
            {beltName}
          </h1>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#111111] w-full border-t border-[#1e1e1e]">
        <div className="mx-auto flex flex-wrap divide-y md:divide-y-0 md:divide-x divide-[#1e1e1e]">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex-1 min-w-[200px] flex flex-col items-center justify-center py-6 px-4">
              <span className="text-[22px] font-['Bebas_Neue'] text-white mb-1">
                {stat.value}
              </span>
              <span className="text-[10px] text-[#555555] tracking-[0.8px] uppercase font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
