'use client';

import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';

/**
 * @interface Champion
 * @description Data structure representing an individual champion card.
 */
interface Champion {
  id: string;
  org: string;
  status: string;
  initials: string;
  name: string;
  record: string;
  since: string;
}

/**
 * @interface WeightClass
 * @description Data structure grouping champions by their weight division.
 */
interface WeightClass {
  id: string;
  name: string;
  weightLimit: string;
  champions: Champion[];
}

/**
 * @constant TABS
 * @description Available filter options for sanctioning bodies.
 */
const TABS = ['All', 'WBC', 'WBA', 'IBF', 'IBO', 'Ring Magazine', 'WBO'];

/**
 * @constant mockData
 * @description Seed data mimicking the exact visual layout of the Figma champions grid.
 */
const mockData: WeightClass[] = [
  {
    id: 'heavyweight',
    name: 'HEAVYWEIGHT',
    weightLimit: '200+ lbs',
    champions: [
      {
        id: 'tf_wbc',
        org: 'WBC',
        status: 'Regular',
        initials: 'TF',
        name: 'TYSON FURY',
        record: '34-1-1',
        since: 'Since 2020',
      },
      {
        id: 'ou_wba',
        org: 'WBA',
        status: 'Super',
        initials: 'OU',
        name: 'OLEKSANDR USYK',
        record: '22-0-0',
        since: 'Since 2021',
      },
      {
        id: 'ou_ibf',
        org: 'IBF',
        status: 'Regular',
        initials: 'OU',
        name: 'OLEKSANDR USYK',
        record: '22-0-0',
        since: 'Since 2021',
      },
      {
        id: 'ou_wbo',
        org: 'WBO',
        status: 'Regular',
        initials: 'OU',
        name: 'OLEKSANDR USYK',
        record: '22-0-0',
        since: 'Since 2021',
      },
    ],
  },
  {
    id: 'super_middleweight',
    name: 'SUPER MIDDLEWEIGHT',
    weightLimit: '168 lbs',
    champions: [
      {
        id: 'ca_wbc',
        org: 'WBC',
        status: 'Regular',
        initials: 'CA',
        name: 'CANELO ALVAREZ',
        record: '61-2-2',
        since: 'Since 2020',
      },
      {
        id: 'ca_wba',
        org: 'WBA',
        status: 'Super',
        initials: 'CA',
        name: 'CANELO ALVAREZ',
        record: '61-2-2',
        since: 'Since 2020',
      },
      {
        id: 'ca_ibf',
        org: 'IBF',
        status: 'Regular',
        initials: 'CA',
        name: 'CANELO ALVAREZ',
        record: '61-2-2',
        since: 'Since 2021',
      },
      {
        id: 'ca_wbo',
        org: 'WBO',
        status: 'Regular',
        initials: 'CA',
        name: 'CANELO ALVAREZ',
        record: '61-2-2',
        since: 'Since 2020',
      },
    ],
  },
];

/**
 * @component ChampionCard
 * @description Renders an individual champion's profile card with absolute positioned badges and a centralized avatar.
 * @param {Champion} props - The champion data object
 * @returns {JSX.Element}
 */
const ChampionCard = ({ org, status, initials, name, record, since }: Champion) => (
  <div className='relative flex flex-col items-center rounded-[8px] border border-card-border bg-surface-white p-6 shadow-sm transition-shadow hover:shadow-md'>
    {/* Top Left: Organization Badge */}
    <span className='absolute left-4 top-4 text-[10px] font-black uppercase text-text-accent'>
      {org}
    </span>

    {/* Top Right: Status Badge */}
    <span className='absolute right-4 top-4 text-[10px] font-medium text-text-placeholder'>
      {status}
    </span>

    {/* Center Avatar */}
    <div className='mt-2 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-text-accent bg-card-dark text-[18px] font-bold text-surface-white'>
      {initials}
    </div>

    {/* Details */}
    <h3 className='mt-4 text-[14px] font-black uppercase tracking-tight text-text-primary'>
      {name}
    </h3>
    <span className='mt-1 text-[11px] font-medium text-text-placeholder'>{record}</span>
    <span className='mt-0.5 text-[11px] font-medium text-text-placeholder'>{since}</span>

    {/* Action Link */}
    <button className='mt-5 flex items-center gap-1 text-[11px] font-bold text-text-accent transition-colors hover:text-red-700'>
      View profile <ArrowRight size={12} strokeWidth={2.5} />
    </button>
  </div>
);

/**
 * @component ChampionsGrid
 * @description Main container for the World Champions directory. Handles client-side filtering via tabs and renders weight class grids.
 * @returns {JSX.Element}
 */
export default function ChampionsGrid() {
  const [activeTab, setActiveTab] = useState('All');

  /**
   * @constant filteredData
   * @description Memoized dataset filtering champions by the active sanctioning body tab.
   */
  const filteredData = useMemo(() => {
    if (activeTab === 'All') return mockData;

    return mockData
      .map((weightClass) => ({
        ...weightClass,
        champions: weightClass.champions.filter((champ) => champ.org === activeTab),
      }))
      .filter((weightClass) => weightClass.champions.length > 0);
  }, [activeTab]);

  return (
    <div className='flex w-full flex-col font-sans bg-page-bg'>
      {/* --- 1. TABS NAVIGATION --- */}
      <div className='w-full border-b border-divider bg-surface-white'>
        <div className='hide-scrollbar mx-auto flex items-center gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8'>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap px-4 py-4 text-[12px] font-bold transition-colors ${
                  isActive ? 'text-text-primary' : 'text-text-placeholder hover:text-text-primary'
                }`}
              >
                {tab}
                {isActive && (
                  <div className='absolute bottom-0 left-0 h-[2px] w-full bg-text-accent' />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- 2. CHAMPIONS DIRECTORY --- */}
      <section className='w-full py-10 md:py-14'>
        <div className='mx-auto flex flex-col gap-12 px-4 sm:px-6 lg:px-8'>
          {filteredData.map((division) => (
            <div key={division.id} className='flex flex-col w-full'>
              {/* Section Header */}
              <div className='mb-6 flex items-baseline justify-between border-b border-divider pb-2'>
                <h2 className='text-[18px] font-black uppercase tracking-tight text-text-primary md:text-[22px]'>
                  {division.name}
                </h2>
                <span className='text-[12px] font-medium text-text-placeholder'>
                  {division.weightLimit}
                </span>
              </div>

              {/* Responsive Cards Grid */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {division.champions.map((champion) => (
                  <ChampionCard key={champion.id} {...champion} />
                ))}
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className='flex h-32 w-full items-center justify-center text-[13px] text-text-placeholder'>
              No champions found for the selected organization.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
