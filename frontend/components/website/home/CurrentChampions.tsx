'use client';

import { ArrowRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFighter } from '@/features/rankings/hooks/useRankings';
import { getRankings } from '@/features/rankings/api/rankings.api';

// Shadcn UI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * @component ChampionRowItem
 * @description Renders a single row for a champion, handling its own data fetching for the fighter details.
 */
const ChampionRowItem = ({ championId, isVacant, titleName, division, belts }: { championId: string, isVacant: boolean, titleName: string, division: string, belts: string[] }) => {
  const { data: fighterData, isLoading } = useFighter(isVacant ? undefined : championId);
  
  const fighterName = isVacant ? 'VACANT' : (fighterData?.data?.name || 'Loading...');
  const firstName = isVacant ? 'VACANT' : (fighterName.split(' ')[0] || '');
  const lastName = isVacant ? '' : (fighterName.split(' ').slice(1).join(' ') || '');
  
  const initials = isVacant ? 'V' : (isLoading ? '' : getInitials(firstName, lastName));

  return (
    <TableRow
      className='border-b-[#222222] transition-colors hover:bg-[#1A1A1A] data-[state=selected]:bg-[#1A1A1A]'
    >
      {/* Left Column: Avatar and Info */}
      <TableCell className='px-6 py-5'>
        <div className='flex items-center gap-4'>
          {/* Initials Avatar */}
          <div className='flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-[#D72322] bg-transparent text-[13px] font-medium tracking-wider text-surface-white'>
            {isLoading ? <span className="animate-pulse">...</span> : initials}
          </div>

          {/* Name & Division */}
          <div className='flex flex-col'>
            <span className='text-[15px] font-bold text-surface-white'>
              {isLoading ? 'Loading...' : `${firstName} ${lastName}`}
            </span>
            <span className='mt-0.5 text-[13px] font-medium text-[#857F78]'>
              {division}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Right Column: Title Belts */}
      <TableCell className='px-6 py-5 text-right align-middle'>
        {/* Desktop View */}
        <span className='hidden text-[13px] font-medium tracking-[0.15em] text-[#D72322] sm:inline-block'>
          {belts.join(' · ')}
        </span>
        {/* Mobile View */}
        <span className='inline-block text-[11px] font-medium tracking-[0.1em] text-[#D72322] sm:hidden'>
          {belts.join('·')}
        </span>
      </TableCell>
    </TableRow>
  );
};

/**
 * @function getInitials
 * @description Extracts the first letter of the first and last name.
 * @param {string} first - First name
 * @param {string} last - Last name
 * @returns {string} Two-letter uppercase initials
 */
const getInitials = (first: string, last: string): string => {
  if (!first || !last) return '';
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
};

/**
 * @component CurrentChampions
 * @description Renders a dark-themed table of current boxing champions using Shadcn UI.
 * @returns {JSX.Element}
 */
export default function CurrentChampions() {
  const { data: rankingsRes, isLoading, error } = useQuery({
    queryKey: ['rapid-rankings-all'],
    queryFn: () => getRankings(),
  });

  const topChampions = useMemo(() => {
    const rankings = rankingsRes?.data || [];
    if (!rankings.length) return [];

    const fighterMap = new Map<string, { id: string, division: string, belts: Set<string>, isVacant: boolean, titleName: string }>();

    rankings.forEach((rankingItem) => {
      const orgName = rankingItem.organization?.name?.replace(/\s\(.+\)/, '') || 'ORG';
      const divName = rankingItem.division?.name || 'Unknown Division';
      
      rankingItem.champions?.forEach((champ: any) => {
        if (!champ.fighter_id) return;
        
        if (!fighterMap.has(champ.fighter_id)) {
           fighterMap.set(champ.fighter_id, {
             id: champ.fighter_id,
             division: divName,
             belts: new Set<string>(),
             isVacant: champ.is_vacant,
             titleName: '',
           });
        }
        fighterMap.get(champ.fighter_id)?.belts.add(orgName);
      });
    });

    return Array.from(fighterMap.values())
      .filter(f => !f.isVacant)
      .map(f => ({ id: f.id, division: f.division, belts: Array.from(f.belts), isVacant: f.isVacant, titleName: f.titleName }))
      // Sort by most belts first to find undisputed champions
      .sort((a, b) => b.belts.length - a.belts.length)
      .slice(0, 5); // Show top 5 champions
  }, [rankingsRes]);

  return (
    <section className='w-full bg-page-bg py-12 md:py-16'>
      <div className='w-full pl-2'>
        {/* * @section Section Header */}
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-black uppercase tracking-tight text-text-primary md:text-2xl'>
            Current Champions
          </h2>
          <Link
            href='/champions'
            className='group flex items-center gap-1 text-sm font-medium text-[#D72322] transition-colors hover:text-[#B91C1C]'
          >
            All titles
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* * @section Shadcn Table Container */}
        <div className='w-full overflow-hidden rounded-[12px] bg-[#111111] shadow-md'>
          <Table className='min-w-full border-collapse'>
            {/* Table Header */}
            <TableHeader>
              <TableRow className='border-b-[#222222] hover:bg-transparent'>
                <TableHead colSpan={2} className='h-auto px-6 py-5'>
                  <div className='flex items-center gap-3'>
                    <Trophy className='h-5 w-5 text-[#D72322]' strokeWidth={2} />
                    <span className='text-[16px] py-4.5 font-bold uppercase tracking-widest text-surface-white'>
                      World Title Holders
                    </span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={2} className="py-10 text-center text-sm font-medium text-[#857F78]">
                    Loading champions...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={2} className="py-10 text-center text-sm font-medium text-red-500">
                    Failed to load champions.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !error && topChampions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="py-10 text-center text-sm font-medium text-[#857F78]">
                    No champions found.
                  </TableCell>
                </TableRow>
              )}
              {topChampions.map((champ) => (
                <ChampionRowItem 
                  key={champ.id} 
                  championId={champ.id} 
                  isVacant={champ.isVacant}
                  titleName={champ.titleName}
                  division={champ.division} 
                  belts={champ.belts} 
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
