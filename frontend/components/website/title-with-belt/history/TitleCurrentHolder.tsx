'use client';

import React from 'react';
import CompareFighterDialog from './CompareFighterDialog';

interface TitleCurrentHolderProps {
  holderName: string;
  holderInitials: string;
  heldSince: string;
}

export default function TitleCurrentHolder({
  holderName,
  holderInitials,
  heldSince,
}: TitleCurrentHolderProps) {
  return (
    <div className="w-full mx-auto px-6 md:px-12 py-10">
      <div className="bg-[#0a0a0a] rounded-[10px] p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Circle */}
        <div className="w-[72px] h-[72px] rounded-full border-2 border-[#d72322] bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
          <span className="text-[28px] font-['Bebas_Neue'] text-white">
            {holderInitials}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <span className="text-[12px] font-['Bebas_Neue'] text-[#d72322] tracking-[1.2px] uppercase block mb-1">
            CURRENT HOLDER
          </span>
          <h2 className="text-[28px] font-['Bebas_Neue'] text-white uppercase tracking-[0.84px] leading-tight mb-1">
            {holderName}
          </h2>
          <div className="text-[13px] text-[#857f78] mb-2">25-1-0 (20 KOs)</div>
          <div className="flex items-center justify-center md:justify-start gap-4 text-[12px] text-[#857f78]">
            <span>🇺🇸 USA</span>
            <span>Held since {heldSince}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button className="border border-[#2a2a2a] rounded-[8px] px-6 py-2 text-[12px] font-medium text-white hover:bg-white/5 transition-colors whitespace-nowrap">
            View Profile →
          </button>
          
          <CompareFighterDialog
            currentFighter={{
              name: holderName,
              initials: holderInitials,
              record: '25-1-0 (20 KOs)',
            }}
            trigger={
              <button className="bg-[#d72322] rounded-[8px] px-6 py-2 text-[12px] font-medium text-white hover:bg-[#b91c1c] transition-colors whitespace-nowrap">
                Compare Fighter
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}
