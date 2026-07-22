'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRecentResults } from '@/features/fighters/hooks/useFighters';

// Shadcn UI Imports
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * @function formatFighterName
 * @description Converts full names into the abbreviated format shown in the UI (e.g., "O. Usyk")
 * @param {string} fullName - Fighter's full name
 * @returns {string} Formatted string: "F. Lastname"
 */
const formatFighterName = (fullName?: string, shortName?: string): string => {
  if (!fullName) return shortName || 'Unknown';
  const parts = fullName.split(' ');
  if (parts.length > 1) {
    return `${parts[0].charAt(0)}. ${parts.slice(1).join(' ')}`;
  }
  return fullName;
};

/**
 * @function formatDate
 * @description Formats a native Date object into "May 18, 2024"
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * @component RecentResults
 * @description Renders a strict tabular layout of the most recent fight results utilizing Shadcn UI.
 * @returns {JSX.Element}
 */
export default function RecentResults() {
  const { data: recentFights, isLoading, error } = useRecentResults();
  const results = recentFights || [];

  return (
    <section className='w-full bg-page-bg py-12 md:py-16'>
      <div className='w-full pr-2'>
        {/* * @section Section Header */}
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-black uppercase tracking-tight text-text-primary md:text-2xl'>
            Recent Results
          </h2>
          <Link
            href='/results'
            className='group flex items-center gap-1 text-sm font-medium text-text-accent transition-colors hover:text-btn-primary-hover'
          >
            All results
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* * @section Shadcn Table Container
         * @description Overriding standard Shadcn borders with Figma's specific #E8E2D8 hex.
         */}
        <div className='w-full overflow-hidden rounded-[8px] border border-[#E8E2D8] bg-surface-white shadow-sm'>
          <Table className='min-w-150 whitespace-nowrap'>
            <TableHeader className='bg-surface-white'>
              <TableRow className='border-b-[#E8E2D8] hover:bg-transparent'>
                <TableHead className='w-[45%] px-6 py-5 text-[12px] font-bold uppercase tracking-widest text-[#857F78]'>
                  Bout
                </TableHead>
                <TableHead className='w-[15%] px-6 py-5 text-[12px] font-bold uppercase tracking-widest text-[#857F78]'>
                  Result
                </TableHead>
                <TableHead className='w-[15%] px-6 py-5 text-[12px] font-bold uppercase tracking-widest text-[#857F78]'>
                  Rds
                </TableHead>
                <TableHead className='w-[25%] px-6 py-5 text-[12px] font-bold uppercase tracking-widest text-[#857F78]'>
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-[13px] font-medium text-[#857F78]">
                    Loading recent results...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-[13px] font-medium text-red-500">
                    Failed to load recent results.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !error && results.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-[13px] font-medium text-[#857F78]">
                    No recent results available.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !error && results.map((match: any) => {
                const f1 = match.fighters?.fighter_1;
                const f2 = match.fighters?.fighter_2;
                
                return (
                  <TableRow
                    key={match.id}
                    className='border-b-[#E8E2D8] transition-colors hover:bg-page-bg/40 data-[state=selected]:bg-page-bg/40'
                  >
                    {/* Bout Column */}
                    <TableCell className='px-6 py-4'>
                      <div className='flex items-center'>
                        <span className={`text-[14px] font-medium text-text-primary ${f1?.winner ? 'font-bold' : ''}`}>
                          {formatFighterName(f1?.full_name, f1?.name)}
                        </span>
                        <span className='mx-2.5 text-[11px] font-medium text-[#857F78]'>vs</span>
                        <span className={`text-[14px] font-medium text-text-primary ${f2?.winner ? 'font-bold' : ''}`}>
                          {formatFighterName(f2?.full_name, f2?.name)}
                        </span>
                      </div>
                    </TableCell>

                    {/* Result Badge Column */}
                    <TableCell className='px-6 py-4'>
                      <Badge
                        variant='default'
                        className='inline-flex h-6 min-w-[28px] items-center justify-center rounded-[3px] border-none bg-[#D72322] px-2 font-bold tracking-wide text-surface-white hover:bg-[#D72322]/90'
                      >
                        <span className='text-[10px]'>{match.results?.outcome || 'W'}</span>
                      </Badge>
                    </TableCell>

                    {/* Rounds Column */}
                    <TableCell className='px-6 py-4 text-[13px] font-medium text-text-primary'>
                      {match.results?.round || '12'}
                    </TableCell>

                    {/* Date Column */}
                    <TableCell className='px-6 py-4 text-[13px] font-medium text-[#857F78]'>
                      {formatDate(new Date(match.date))}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
