'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { usePlatformStats } from '@/features/fighters/hooks/useFighters';

/**
 * @constant DUMMY_WEIGHT_CLASSES
 * @description Mock data representing available weight classes for the filter system.
 * Replace with an API fetch when the backend is ready.
 * @type {Array<string>}
 */
const DUMMY_WEIGHT_CLASSES = [
  'All',
  'Heavyweight',
  'Light Heavyweight',
  'Middleweight',
  'Welterweight',
  'Lightweight',
  'Featherweight',
  'Super Featherweight',
  'Bantamweight',
  'Flyweight',
];

const STAT_LABELS = ['Fighters', 'Bouts', 'Active', 'Countries', 'Titles Tracked'];

/**
 * @component HeroBanner
 * @description The primary landing page banner featuring a search interface, weight class filters,
 * and platform statistics. Fully responsive and exact to Figma specifications.
 * @returns {JSX.Element} The rendered hero banner component.
 */
export default function HeroBanner() {
  const { data: dynamicStats, isLoading } = usePlatformStats();
  
  const statsToRender = dynamicStats || STAT_LABELS.map(label => ({ value: '...', label }));
  
  /**
   * @state activeFilter
   * @description Tracks the currently selected weight class pill.
   */
  const [activeFilter, setActiveFilter] = useState('All');

  /**
   * @state searchQuery
   * @description Tracks the input value of the main search bar.
   */
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * @function handleSearch
   * @description Prevents default form submission and handles the search action.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate search API routing here
    console.log('Searching for:', searchQuery, 'in category:', activeFilter);
  };

  /**
   * @section Main Container
   * @description Sets the dark background and ensures content does not overflow on smaller screens.
   */
  return (
    <section className='flex min-h-[800px] border-t-2 border-muted-foreground w-full flex-col justify-between bg-card-dark pt-16 md:pt-24'>
      {/*
       * @section Top Content Area
       * @description Contains the headline, description, search input, and filter chips.
       */}
      <div className='mx-auto w-full flex-1 px-4 sm:px-6 md:px-8 xl:px-12'>
        {/*
         * @block Kicker & Headline
         * @description Uses precise letter spacing and font weighting to match the impactful typography.
         */}
        <div className='flex max-w-3xl flex-col'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='h-[2px] w-8 bg-text-accent'></div>
            <span className='text-text-accent text-xs font-bold uppercase tracking-[0.2em]'>
              World Boxing Database
            </span>
          </div>

          <h1 className='mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight text-surface-white sm:text-6xl md:text-7xl'>
            The Complete <br />
            <span className='text-text-accent'>Boxing Record.</span>
          </h1>

          <p className='text-text-placeholder max-w-2xl text-base font-medium leading-relaxed sm:text-lg'>
            Search fighters, explore full bout histories, compare head-to-head stats, and follow
            live rankings across every weight class.
          </p>
        </div>

        {/*
         * @block Search Form
         * @description Form container capturing the input and submit action perfectly sized to the design.
         */}
        <form
          onSubmit={handleSearch}
          className='mt-10 flex max-w-3xl flex-col items-center gap-4 sm:flex-row'
        >
          <div className='relative w-full flex-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
              <Search className='text-text-placeholder h-5 w-5' aria-hidden='true' />
            </div>
            <input
              type='text'
              className='focus:border-text-accent focus:ring-text-accent block w-full rounded-md border border-[#2A2A2A] bg-[#141414] py-3.5 pl-11 pr-4 text-surface-white transition-colors placeholder:text-text-placeholder focus:outline-none focus:ring-1'
              placeholder='Search fighter, event, or bout...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='bg-btn-primary hover:bg-btn-primary-hover focus:ring-text-accent focus:ring-offset-card-dark w-full rounded-md px-8 py-3.5 text-sm font-semibold text-surface-white transition-colors sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2'
          >
            Search
          </button>
        </form>

        {/*
         * @block Filter Chips
         * @description A scrollable flex row on mobile, wrapping nicely on larger desktop screens.
         */}
        <div className='hide-scrollbar mb-16 mt-8 flex items-center gap-2 overflow-x-auto pb-4 sm:flex-wrap sm:pb-0'>
          {DUMMY_WEIGHT_CLASSES.map((weight) => {
            const isActive = activeFilter === weight;
            return (
              <button
                key={weight}
                onClick={() => setActiveFilter(weight)}
                className={`whitespace-nowrap rounded-full border px-5 py-1.5 text-xs font-medium transition-all duration-200 sm:text-sm ${
                  isActive
                    ? 'border-btn-primary bg-btn-primary text-surface-white'
                    : 'text-text-placeholder hover:border-text-placeholder hover:text-surface-white border-[#2A2A2A] bg-transparent'
                }`}
              >
                {weight}
              </button>
            );
          })}
        </div>
      </div>

      {/*
       * @section Stats Footer Bar
       * @description Full-width bottom bar. Uses Tailwind's grid and divide utilities to automatically
       * generate the vertical separator lines shown in the design.
       */}
      <div className='w-full border-t border-[#2A2A2A] bg-card-dark/50'>
        <div className='mx-auto w-full px-4 py-8 sm:px-6 sm:py-10 md:px-8 xl:px-12'>
          <div className='grid grid-cols-2 divide-[#2A2A2A] gap-y-8 md:grid-cols-5 md:divide-x'>
            {statsToRender.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center text-center ${
                  index % 2 !== 0 ? 'border-l border-[#2A2A2A] md:border-l-0' : ''
                }`}
              >
                <span className='mb-1 text-2xl font-bold tracking-tight text-surface-white sm:text-3xl'>
                  {isLoading ? '...' : stat.value}
                </span>
                <span className='text-text-placeholder text-[10px] font-semibold uppercase tracking-widest sm:text-xs'>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
