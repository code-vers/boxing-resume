'use client';

import { useQuery } from '@tanstack/react-query';
import { getRapidFightersApi } from '@/features/fighters/api/fighters.api';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { IRanking } from '@/types/Ranking.types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FighterProfileModal } from '../all-fighters/FighterProfileModal';

// Shadcn UI Imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * @interface DivisionCardData
 * @description Maps the UI card structure while strictly enforcing your rankingGet type for the data array.
 */
interface DivisionCardData {
  id: string;
  division: string;
  label: string;
  fighters: any[];
}

/**
 * @function formatRecord
 * @description Transforms the record object into a clean string (e.g., "22-0" or "22-0-1") matching Figma.
 * @param record The win/loss/draw object from FighterGet/rankingGet
 * @returns string
 */
const formatRecord = (record: { wins: number; losses: number; draws: number }): string => {
  if (record.draws > 0) {
    return `${record.wins}-${record.losses}-${record.draws}`;
  }
  return `${record.wins}-${record.losses}`;
};

/**
 * @component TopRankings
 * @description Renders a responsive 5-column ranking grid using Shadcn Cards and native types.
 * @returns {JSX.Element}
 */
export default function TopRankings() {
  const [selectedFighterId, setSelectedFighterId] = useState<string | null>(null);
  
  const { data: fightersRes, isLoading, error } = useQuery({
    queryKey: ['rapid-fighters-preview'],
    queryFn: () => getRapidFightersApi({ page: 1 }),
  });

  const displayCards: DivisionCardData[] = useMemo(() => {
    const fighters = fightersRes?.data || [];
    if (!fighters || fighters.length === 0) return [];

    const grouped: Record<string, any[]> = {};

    fighters.forEach((f: any) => {
      const div = f.division ? f.division.toUpperCase() : 'UNKNOWN DIVISION';
      if (!grouped[div]) grouped[div] = [];
      grouped[div].push(f);
    });

    const cards: DivisionCardData[] = [];
    const divNames = Object.keys(grouped);

    divNames.forEach((divName, i) => {
      if (cards.length >= 5) return;
      if (grouped[divName].length > 0) {
        cards.push({
          id: `div_${i}`,
          division: divName,
          label: `Top Fighters`,
          fighters: grouped[divName].slice(0, 5).map((f: any, index: number) => ({
            id: f.id || `${divName}-${index}`,
            rank: index + 1,
            fighter: {
              firstName: f.firstName || '',
              lastName: f.lastName || '',
            },
            record: { wins: f.wins || 0, losses: f.losses || 0, draws: f.draws || 0 },
          })),
        });
      }
    });

    // To ensure the UI looks good, if we have less than 5 cards but at least 1, we can optionally loop them
    // but returning what we have is more accurate.
    return cards;
  }, [fightersRes]);

  return (
    <section className='w-full bg-page-bg py-12 md:py-16'>
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12'>
        {/* * @section Section Header */}
        <div className='mb-6 flex items-end justify-between'>
          <h2 className='text-xl font-black uppercase tracking-tight text-text-primary md:text-2xl'>
            Top Ranking
          </h2>
          <Link
            href='/rankings'
            className='group flex items-center gap-1 text-sm font-medium text-[#D72322] transition-colors hover:text-[#B91C1C]'
          >
            Full Ranking
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* * @section Responsive Card Grid
         * @description Mobile/Tablet: Swipeable carousel. Desktop (XL): 5-column static grid.
         */}
        <div className='hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 xl:grid xl:grid-cols-5 xl:gap-5 xl:overflow-visible xl:pb-0'>
          {isLoading && (
            <div className="col-span-5 py-10 text-center text-sm font-medium text-[#857F78]">
              Loading rankings...
            </div>
          )}
          {error && (
            <div className="col-span-5 py-10 text-center text-sm font-medium text-red-500">
              Failed to load rankings.
            </div>
          )}
          {!isLoading && !error && displayCards.length === 0 && (
            <div className="col-span-5 py-10 text-center text-sm font-medium text-[#857F78]">
              No rankings available.
            </div>
          )}
          {!isLoading && !error && displayCards.map((card) => (
            <Card
              key={card.id}
              className='w-[85vw] shrink-0 snap-start rounded-[12px] border-none bg-surface-white shadow-sm sm:w-[45vw] md:w-[280px] xl:w-auto'
            >
              {/* Overriding default Shadcn padding to match Figma tightness */}
              <CardHeader className='px-5 pb-3 pt-5'>
                <CardTitle className='flex items-center justify-between'>
                  <span className='text-[11px] font-black uppercase tracking-widest text-text-primary'>
                    {card.division}
                  </span>
                  <span className='text-[10px] font-medium text-[#857F78]'>{card.label}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className='px-5 pb-5 pt-0'>
                <div className='flex flex-col'>
                  {card.fighters.map((rankData, index) => {
                    // Logic to make Ranks 1 & 2 Red, and Ranks 3+ Gray
                    const displayRank = index + 1; // Assuming array order represents rank 1-5
                    const isTopTwo = displayRank <= 2;

                    return (
                      <div
                        key={rankData.id}
                        onClick={() => setSelectedFighterId(rankData.id)}
                        className='flex items-center border-b border-[#F0EAE1] py-2.5 last:border-none last:pb-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors rounded-sm px-1 -mx-1'
                      >
                        {/* Rank Number */}
                        <span
                          className={cn(
                            'w-6 text-[12px] font-bold',
                            isTopTwo ? 'text-[#D72322]' : 'text-[#C4C0B8]',
                          )}
                        >
                          {displayRank}
                        </span>

                        {/* Fighter Name from rankingGet.fighter */}
                        <span className='truncate text-[13px] font-medium text-text-primary hover:text-[#D72322] transition-colors'>
                          {rankData.fighter.firstName} {rankData.fighter.lastName}
                        </span>

                        {/* Fighter Record formatting */}
                        <span className='ml-auto text-[11px] font-medium text-[#857F78]'>
                          {formatRecord(rankData.record)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Fighter Profile Modal */}
      <FighterProfileModal
        fighterId={selectedFighterId}
        onClose={() => setSelectedFighterId(null)}
      />
    </section>
  );
}
