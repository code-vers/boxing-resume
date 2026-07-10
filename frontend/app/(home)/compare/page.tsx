'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';
import { getFighter } from '@/features/rankings/api/rankings.api';

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const f1 = searchParams.get('f1');
  const f2 = searchParams.get('f2');

  const [query1, query2] = useQueries({
    queries: [
      {
        queryKey: ['fighter', f1],
        queryFn: () => getFighter(f1!),
        enabled: !!f1,
      },
      {
        queryKey: ['fighter', f2],
        queryFn: () => getFighter(f2!),
        enabled: !!f2,
      }
    ]
  });

  const isLoading = query1.isLoading || query2.isLoading;
  const isError = query1.isError || query2.isError || (!f1 || !f2);

  if (isLoading) {
    return (
      <main className="bg-[#f1ede1] min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0a0a0a] font-['Bebas_Neue'] text-2xl uppercase tracking-wide">Loading Comparison...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="bg-[#f1ede1] min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#d72322] font-['Bebas_Neue'] text-2xl uppercase tracking-wide mb-4">Error loading fighters or invalid IDs.</p>
          <button onClick={() => router.back()} className="text-[#0a0a0a] underline">Go Back</button>
        </div>
      </main>
    );
  }

  const fighter1 = query1.data?.data;
  const fighter2 = query2.data?.data;

  if (!fighter1 || !fighter2) return null;

  const f1Initials = fighter1.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  const f2Initials = fighter2.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

  const parseRecord = (stats: any) => stats ? `${stats.wins}-${stats.losses}-${stats.draws}` : 'N/A';

  const compareRow = (label: string, val1: any, val2: any) => (
    <div className="flex items-center justify-between py-3 border-b border-[#f0ebe1] last:border-0 hover:bg-[#faf9f6] transition-colors px-4">
      <div className="w-1/3 text-left">
        <span className="text-[15px] font-medium text-[#0a0a0a]">{val1 || '-'}</span>
      </div>
      <div className="w-1/3 text-center">
        <span className="text-[11px] text-[#857f78] uppercase tracking-wide font-medium">{label}</span>
      </div>
      <div className="w-1/3 text-right">
        <span className="text-[15px] font-medium text-[#0a0a0a]">{val2 || '-'}</span>
      </div>
    </div>
  );

  return (
    <main className="bg-[#f1ede1] min-h-screen pb-20 pt-10">
      <div className="max-w-5xl mx-auto px-6">
        <button onClick={() => router.back()} className="mb-6 text-[12px] font-medium text-[#857f78] hover:text-[#0a0a0a] transition-colors">
          ← Back to Titles
        </button>

        {/* Header Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch mb-8">
          
          {/* Fighter 1 */}
          <div className="bg-[#0a0a0a] rounded-[10px] p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#d72322] bg-[#1a1a1a] flex items-center justify-center mb-4">
              <span className="text-[32px] font-['Bebas_Neue'] text-white">{f1Initials}</span>
            </div>
            <h2 className="text-[28px] font-['Bebas_Neue'] text-white uppercase tracking-wide leading-tight mb-1">
              {fighter1.name}
            </h2>
            <div className="text-[16px] text-[#d72322] font-['Bebas_Neue'] tracking-[1.6px] uppercase mb-2">
              {fighter1.alias ? `"${fighter1.alias}"` : '—'}
            </div>
            <div className="text-[14px] text-[#857f78]">
              {fighter1.nationality ? `🏳️ ${fighter1.nationality}` : 'Unknown'}
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center py-4 lg:py-0">
            <div className="bg-[#d72322] w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-['Bebas_Neue'] text-[24px] uppercase italic">VS</span>
            </div>
          </div>

          {/* Fighter 2 */}
          <div className="bg-[#0a0a0a] rounded-[10px] p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#d72322] bg-[#1a1a1a] flex items-center justify-center mb-4">
              <span className="text-[32px] font-['Bebas_Neue'] text-white">{f2Initials}</span>
            </div>
            <h2 className="text-[28px] font-['Bebas_Neue'] text-white uppercase tracking-wide leading-tight mb-1">
              {fighter2.name}
            </h2>
            <div className="text-[16px] text-[#d72322] font-['Bebas_Neue'] tracking-[1.6px] uppercase mb-2">
              {fighter2.alias ? `"${fighter2.alias}"` : '—'}
            </div>
            <div className="text-[14px] text-[#857f78]">
              {fighter2.nationality ? `🏳️ ${fighter2.nationality}` : 'Unknown'}
            </div>
          </div>

        </div>

        {/* Head to Head Table */}
        <div className="bg-white border border-[#e8e2d8] rounded-[10px] overflow-hidden shadow-sm">
          <div className="bg-[#f0ebe1] px-6 py-4 border-b border-[#e8e2d8]">
            <h3 className="text-[20px] font-['Bebas_Neue'] text-[#0a0a0a] tracking-[0.6px] uppercase text-center">
              Tale of the Tape
            </h3>
          </div>
          <div className="flex flex-col py-2">
            {compareRow('Record', parseRecord(fighter1.stats), parseRecord(fighter2.stats))}
            {compareRow('Total Bouts', fighter1.stats ? fighter1.stats.wins + fighter1.stats.losses + fighter1.stats.draws : 0, fighter2.stats ? fighter2.stats.wins + fighter2.stats.losses + fighter2.stats.draws : 0)}
            {compareRow('Knockouts', fighter1.stats?.ko_wins || 0, fighter2.stats?.ko_wins || 0)}
            {compareRow('Division', fighter1.division?.name, fighter2.division?.name)}
            {compareRow('Height', fighter1.height, fighter2.height)}
            {compareRow('Reach', fighter1.reach, fighter2.reach)}
            {compareRow('Stance', fighter1.stance ? (fighter1.stance.charAt(0).toUpperCase() + fighter1.stance.slice(1)) : 'Unknown', fighter2.stance ? (fighter2.stance.charAt(0).toUpperCase() + fighter2.stance.slice(1)) : 'Unknown')}
            {compareRow('Age / DOB', fighter1.date_of_birth, fighter2.date_of_birth)}
            {compareRow('Status', fighter1.status ? (fighter1.status.charAt(0).toUpperCase() + fighter1.status.slice(1)) : 'Active', fighter2.status ? (fighter2.status.charAt(0).toUpperCase() + fighter2.status.slice(1)) : 'Active')}
          </div>
        </div>

      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <React.Suspense fallback={
      <main className="bg-[#f1ede1] min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0a0a0a] font-['Bebas_Neue'] text-2xl uppercase tracking-wide">Loading Comparison...</p>
        </div>
      </main>
    }>
      <CompareContent />
    </React.Suspense>
  );
}
