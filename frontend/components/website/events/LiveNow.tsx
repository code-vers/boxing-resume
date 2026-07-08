'use client';

import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/features/rankings/api/rankings.api';
import { useMemo, Suspense } from 'react';

function LiveNowContent() {
  const { data, isLoading } = useQuery({
    queryKey: ['boxingEvents'],
    queryFn: getEvents,
  });

  const liveEvent = useMemo(() => {
    if (!data?.data) return null;
    const now = new Date();
    return data.data.find((e) => {
      const eventDate = new Date(e.date);
      // Check if event is today (roughly checking if same date)
      return eventDate.toDateString() === now.toDateString();
    });
  }, [data]);

  if (isLoading) {
    return <div className="text-center py-10 text-text-primary">Checking for live events...</div>;
  }

  if (!liveEvent) {
    return (
      <div className='w-full'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full bg-text-accent'></div>
            <h3 className='font-bebas text-xl text-text-primary tracking-wider'>LIVE NOW</h3>
          </div>
        </div>
        <div className='bg-card-dark border border-text-accent rounded-lg p-10 text-center'>
          <p className="text-surface-white font-bebas text-2xl tracking-widest">No Live Events Currently</p>
        </div>
      </div>
    );
  }

  let f1Name = 'TBA';
  let f2Name = 'TBA';
  if (liveEvent.title.toLowerCase().includes(' vs. ')) {
    const parts = liveEvent.title.split(/ vs\. /i);
    f1Name = parts[0].trim();
    f2Name = parts[1].split(':')[0].trim(); 
  } else if (liveEvent.title.toLowerCase().includes(' vs ')) {
    const parts = liveEvent.title.split(/ vs /i);
    f1Name = parts[0].trim();
    f2Name = parts[1].split(':')[0].trim();
  } else {
    f1Name = liveEvent.title;
  }

  const f1Initials = f1Name.substring(0, 2).toUpperCase();
  const f2Initials = f2Name.substring(0, 2).toUpperCase();
  const venueStr = liveEvent.venue ? `${liveEvent.venue}, ${liveEvent.location || ''}`.replace(/,\s*$/, '') : liveEvent.location || 'TBA';

  const posterUrl = liveEvent.poster_image_url;
  let isPPV = false;
  let broadcasterStr = '';

  if (liveEvent.broadcast && liveEvent.broadcast.length > 0) {
     const types = liveEvent.broadcast[0].broadcasters.join(' ');
     if (types.toLowerCase().includes('ppv')) isPPV = true;
     broadcasterStr = types;
  }

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='w-1.5 h-1.5 rounded-full bg-text-accent animate-pulse'></div>
          <h3 className='font-bebas text-xl text-text-accent tracking-wider'>LIVE NOW</h3>
        </div>
        <button className='text-text-accent text-[11px] font-medium hover:underline transition-all'>
          View all live →
        </button>
      </div>

      <div className='relative bg-card-dark border border-text-accent rounded-lg p-6 overflow-hidden min-h-[300px] flex flex-col justify-between'>
        {posterUrl && (
          <>
            <div className='absolute inset-0 w-full h-full'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={posterUrl} alt={liveEvent.title} className='w-full h-full object-cover opacity-40' />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card-dark via-card-dark/80 to-transparent" />
          </>
        )}

        <div className='relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6'>
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full bg-surface-white animate-pulse'></div>
            <span className='bg-text-accent text-surface-white font-bebas text-xs px-3 py-0.5 rounded-full'>
              LIVE
            </span>
            {broadcasterStr && (
              <span className='bg-white/10 backdrop-blur text-surface-white font-bebas text-xs px-3 py-0.5 rounded-full'>
                {broadcasterStr}
              </span>
            )}
          </div>
          <h4 className='font-bebas text-xl md:text-2xl text-surface-white text-center'>{liveEvent.title}</h4>
          <span className='font-bebas text-sm text-text-accent'>IN PROGRESS</span>
        </div>

        {!posterUrl && (
          <div className='relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 mb-6 flex-1'>
            {/* Fighter 1 */}
            <div className='flex items-center gap-4'>
               <div className='w-12 h-12 rounded-full border border-text-accent bg-[#1a1a1a] flex items-center justify-center shadow-lg'>
                 <span className='text-surface-white font-bebas text-lg'>{f1Initials}</span>
               </div>
               <div className='flex flex-col'>
                  <span className='font-bebas text-xl text-surface-white leading-none'>{f1Name}</span>
                  <span className='text-[#929aa3] text-xs'>TBA</span>
               </div>
            </div>

            <span className='font-bebas text-3xl text-text-accent'>VS</span>

            {/* Fighter 2 */}
            <div className='flex items-center flex-row-reverse md:flex-row gap-4'>
               <div className='flex flex-col items-end md:items-start'>
                  <span className='font-bebas text-xl text-surface-white leading-none'>{f2Name}</span>
                  <span className='text-[#929aa3] text-xs'>TBA</span>
               </div>
               <div className='w-12 h-12 rounded-full border border-text-accent bg-[#1a1a1a] flex items-center justify-center shadow-lg'>
                 <span className='text-surface-white font-bebas text-lg'>{f2Initials}</span>
               </div>
            </div>
          </div>
        )}

        <div className='relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 mt-auto'>
          <p className='text-[#d4cec4] text-sm font-light tracking-wide'>
            {venueStr} {isPPV && '• PPV'}
          </p>
          <button className='bg-text-accent text-surface-white text-xs font-medium px-8 py-2.5 rounded hover:bg-btn-primary-hover transition-colors shadow-lg'>
            Watch Live →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LiveNow() {
  return (
    <Suspense fallback={<div className="h-48" />}>
      <LiveNowContent />
    </Suspense>
  );
}
