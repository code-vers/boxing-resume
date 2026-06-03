'use client';

import { IFighter } from '@/types/Fighter.types';
import { BoxingOrg } from '@/types/Title.types';
import { ArrowRight, Trophy } from 'lucide-react';
import Link from 'next/link';

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
 * @type ChampionUI
 * @description Dynamically extracts specific fields from your FighterGet type
 * and attaches an array of BoxingOrg enums. This prevents creating disconnected local types.
 */
type ChampionUI = Pick<IFighter, 'id' | 'firstName' | 'lastName' | 'division'> & {
  belts: BoxingOrg[] | string[];
};

/**
 * @constant mockChampions
 * @description Static seed data strictly typing against your derived ChampionUI type.
 */
const mockChampions: ChampionUI[] = [
  {
    id: 'c1',
    firstName: 'Oleksandr',
    lastName: 'Usyk',
    division: 'Heavyweight',
    belts: ['WBA', 'WBC', 'IBF', 'WBO'],
  },
  {
    id: 'c2',
    firstName: 'Canelo',
    lastName: 'Alvarez',
    division: 'Super Middleweight',
    belts: ['WBA', 'WBC', 'WBO', 'IBF'],
  },
  {
    id: 'c3',
    firstName: 'Terence',
    lastName: 'Crawford',
    division: 'Super Welterweight',
    belts: ['WBO'],
  },
  {
    id: 'c4',
    firstName: 'Gervonta',
    lastName: 'Davis',
    division: 'Lightweight',
    belts: ['WBA'],
  },
  {
    id: 'c5',
    firstName: 'Naoya',
    lastName: 'Inoue',
    division: 'Super Bantamweight',
    belts: ['WBA', 'WBC', 'IBF', 'WBO'],
  },
];

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
              {mockChampions.map((champion) => (
                <TableRow
                  key={champion.id}
                  className='border-b-[#222222] transition-colors hover:bg-[#1A1A1A] data-[state=selected]:bg-[#1A1A1A]'
                >
                  {/* Left Column: Avatar and Info */}
                  <TableCell className='px-6 py-5'>
                    <div className='flex items-center gap-4'>
                      {/* Initials Avatar */}
                      <div className='flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-[#D72322] bg-transparent text-[13px] font-medium tracking-wider text-surface-white'>
                        {getInitials(champion.firstName, champion.lastName)}
                      </div>

                      {/* Name & Division */}
                      <div className='flex flex-col'>
                        <span className='text-[15px] font-bold text-surface-white'>
                          {champion.firstName} {champion.lastName}
                        </span>
                        <span className='mt-0.5 text-[13px] font-medium text-[#857F78]'>
                          {champion.division}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Right Column: Title Belts */}
                  <TableCell className='px-6 py-5 text-right align-middle'>
                    {/* Desktop View */}
                    <span className='hidden text-[13px] font-medium tracking-[0.15em] text-[#D72322] sm:inline-block'>
                      {champion.belts.join(' · ')}
                    </span>
                    {/* Mobile View */}
                    <span className='inline-block text-[11px] font-medium tracking-[0.1em] text-[#D72322] sm:hidden'>
                      {champion.belts.join('·')}
                    </span>
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
