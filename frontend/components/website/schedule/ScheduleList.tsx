'use client';

import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

/**
 * @type FilterTab
 * @description Available filter options for the schedule.
 */
type FilterTab = 'All' | 'PPV' | 'Free TV' | 'DAZN';

/**
 * @interface ScheduleEvent
 * @description Defines the data structure for a single event card.
 */
interface ScheduleEvent {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  broadcastType: string;
  fighterA: { initials: string; name: string; record: string };
  fighterB: { initials: string; name: string; record: string };
  location: string;
  division: string;
  status: string;
}

/**
 * @constant mockEvents
 * @description Seed data mimicking the exact visual layout of the Figma schedule cards.
 */
const mockEvents: ScheduleEvent[] = [
  {
    id: 'evt_1',
    day: '14',
    month: 'JUN',
    year: '2026',
    title: 'Riyadh Season Boxing',
    broadcastType: 'PPV',
    fighterA: { initials: 'B', name: 'BETERBIEV', record: '32-0-0' },
    fighterB: { initials: 'BL', name: 'BIVOL II', record: '23-0-0' },
    location: 'Kingdom Arena, Riyadh, Saudi Arabia',
    division: 'Light Heavyweight',
    status: 'Undisputed Championship',
  },
  {
    id: 'evt_2',
    day: '14',
    month: 'JUN',
    year: '2026',
    title: 'Riyadh Season Boxing',
    broadcastType: 'PPV',
    fighterA: { initials: 'B', name: 'BETERBIEV', record: '32-0-0' },
    fighterB: { initials: 'BL', name: 'BIVOL II', record: '23-0-0' },
    location: 'Kingdom Arena, Riyadh, Saudi Arabia',
    division: 'Light Heavyweight',
    status: 'Undisputed Championship',
  },
  {
    id: 'evt_3',
    day: '14',
    month: 'JUN',
    year: '2026',
    title: 'Riyadh Season Boxing',
    broadcastType: 'PPV',
    fighterA: { initials: 'B', name: 'BETERBIEV', record: '32-0-0' },
    fighterB: { initials: 'BL', name: 'BIVOL II', record: '23-0-0' },
    location: 'Kingdom Arena, Riyadh, Saudi Arabia',
    division: 'Light Heavyweight',
    status: 'WBA, WBC, WBO, IBF',
  },
  {
    id: 'evt_4',
    day: '14',
    month: 'JUN',
    year: '2026',
    title: 'Riyadh Season Boxing',
    broadcastType: 'PPV',
    fighterA: { initials: 'B', name: 'BETERBIEV', record: '32-0-0' },
    fighterB: { initials: 'BL', name: 'BIVOL II', record: '23-0-0' },
    location: 'Kingdom Arena, Riyadh, Saudi Arabia',
    division: 'Light Heavyweight',
    status: 'WBA Title',
  },
];

/**
 * @constant TABS
 * @description The available filter categories for the top navigation bar.
 */
const TABS: FilterTab[] = ['All', 'PPV', 'Free TV', 'DAZN'];

export default function ScheduleList() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  return (
    <div className='flex w-full flex-col font-sans'>
      {/* 1. TOP NAVIGATION / FILTER BAR */}
      <div className='w-full border-b border-divider bg-surface-white'>
        <div className='mx-auto flex items-center gap-6 overflow-x-auto px-4 py-3 sm:px-6 md:px-8 xl:px-12'>
          {/* Month/Year Selector */}
          <div className='flex shrink-0 items-center gap-3'>
            <button className='flex h-7 w-7 items-center justify-center rounded-[4px] border border-divider text-text-placeholder transition-colors hover:text-text-primary'>
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <span className='w-[80px] text-center text-[12px] font-black tracking-widest text-text-primary'>
              MAY 2026
            </span>
            <button className='flex h-7 w-7 items-center justify-center rounded-[4px] border border-divider text-text-placeholder transition-colors hover:text-text-primary'>
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Vertical Divider */}
          <div className='h-6 w-px bg-divider'></div>

          {/* Filter Pills */}
          <div className='hide-scrollbar flex items-center gap-2 overflow-x-auto'>
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] font-bold transition-colors ${
                    isActive
                      ? 'bg-btn-primary text-surface-white'
                      : 'border border-divider bg-transparent text-text-placeholder hover:text-text-primary'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. SCHEDULE CARDS LIST */}
      <section className='w-full bg-page-bg py-8 md:py-12'>
        <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:px-8 xl:px-12'>
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className='flex w-full flex-col rounded-[12px] border border-card-border bg-card-bg p-5 shadow-sm sm:p-6'
            >
              {/* Header: Date, Title, and Badge */}
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex h-[64px] w-[54px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-card-muted'>
                    <span className='text-[18px] font-black leading-none text-text-primary'>
                      {event.day}
                    </span>
                    <span className='mt-1 text-[10px] font-bold leading-none text-text-primary'>
                      {event.month}
                    </span>
                    <span className='mt-0.5 text-[9px] font-medium leading-none text-text-placeholder'>
                      {event.year}
                    </span>
                  </div>
                  <h3 className='text-[16px] font-bold tracking-tight text-text-primary'>
                    {event.title}
                  </h3>
                </div>

                <Badge className='rounded-[4px] border-none bg-card-muted px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-text-secondary hover:bg-card-muted'>
                  {event.broadcastType}
                </Badge>
              </div>

              {/* Middle: Fighter Matchup */}
              <div className='my-8 flex items-center justify-center gap-6 sm:gap-8'>
                {/* Fighter A */}
                <div className='flex flex-col items-center gap-2'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-full bg-card-dark text-[14px] font-bold text-surface-white'>
                    {event.fighterA.initials}
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-[12px] font-black tracking-wide text-text-primary'>
                      {event.fighterA.name}
                    </span>
                    <span className='mt-0.5 text-[10px] font-medium tracking-widest text-text-placeholder'>
                      {event.fighterA.record}
                    </span>
                  </div>
                </div>

                {/* VS Tag */}
                <span className='text-[14px] font-black text-text-accent'>VS</span>

                {/* Fighter B */}
                <div className='flex flex-col items-center gap-2'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-full bg-card-dark text-[14px] font-bold text-surface-white'>
                    {event.fighterB.initials}
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-[12px] font-black tracking-wide text-text-primary'>
                      {event.fighterB.name}
                    </span>
                    <span className='mt-0.5 text-[10px] font-medium tracking-widest text-text-placeholder'>
                      {event.fighterB.record}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer: Details Divider */}
              <div className='mt-2 border-t border-divider pt-4'>
                <span className='text-[11px] font-medium tracking-wide text-text-placeholder'>
                  {event.location} · {event.division} ·{' '}
                  <span className='text-text-accent'>{event.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
