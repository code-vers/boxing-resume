'use client';

import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/features/rankings/api/rankings.api';
import { ApiEvent } from '@/features/rankings/types';
import { useMemo } from 'react';

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
  broadcastType: string;
}

const mapApiEventToUpcomingEvent = (apiEvent: ApiEvent): UpcomingEvent => {
  const date = new Date(apiEvent.date);
  
  let broadcastType = 'N/A';
  if (apiEvent.broadcast && apiEvent.broadcast.length > 0) {
     broadcastType = apiEvent.broadcast[0].broadcasters[0] || 'N/A';
  }

  return {
    id: apiEvent.id,
    date,
    title: apiEvent.title,
    location: apiEvent.venue ? `${apiEvent.venue}, ${apiEvent.location}` : apiEvent.location || 'TBA',
    division: 'Event',
    status: 'Upcoming',
    broadcastType,
  };
};

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
  const { data, isLoading, error } = useQuery({
    queryKey: ['boxingEvents'],
    queryFn: getEvents,
  });

  const events = useMemo(() => {
    const mapped = (data?.data || []).map(mapApiEventToUpcomingEvent);
    const now = new Date();
    // Filter to only upcoming events, sort by date, limit to 4
    return mapped
      .filter((e) => e.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 4);
  }, [data]);

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
          {isLoading && (
            <div className="px-5 py-8 text-center text-sm font-medium text-[#857F78]">
              Loading schedule...
            </div>
          )}
          {error && (
            <div className="px-5 py-8 text-center text-sm font-medium text-red-500">
              Failed to load schedule.
            </div>
          )}
          {!isLoading && !error && events.length === 0 && (
            <div className="px-5 py-8 text-center text-sm font-medium text-[#857F78]">
              No upcoming events.
            </div>
          )}
          {!isLoading && !error && events.map((event) => {
            const { month, day } = formatScheduleDate(event.date);
            const isPPV = event.broadcastType.toUpperCase().includes('PPV');

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
