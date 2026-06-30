'use client';

/**
 * @component LiveNow
 * @description Displays a section for events that are currently happening live.
 */
export default function LiveNow() {
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

      <div className='bg-card-dark border border-text-accent rounded-lg p-6'>
        <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full bg-surface-white'></div>
            <span className='bg-text-accent text-surface-white font-bebas text-xs px-3 py-0.5 rounded-full'>
              LIVE
            </span>
          </div>
          <h4 className='font-bebas text-lg text-surface-white'>HBO Boxing: Super Series</h4>
          <span className='font-bebas text-sm text-text-accent'>ROUND 7 / 12</span>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 mb-6'>
          {/* Fighter 1 */}
          <div className='flex items-center gap-4'>
             <div className='w-12 h-12 rounded-full border border-text-accent bg-[#1a1a1a] flex items-center justify-center'>
               <span className='text-surface-white font-bebas text-lg'>AB</span>
             </div>
             <div className='flex flex-col'>
                <span className='font-bebas text-xl text-surface-white leading-none'>Beterbiev</span>
                <span className='text-[#929aa3] text-xs'>20-0-0 (20 KOs)</span>
             </div>
          </div>

          <span className='font-bebas text-3xl text-text-accent'>VS</span>

          {/* Fighter 2 */}
          <div className='flex items-center flex-row-reverse md:flex-row gap-4'>
             <div className='flex flex-col items-end md:items-start'>
                <span className='font-bebas text-xl text-surface-white leading-none'>Bivol</span>
                <span className='text-[#929aa3] text-xs'>22-0-0 (11 KOs)</span>
             </div>
             <div className='w-12 h-12 rounded-full border border-text-accent bg-[#1a1a1a] flex items-center justify-center'>
               <span className='text-surface-white font-bebas text-lg'>DB</span>
             </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1a1a1a] pt-6 mt-4'>
          <p className='text-[#555555] text-sm font-light tracking-wide'>
            Madison Square Garden, NYC • PPV
          </p>
          <button className='bg-text-accent text-surface-white text-xs font-medium px-8 py-2.5 rounded hover:bg-btn-primary-hover transition-colors'>
            Watch Live →
          </button>
        </div>
      </div>
    </div>
  );
}
