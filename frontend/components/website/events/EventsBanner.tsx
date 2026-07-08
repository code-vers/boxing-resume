'use client';

import { Calendar, MapPin, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/features/rankings/api/rankings.api';
import { useMemo, Suspense } from 'react';
import { toast } from 'sonner';

/**
 * @component EventsBanner
 * @description The hero section for the events page, featuring a major upcoming match,
 * event details, and promotional headings. Fully responsive and matches Figma specs.
 */
function EventsBannerContent() {
  const { data, isLoading } = useQuery({
    queryKey: ['boxingEvents'],
    queryFn: getEvents,
  });

  const nextEvent = useMemo(() => {
    return data?.data?.[0];
  }, [data]);

  if (isLoading || !nextEvent) {
    return (
      <section className='relative bg-card-dark pt-16 md:pt-24 border-t-2 border-muted-foreground overflow-hidden min-h-[500px] flex flex-col'>
         <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12 pb-12 text-surface-white'>
            {isLoading ? 'Loading featured event...' : 'No upcoming events'}
         </div>
      </section>
    );
  }

  const dateObj = new Date(nextEvent.date);
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  let f1Name = 'TBA';
  let f2Name = 'TBA';
  if (nextEvent.title.toLowerCase().includes(' vs. ')) {
    const parts = nextEvent.title.split(/ vs\. /i);
    f1Name = parts[0].trim();
    f2Name = parts[1].split(':')[0].trim(); 
  } else if (nextEvent.title.toLowerCase().includes(' vs ')) {
    const parts = nextEvent.title.split(/ vs /i);
    f1Name = parts[0].trim();
    f2Name = parts[1].split(':')[0].trim();
  } else {
    f1Name = nextEvent.title;
  }

  const f1Initials = f1Name.substring(0, 2).toUpperCase();
  const f2Initials = f2Name.substring(0, 2).toUpperCase();

  let isPPV = false;
  if (nextEvent.broadcast && nextEvent.broadcast.length > 0) {
     const types = nextEvent.broadcast[0].broadcasters.join(' ').toLowerCase();
     if (types.includes('ppv')) isPPV = true;
  }

  return (
    <section className='relative bg-card-dark pt-16 md:pt-24 border-t-2 border-muted-foreground overflow-hidden'>
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12 pb-12'>
        {/* Kicker & Heading Area */}
        <div className='max-w-4xl'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='h-[1px] w-8 bg-text-accent'></div>
            <span className='text-text-accent text-[11px] font-medium uppercase tracking-[0.15em]'>
              FIGHT EVENTS
            </span>
          </div>

          <h1 className='mb-2 text-5xl font-bebas uppercase leading-tight text-surface-white sm:text-6xl md:text-7xl'>
            BOXING EVENTS
          </h1>
          <h2 className='mb-6 text-4xl font-bebas uppercase leading-tight text-text-accent sm:text-5xl md:text-6xl'>
            BOXING RECORD.
          </h2>

          <p className='text-[#d4cec4] max-w-lg text-sm font-light leading-relaxed tracking-[0.04em]'>
            Upcoming fight cards, live events, and full historical event archive.
          </p>
        </div>

        {/* Featured Event Section */}
        <div className='mt-16 relative'>
          <div className='flex items-center gap-3 mb-8'>
            <div className='h-[1px] w-6 bg-text-accent'></div>
            <span className='text-text-accent font-bebas text-lg tracking-[0.05em] uppercase'>
              NEXT MAJOR EVENT
            </span>
          </div>

          <div className='flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-0'>
            {/* Fighter 1 */}
            <div className='flex flex-col md:flex-row items-center gap-6 text-center md:text-left'>
              <div className='relative w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-text-accent p-1 overflow-hidden bg-[#1a1a1a] flex items-center justify-center shrink-0'>
                <span className='text-surface-white font-bebas text-4xl'>{f1Initials}</span>
                {nextEvent.poster_image_url && (
                  <Image 
                    src={nextEvent.poster_image_url} 
                    alt={f1Name}
                    fill
                    className="object-cover opacity-60"
                  />
                )}
              </div>
              <div className='flex flex-col'>
                <h3 className='text-3xl sm:text-4xl font-bebas text-surface-white leading-none'>{f1Name}</h3>
                <span className='text-[#857f78] text-sm mt-1'>TBA</span>
                <span className='text-[#555555] text-[10px] uppercase mt-1 tracking-widest'>Pro Boxing</span>
              </div>
            </div>

            {/* VS & Details Area */}
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4'>
                <span className='text-5xl md:text-6xl font-bebas text-text-accent'>VS</span>
                <p className='text-[#929aa3] text-xs uppercase tracking-[0.06em] mt-2 font-medium'>
                  Pro Boxing
                </p>
              </div>

              <div className='space-y-3 mb-8'>
                <div className='flex items-center justify-center gap-3 text-surface-white'>
                  <Calendar className='w-4 h-4 text-text-accent' />
                  <span className='text-xs font-medium'>{dateStr}</span>
                </div>
                <div className='flex items-center justify-center gap-3 text-[#929aa3]'>
                  <MapPin className='w-5 h-5' />
                  <span className='text-sm'>{nextEvent.venue ? `${nextEvent.venue}, ${nextEvent.location || ''}`.replace(/,\s*$/, '') : nextEvent.location || 'TBA'}</span>
                </div>
              </div>

              {isPPV && (
                <div className='mb-8'>
                   <span className='bg-text-accent text-surface-white text-[10px] font-medium px-4 py-1 rounded-full uppercase'>PPV</span>
                </div>
              )}

              <div className='flex flex-col sm:flex-row gap-4'>
                <button 
                  onClick={() => window.location.href = `/events/${nextEvent.id}`}
                  className='bg-btn-primary hover:bg-btn-primary-hover text-surface-white font-bebas px-10 py-3 rounded-md text-sm tracking-wider transition-colors'
                >
                  View Event
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/events/${nextEvent.id}`);
                    toast.success('Event link copied to clipboard!');
                  }}
                  className='border border-[#2a2a2a] text-[#857f78] hover:text-surface-white font-bebas px-10 py-3 rounded-md text-sm tracking-wider transition-colors flex items-center justify-center gap-2'
                >
                  <Share2 className='w-4 h-4' />
                  Share Event
                </button>
              </div>
            </div>

            {/* Fighter 2 */}
            <div className='flex flex-col md:flex-row-reverse items-center gap-6 text-center md:text-right'>
              <div className='relative w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-text-accent p-1 overflow-hidden bg-[#1a1a1a] flex items-center justify-center shrink-0'>
                <span className='text-surface-white font-bebas text-4xl'>{f2Initials}</span>
                {nextEvent.poster_image_url && (
                  <Image 
                    src={nextEvent.poster_image_url} 
                    alt={f2Name}
                    fill
                    className="object-cover opacity-60"
                  />
                )}
              </div>
              <div className='flex flex-col'>
                <h3 className='text-3xl sm:text-4xl font-bebas text-surface-white leading-none'>{f2Name}</h3>
                <span className='text-[#857f78] text-sm mt-1'>TBA</span>
                <span className='text-[#555555] text-[10px] uppercase mt-1 tracking-widest'>Pro Boxing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EventsBanner() {
  return (
    <Suspense fallback={<div className="h-64 bg-card-dark" />}>
      <EventsBannerContent />
    </Suspense>
  );
}
