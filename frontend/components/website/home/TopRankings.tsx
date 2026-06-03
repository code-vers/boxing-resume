'use client';

import { topRankings } from '@/constants/seed-data';
import { cn } from '@/lib/utils';
import { IRanking } from '@/types/Ranking.types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
  fighters: IRanking[];
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
  // 2. We simulate grouping your flat topRankings array into the 5 division cards required by Figma.
  // In a real scenario with a database, you might fetch these groups directly via an API.
  const displayCards: DivisionCardData[] = [
    {
      id: 'div_1',
      division: 'HEAVY WEIGHT',
      label: 'P4P Top 5',
      fighters: topRankings.slice(0, 5),
    },
    {
      id: 'div_2',
      division: 'MIDDLE WEIGHT',
      label: 'P4P Top 5',
      fighters: topRankings.slice(5, 10),
    },
    {
      id: 'div_3',
      division: 'WELTER WEIGHT',
      label: 'Top 5',
      fighters: topRankings.slice(10, 15),
    },
    {
      id: 'div_4',
      division: 'MIDDLE WEIGHT',
      label: 'Top 5',
      fighters: topRankings.slice(15, 20),
    },
    {
      id: 'div_5',
      division: 'HEAVY WEIGHT',
      label: 'P4P Top 5',
      // Re-using data just to fill the 5th card for the UI layout
      fighters: topRankings.slice(0, 5),
    },
  ];

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
          {displayCards.map((card) => (
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
                        className='flex items-center border-b border-[#F0EAE1] py-2.5 last:border-none last:pb-0'
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
                        <span className='truncate text-[13px] font-medium text-text-primary'>
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
    </section>
  );
}
