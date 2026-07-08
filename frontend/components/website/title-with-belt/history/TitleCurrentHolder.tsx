'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getFighter } from '@/features/rankings/api/rankings.api';
import CompareFighterDialog from './CompareFighterDialog';

interface TitleCurrentHolderProps {
  holderName: string;
  holderInitials: string;
  heldSince: string;
  holderId: string | null;
}

export default function TitleCurrentHolder({
  holderName,
  holderInitials,
  heldSince,
  holderId,
}: TitleCurrentHolderProps) {
  
  const { data: fighterData } = useQuery({
    queryKey: ['fighter', holderId],
    queryFn: () => getFighter(holderId!),
    enabled: !!holderId,
  });

  const fighter = fighterData?.data;
  const stats = fighter?.stats;
  const record = stats ? `${stats.wins}-${stats.losses}-${stats.draws} (${stats.ko_wins || 0} KOs)` : 'N/A';
  const nationality = fighter?.nationality || 'Unknown';

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
          {holderName.toUpperCase() === 'VACANT' ? (
            <>
              <span className="text-[12px] font-['Bebas_Neue'] text-[#d72322] tracking-[1.2px] uppercase block mb-1">
                CURRENT STATUS
              </span>
              <h2 className="text-[28px] font-['Bebas_Neue'] text-white uppercase tracking-[0.84px] leading-tight mb-2">
                TITLE IS VACANT
              </h2>
              <div className="text-[13px] text-[#857f78]">
                This title is currently awaiting a new champion.
              </div>
            </>
          ) : (
            <>
              <span className="text-[12px] font-['Bebas_Neue'] text-[#d72322] tracking-[1.2px] uppercase block mb-1">
                CURRENT HOLDER
              </span>
              <h2 className="text-[28px] font-['Bebas_Neue'] text-white uppercase tracking-[0.84px] leading-tight mb-1">
                {holderName}
              </h2>
              <div className="text-[13px] text-[#857f78] mb-2">{record}</div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-[12px] text-[#857f78]">
                <span>{nationality !== 'Unknown' ? `🏳️ ${nationality}` : 'Unknown'}</span>
                <span>Held since {heldSince}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {holderId ? (
            <Link href={`/fighters/${holderId}`} className="border border-[#2a2a2a] rounded-[8px] px-6 py-2 text-[12px] font-medium text-white hover:bg-white/5 transition-colors whitespace-nowrap text-center">
              View Profile →
            </Link>
          ) : (
            <button disabled className="border border-[#2a2a2a] rounded-[8px] px-6 py-2 text-[12px] font-medium text-white/50 cursor-not-allowed whitespace-nowrap text-center">
              View Profile →
            </button>
          )}
          
          <CompareFighterDialog
            currentFighter={{
              id: holderId || '',
              name: holderName,
              initials: holderInitials,
              record: record,
            }}
            trigger={
              <button disabled={!holderId} className="bg-[#d72322] rounded-[8px] px-6 py-2 text-[12px] font-medium text-white hover:bg-[#b91c1c] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                Compare Fighter
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}
