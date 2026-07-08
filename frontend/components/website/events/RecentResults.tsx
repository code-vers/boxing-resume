'use client';

import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/features/rankings/api/rankings.api';
import { useMemo, Suspense } from 'react';

function RecentResultsContent() {
  const { data, isLoading } = useQuery({
    queryKey: ['boxingEvents'],
    queryFn: getEvents,
  });

  const recentEvents = useMemo(() => {
    if (!data?.data) return [];
    const now = new Date();
    // Filter for events that have already passed
    return data.data.filter((e) => new Date(e.date) < now);
  }, [data]);

  if (isLoading) {
    return <div className="text-center py-10 text-text-primary">Loading recent results...</div>;
  }

  if (recentEvents.length === 0) {
    return (
      <div className='w-full'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='font-bebas text-xl text-text-primary tracking-wider uppercase'>
            RECENT RESULTS
          </h3>
        </div>
        <div className='bg-surface-white rounded-lg border border-[#e8e2d8] p-10 text-center text-text-placeholder'>
          No recent results available.
        </div>
      </div>
    );
  }
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='font-bebas text-xl text-text-primary tracking-wider uppercase'>
          RECENT RESULTS
        </h3>
      </div>

      <div className='bg-surface-white rounded-lg border border-[#e8e2d8] overflow-hidden'>
        <div className='overflow-x-auto no-scrollbar'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-[#e8e2d8]'>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase'>
                  Event Name
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Main Event
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Result
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Broadcast
                </th>
                <th className='px-6 py-4 text-[12px] font-bold text-[#656464] tracking-wider uppercase text-center'>
                  Venue
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#f1ede1]'>
              {recentEvents.map((event, index) => {
                let mainEvent = 'TBA';
                if (event.title.toLowerCase().includes(' vs. ') || event.title.toLowerCase().includes(' vs ')) {
                  mainEvent = event.title; // Using title as main event for API data
                } else {
                  mainEvent = event.title;
                }
                
                let isPPV = false;
                let broadcastName = 'N/A';
                if (event.broadcast && event.broadcast.length > 0) {
                   broadcastName = event.broadcast[0].broadcasters[0] || 'N/A';
                   if (broadcastName.toLowerCase().includes('ppv')) isPPV = true;
                }

                return (
                <tr key={index} className='hover:bg-page-bg transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col'>
                      <span className='text-[13px] font-medium text-text-primary'>
                        {event.title}
                      </span>
                      <span className='text-[10px] text-text-disabled uppercase'>
                        PRO BOXING
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <span className='text-sm text-[#656464] font-normal'>
                      {mainEvent}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex justify-center'>
                      <span className='text-[10px] font-medium px-2 py-0.5 rounded-full bg-success-bg text-success-text'>
                        Completed
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex justify-center'>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          isPPV
                            ? 'bg-text-accent text-surface-white'
                            : broadcastName !== 'N/A'
                            ? 'bg-muted text-text-secondary'
                            : 'bg-transparent text-text-placeholder'
                        }`}
                      >
                        {broadcastName}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col items-center'>
                      <span className='text-xs text-[#3d3b38]'>{event.venue || 'TBA'}</span>
                      <span className='text-[10px] text-text-placeholder'>{event.location || ''}</span>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function RecentResults() {
  return (
    <Suspense fallback={<div className="h-48" />}>
      <RecentResultsContent />
    </Suspense>
  );
}
