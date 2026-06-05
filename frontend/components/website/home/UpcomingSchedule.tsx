'use client';

import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * @interface UpcomingEvent
 * @description Strongly typed interface for the schedule data.
 */
interface UpcomingEvent {
  id: string;
  date: Date;
  title: string;
  location: string;
  division: string;
  status: string;
  broadcastType: 'PPV' | 'Live';
}

/**
 * @constant mockSchedule
 * @description Pixel-perfect seed data mimicking the exact state of the Figma screenshot.
 */
const mockSchedule: UpcomingEvent[] = [
  {
    id: 'evt_1',
    date: new Date('2024-06-14T00:00:00'),
    title: 'Beterbiev vs Bivol II',
    location: 'Riyadh, Saudi Arabia',
    division: 'Light Heavyweight',
    status: 'Undisputed',
    broadcastType: 'PPV',
  },
  {
    id: 'evt_2',
    date: new Date('2024-07-03T00:00:00'),
    title: 'Canelo vs Benavidez',
    location: 'Las Vegas, Nevada',
    division: 'Super Middleweight',
    status: 'WBA, WBC, WBO, IBF',
    broadcastType: 'PPV',
  },
  {
    id: 'evt_3',
    date: new Date('2024-07-20T00:00:00'),
    title: 'Tank vs Shakur',
    location: 'Atlanta, Georgia',
    division: 'Lightweight',
    status: 'WBA',
    broadcastType: 'Live',
  },
  {
    id: 'evt_4',
    date: new Date('2024-08-10T00:00:00'),
    title: 'Inoue vs Tapales',
    location: 'Tokyo, Japan',
    division: 'Super Bantamweight',
    status: 'Undisputed',
    broadcastType: 'Live',
  },
];

/**
 * @function formatScheduleDate
 * @description Extracts the abbreviated month and padded day from a Date object.
 * @param {Date} date
 * @returns {{ month: string, day: string }}
 */
const formatScheduleDate = (date: Date) => {
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date).toUpperCase();
  const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
  return { month, day };
};

/**
 * @component UpcomingSchedule
 * @description Renders a precise, responsive list of upcoming fights using Shadcn UI.
 * @returns {JSX.Element}
 */
export default function UpcomingSchedule() {
  return (
    <section className='w-full bg-page-bg py-12 md:py-16'>
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12'>
        {/* * @section Section Header */}
        <div className='mb-6 flex items-end justify-between'>
          <h2 className='text-xl font-black uppercase tracking-tight text-text-primary md:text-2xl'>
            Upcoming Schedule
          </h2>
          <Link
            href='/schedule'
            className='group flex items-center gap-1 text-sm font-medium text-[#D72322] transition-colors hover:text-[#B91C1C]'
          >
            Full schedule
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>

        {/* * @section List Container
         * @description White background wrapper with Figma-specified borders and rounded corners.
         */}
        <div className='flex w-full flex-col overflow-hidden rounded-[12px] border border-[#E8E2D8] bg-surface-white shadow-sm'>
          {mockSchedule.map((event) => {
            const { month, day } = formatScheduleDate(event.date);
            const isPPV = event.broadcastType === 'PPV';

            return (
              <div
                key={event.id}
                className='flex items-center justify-between border-b border-[#E8E2D8] px-5 py-4 transition-colors hover:bg-page-bg/40 last:border-none'
              >
                {/* Left Side: Date & Details */}
                <div className='flex items-center gap-4 overflow-hidden'>
                  {/* Date Block */}
                  <div className='flex h-[46px] w-[46px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#F0EAE1]'>
                    <span className='text-[10px] font-bold leading-none tracking-widest text-[#857F78]'>
                      {month}
                    </span>
                    <span className='mt-0.5 text-[16px] font-black leading-none text-text-primary'>
                      {day}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className='flex min-w-0 flex-col justify-center'>
                    <span className='truncate text-[14px] font-bold text-text-primary'>
                      {event.title}
                    </span>
                    <span className='truncate text-[12px] font-medium text-[#857F78]'>
                      {event.location} · {event.division} · {event.status}
                    </span>
                  </div>
                </div>

                {/* Right Side: Broadcast Badge */}
                <div className='ml-4 shrink-0'>
                  <Badge
                    variant='secondary'
                    className={`inline-flex h-6 items-center justify-center rounded-[4px] border-none px-2.5 text-[10px] font-bold tracking-wide hover:opacity-90 ${
                      isPPV
                        ? 'bg-[#F0EAE1] text-[#3D3B38] hover:bg-[#F0EAE1]'
                        : 'bg-[#FCE8E8] text-[#D72322] hover:bg-[#FCE8E8]'
                    }`}
                  >
                    {event.broadcastType}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
