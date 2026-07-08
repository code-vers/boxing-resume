'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFighter } from '@/features/rankings/api/rankings.api';
import { useParams } from 'next/navigation';

export default function FighterProfile() {
  const params = useParams();
  const id = params.id as string;

  const { data: fighterData, isLoading, error } = useQuery({
    queryKey: ['fighter', id],
    queryFn: () => getFighter(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="bg-[#f1ede1] min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0a0a0a] font-['Bebas_Neue'] text-2xl uppercase tracking-wide">Loading Fighter Data...</p>
        </div>
      </main>
    );
  }

  if (error || !fighterData?.data) {
    return (
      <main className="bg-[#f1ede1] min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#d72322] font-['Bebas_Neue'] text-2xl uppercase tracking-wide">Error loading fighter data.</p>
        </div>
      </main>
    );
  }

  const fighter = fighterData.data;
  const stats = fighter.stats;
  const initials = fighter.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase();

  return (
    <main className="bg-[#f1ede1] min-h-screen pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Banner / Header */}
        <div className="bg-[#0a0a0a] rounded-[10px] p-8 flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="w-[100px] h-[100px] rounded-full border-2 border-[#d72322] bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
            <span className="text-[36px] font-['Bebas_Neue'] text-white">
              {initials}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-[40px] font-['Bebas_Neue'] text-white uppercase tracking-[1.2px] leading-tight mb-2">
              {fighter.name}
            </h1>
            {fighter.alias && (
              <p className="text-[16px] text-[#d72322] font-['Bebas_Neue'] tracking-[1.6px] uppercase mb-4">
                "{fighter.alias}"
              </p>
            )}
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[14px] text-[#857f78]">
              {fighter.nationality && (
                <div className="flex items-center gap-2">
                  <span>🏳️</span>
                  <span>{fighter.nationality}</span>
                </div>
              )}
              {fighter.division?.name && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{fighter.division.name}</span>
                </div>
              )}
              {fighter.stance && (
                <div className="flex items-center gap-2">
                  <span className="uppercase text-[12px]">{fighter.stance} Stance</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center md:items-end">
             <div className="text-[32px] font-['Bebas_Neue'] text-white tracking-wide">
               {stats ? `${stats.wins}-${stats.losses}-${stats.draws}` : 'N/A'}
             </div>
             <div className="text-[14px] text-[#d72322] font-medium font-['Inter']">
               {stats?.ko_wins || 0} KOs
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#e8e2d8] rounded-[10px] p-6">
             <h3 className="text-[20px] font-['Bebas_Neue'] text-[#0a0a0a] tracking-[0.6px] uppercase border-b border-[#e8e2d8] pb-3 mb-4">
               Physical Stats
             </h3>
             <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                 <span className="text-[12px] text-[#857f78] uppercase tracking-wide">Height</span>
                 <span className="text-[14px] font-medium text-[#0a0a0a]">{fighter.height || 'Unknown'}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                 <span className="text-[12px] text-[#857f78] uppercase tracking-wide">Reach</span>
                 <span className="text-[14px] font-medium text-[#0a0a0a]">{fighter.reach || 'Unknown'}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                 <span className="text-[12px] text-[#857f78] uppercase tracking-wide">Status</span>
                 <span className="text-[14px] font-medium text-[#0a0a0a] capitalize">{fighter.status || 'Active'}</span>
               </div>
               {fighter.date_of_birth && (
                 <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                   <span className="text-[12px] text-[#857f78] uppercase tracking-wide">DOB</span>
                   <span className="text-[14px] font-medium text-[#0a0a0a]">{fighter.date_of_birth}</span>
                 </div>
               )}
             </div>
          </div>

          <div className="bg-white border border-[#e8e2d8] rounded-[10px] p-6">
             <h3 className="text-[20px] font-['Bebas_Neue'] text-[#0a0a0a] tracking-[0.6px] uppercase border-b border-[#e8e2d8] pb-3 mb-4">
               Career Record
             </h3>
             <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                 <span className="text-[12px] text-[#857f78] uppercase tracking-wide">Total Bouts</span>
                 <span className="text-[14px] font-medium text-[#0a0a0a]">{stats ? stats.wins + stats.losses + stats.draws : '0'}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                 <span className="text-[12px] text-[#857f78] uppercase tracking-wide">Wins (KOs)</span>
                 <span className="text-[14px] font-medium text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded">{stats?.wins || 0} ({stats?.ko_wins || 0})</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                 <span className="text-[12px] text-[#857f78] uppercase tracking-wide">Losses (KOs)</span>
                 <span className="text-[14px] font-medium text-[#991b1b] bg-[#fee2e2] px-2 py-0.5 rounded">{stats?.losses || 0} ({stats?.ko_losses || 0})</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-[#f0ebe1] last:border-0">
                 <span className="text-[12px] text-[#857f78] uppercase tracking-wide">Draws</span>
                 <span className="text-[14px] font-medium text-[#857f78] bg-[#f0ebe1] px-2 py-0.5 rounded">{stats?.draws || 0}</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}
