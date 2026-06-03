'use client';

import { featuredFighters as mockFighters } from '@/constants/seed-data';
import { IFighter } from '@/types/Fighter.types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
 * @function getFlagEmoji
 * @description Utility to map full country names or 3-letter codes to Emoji flags.
 * @param {string} countryCode - Country string
 * @returns {string} Emoji flag
 */
const getFlagEmoji = (countryCode?: string): string => {
  const flagMap: Record<string, string> = {
    USA: '🇺🇸',
    'United States': '🇺🇸',
    GBR: '🇬🇧',
    'United Kingdom': '🇬🇧',
    UKR: '🇺🇦',
    Ukraine: '🇺🇦',
    KAZ: '🇰🇿',
    Kazakhstan: '🇰🇿',
    MEX: '🇲🇽',
    Mexico: '🇲🇽',
    JPN: '🇯🇵',
    Japan: '🇯🇵',
  };
  return countryCode && flagMap[countryCode] ? flagMap[countryCode] : '🏳️';
};

/**
 * @component FeaturedFighters
 * @description Renders a responsive section displaying a grid of featured fighter cards.
 * Uses directly imported mock data, strictly typed to the IFighter interface.
 * @returns {JSX.Element}
 */
export default function FeaturedFighters() {
  const fighters: IFighter[] = mockFighters;

  return (
    <section className='w-full py-12 md:py-16'>
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12'>
        {/* * @section Section Header
         * @description Flex container aligning the section title and the "View all" link.
         */}
        <div className='mb-6 flex items-end justify-between'>
          <h2 className='text-xl font-black uppercase tracking-tight text-text-primary md:text-2xl'>
            Featured Fighters
          </h2>
          <Link
            href='/fighters'
            className='group flex items-center gap-1 text-sm font-medium text-text-accent transition-colors hover:text-btn-primary-hover'
          >
            View all fighters
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* * @section Responsive Card Grid
         * @description True responsive grid: 1 col on mobile, 2 on tablet, 4 on desktop.
         * No horizontal scrolling.
         */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
          {fighters.map((fighter) => (
            <div
              key={fighter.id}
              className='group flex flex-col overflow-hidden rounded-[8px] border border-[#E8E2D8] bg-surface-white shadow-none transition-colors duration-200 hover:border-text-accent'
            >
              {/* * @block Card Upper (Dark Theme)
               * @description Fixed to match Figma layout, using standardized readable typography.
               */}
              <div className='relative flex h-28 items-center justify-center bg-card-dark'>
                {/* Nationality Badge */}
                <div className='absolute right-3 top-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-surface-white/70'>
                  <span className='text-xs'>{getFlagEmoji(fighter.nationality)}</span>
                  <span>{fighter.nationality || 'N/A'}</span>
                </div>

                {/* Initials Circle */}
                <div className='flex h-12 w-12 items-center justify-center rounded-full border border-text-accent bg-transparent text-lg font-bold tracking-widest text-surface-white'>
                  {getInitials(fighter.firstName, fighter.lastName)}
                </div>
              </div>

              {/* * @block Card Lower (Light Theme)
               * @description Proportional spacing with standard web typography sizes (WCAG compliant).
               */}
              <div className='flex flex-1 flex-col p-5'>
                <div className='mb-4 flex flex-col'>
                  {/* Fighter Name */}
                  <h3 className='truncate text-[15px] font-black uppercase leading-tight tracking-tight text-text-primary'>
                    {fighter.firstName} {fighter.lastName}
                  </h3>

                  {/* Nickname Placeholder */}
                  <span className='mt-0.5 h-4 truncate text-xs italic text-[#857F78]'>
                    {fighter.nickname ? `"${fighter.nickname}"` : ''}
                  </span>
                </div>

                {/* * @block Record Statistics
                 * @description Hardcoded exact Figma pastel hexes.
                 */}
                <div className='mb-5 grid grid-cols-3 gap-2'>
                  <div className='flex h-8 items-center justify-center rounded-[3px] bg-[#E6F5EA] py-1'>
                    <span className='text-xs font-bold text-[#16A34A]'>{fighter.record.wins}W</span>
                  </div>
                  <div className='flex h-8 items-center justify-center rounded-[3px] bg-[#FCE8E8] py-1'>
                    <span className='text-xs font-bold text-[#D72322]'>
                      {fighter.record.losses}L
                    </span>
                  </div>
                  <div className='flex h-8 items-center justify-center rounded-[3px] bg-[#FFF9D6] py-1'>
                    <span className='text-xs font-bold text-[#CA8A04]'>
                      {fighter.record.draws}D
                    </span>
                  </div>
                </div>

                {/* * @block Division Indicator
                 * @description Standard text-xs readability.
                 */}
                <div className='mt-auto flex items-center gap-2'>
                  <span
                    className='h-1.5 w-1.5 rounded-full bg-text-accent'
                    aria-hidden='true'
                  ></span>
                  <span className='text-xs font-medium text-[#3D3B38]'>{fighter.division}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
