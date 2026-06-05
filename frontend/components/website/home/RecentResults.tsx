'use client';

import { recentResults as mockResults } from '@/constants/seed-data';
import { IMatch, WinMethod } from '@/types/MatchRecords.types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
 * @param {string} firstName - Fighter's first name
 * @param {string} lastName - Fighter's last name
 * @returns {string} Formatted string: "F. Lastname"
 */
const formatFighterName = (firstName: string, lastName: string): string => {
  if (!firstName || !lastName) return '';
  return `${firstName.charAt(0)}. ${lastName}`;
};

/**
 * @function getResultBadgeText
 * @description Maps technical win methods to the UI badge text.
 * Decisions show as "W", stoppages show as their abbreviation (e.g., "TKO").
 * @param {WinMethod} method - The official win method
 * @returns {string} The text to display inside the red badge
 */
const getResultBadgeText = (method: WinMethod): string => {
  const decisions = [WinMethod.UD, WinMethod.SD, WinMethod.MD];
  return decisions.includes(method) ? 'W' : method;
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
  const results: IMatch[] = mockResults;

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
              {results.map((match) => (
                <TableRow
                  key={match.id}
                  className='border-b-[#E8E2D8] transition-colors hover:bg-page-bg/40 data-[state=selected]:bg-page-bg/40'
                >
                  {/* Bout Column */}
                  <TableCell className='px-6 py-4'>
                    <div className='flex items-center'>
                      <span className='text-[14px] font-medium text-text-primary'>
                        {formatFighterName(match.winner.firstName, match.winner.lastName)}
                      </span>
                      <span className='mx-2.5 text-[11px] font-medium text-[#857F78]'>vs</span>
                      <span className='text-[14px] font-medium text-text-primary'>
                        {formatFighterName(match.loser.firstName, match.loser.lastName)}
                      </span>
                    </div>
                  </TableCell>

                  {/* Result Badge Column */}
                  <TableCell className='px-6 py-4'>
                    <Badge
                      variant='default'
                      className='inline-flex h-6 min-w-[28px] items-center justify-center rounded-[3px] border-none bg-[#D72322] px-2 font-bold tracking-wide text-surface-white hover:bg-[#D72322]/90'
                    >
                      <span className='text-[10px]'>{getResultBadgeText(match.method)}</span>
                    </Badge>
                  </TableCell>

                  {/* Rounds Column */}
                  <TableCell className='px-6 py-4 text-[13px] font-medium text-text-primary'>
                    {match.round}
                  </TableCell>

                  {/* Date Column */}
                  <TableCell className='px-6 py-4 text-[13px] font-medium text-[#857F78]'>
                    {formatDate(match.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
