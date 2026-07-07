'use client';

import { Share2, Plus } from 'lucide-react';
import Image from 'next/image';

interface FightCardProps {
  eventName: string;
  date: string;
  venue: string;
  isPPV?: boolean;
  isTitle?: boolean;
  fighter1: {
    name: string;
    record: string;
    initials: string;
    image?: string;
    country: string;
  };
  fighter2: {
    name: string;
    record: string;
    initials: string;
    image?: string;
    country: string;
  };
  weightClass: string;
}

/**
 * @component FightCard
 * @description A detailed card component for upcoming boxing events, 
 * including fighter stats, event location, and action buttons.
 */
export default function FightCard({
  eventName,
  date,
  venue,
  isPPV = false,
  isTitle = false,
  fighter1,
  fighter2,
  weightClass,
}: FightCardProps) {
  return (
    <div className='bg-surface-white border border-[#e8e2d8] rounded-lg overflow-hidden flex flex-col'>
      {/* Card Header */}
      <div className='bg-card-dark p-6 flex items-start justify-between gap-4'>
        <div className='flex flex-col'>
          <h4 className='font-bebas text-2xl text-surface-white uppercase leading-tight'>
            {eventName}
          </h4>
          <span className='text-text-placeholder text-sm mt-1'>{date}</span>
          <span className='text-text-placeholder text-xs mt-1'>{venue}</span>
        </div>
        {isPPV && (
          <span className='bg-text-accent text-surface-white text-[10px] font-medium px-3 py-1 rounded-full uppercase'>
            PPV
          </span>
        )}
      </div>

      {/* Card Body - Fighter Comparison */}
      <div className='p-6 flex-1 flex flex-col items-center justify-center relative min-h-[200px]'>
        <div className='flex items-end justify-center gap-8 sm:gap-16 w-full'>
          {/* Fighter 1 */}
          <div className='flex flex-col items-center text-center'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-text-accent bg-card-dark flex items-center justify-center p-0.5 mb-2 overflow-hidden'>
               <span className='text-surface-white font-bebas text-lg'>{fighter1.initials}</span>
               {fighter1.image && <Image src={fighter1.image} alt={fighter1.name} fill className='object-cover' />}
            </div>
            <span className='text-[10px] text-[#555555] uppercase mb-1'>{fighter1.country}</span>
            <h5 className='font-bebas text-lg text-text-primary'>{fighter1.name}</h5>
            <span className='text-text-placeholder text-[10px]'>{fighter1.record}</span>
          </div>

          {/* VS Divider */}
          <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none'>
            <span className='text-7xl sm:text-8xl font-bebas font-bold bg-clip-text text-transparent bg-gradient-to-b from-text-accent to-[#efeaea]'>
              VS
            </span>
          </div>

          {/* Fighter 2 */}
          <div className='flex flex-col items-center text-center'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-text-accent bg-card-dark flex items-center justify-center p-0.5 mb-2 overflow-hidden'>
               <span className='text-surface-white font-bebas text-lg'>{fighter2.initials}</span>
               {fighter2.image && <Image src={fighter2.image} alt={fighter2.name} fill className='object-cover' />}
            </div>
            <span className='text-[10px] text-[#555555] uppercase mb-1'>{fighter2.country}</span>
            <h5 className='font-bebas text-lg text-text-primary'>{fighter2.name}</h5>
            <span className='text-text-placeholder text-[10px]'>{fighter2.record}</span>
          </div>
        </div>
      </div>

      {/* Weight Class & Title Badge */}
      <div className='border-t border-[#f0ebe1] px-4 py-2 flex items-center justify-between'>
        <span className='text-text-placeholder text-[11px] font-medium'>{weightClass}</span>
        {isTitle && (
          <span className='bg-warning-bg text-warning-text text-[9px] font-medium px-2 py-0.5 rounded-full uppercase'>
            TITLE
          </span>
        )}
      </div>

      {/* Card Footer - Actions */}
      <div className='border-t border-[#f0ebe1] px-4 py-3 flex items-center justify-between'>
        <button className='text-text-accent text-xs font-medium hover:underline transition-all'>
          View Event
        </button>
        <div className='flex items-center gap-2'>
          <button className='p-1.5 border border-[#e8e2d8] rounded hover:bg-page-bg transition-colors'>
            <Share2 className='w-3.5 h-3.5 text-text-placeholder' />
          </button>
          <button className='p-1.5 border border-[#e8e2d8] rounded hover:bg-page-bg transition-colors'>
            <Plus className='w-3.5 h-3.5 text-text-placeholder' />
          </button>
        </div>
      </div>
    </div>
  );
}
