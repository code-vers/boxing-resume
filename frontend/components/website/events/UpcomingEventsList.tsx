'use client';

import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/features/rankings/api/rankings.api';
import { ApiEvent } from '@/features/rankings/types';
import FightCard from './FightCard';
import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const mapApiEventToFightCardProps = (apiEvent: ApiEvent) => {
  const dateObj = new Date(apiEvent.date);
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  let f1Name = 'TBA';
  let f2Name = 'TBA';

  if (apiEvent.title.toLowerCase().includes(' vs. ')) {
    const parts = apiEvent.title.split(/ vs\. /i);
    f1Name = parts[0].trim();
    f2Name = parts[1].split(':')[0].trim();
  } else if (apiEvent.title.toLowerCase().includes(' vs ')) {
    const parts = apiEvent.title.split(/ vs /i);
    f1Name = parts[0].trim();
    f2Name = parts[1].split(':')[0].trim();
  } else {
    f1Name = apiEvent.title;
  }

  const f1Initials = f1Name.substring(0, 2).toUpperCase();
  const f2Initials = f2Name.substring(0, 2).toUpperCase();

  let isPPV = false;
  if (apiEvent.broadcast && apiEvent.broadcast.length > 0) {
     const types = apiEvent.broadcast[0].broadcasters.join(' ').toLowerCase();
     if (types.includes('ppv')) isPPV = true;
  }

  return {
    id: apiEvent.id,
    eventName: apiEvent.title,
    date: dateStr,
    venue: apiEvent.venue ? `${apiEvent.venue}, ${apiEvent.location || ''}`.replace(/,\s*$/, '') : apiEvent.location || 'TBA',
    isPPV,
    isTitle: false,
    weightClass: 'Pro Boxing Event',
    fighter1: {
      name: f1Name,
      record: 'TBA',
      initials: f1Initials,
      country: 'TBA',
    },
    fighter2: {
      name: f2Name,
      record: 'TBA',
      initials: f2Initials,
      country: 'TBA',
    },
  };
};

function UpcomingEventsListContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'All';

  const { data, isLoading, error } = useQuery({
    queryKey: ['boxingEvents'],
    queryFn: getEvents,
  });

  const events = useMemo(() => {
    let mapped = data?.data?.map(mapApiEventToFightCardProps) || [];

    if (filter === 'PPV Only') {
      mapped = mapped.filter(e => e.isPPV);
    }

    // Note: If RapidAPI returns past or live events in the future, we can filter them here based on the 'filter' param.
    return mapped;
  }, [data, filter]);

  if (isLoading) {
    return <div className="text-center py-10 text-text-primary">Loading upcoming events...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Failed to load events.</div>;
  }

  if (events.length === 0) {
    return <div className="text-center py-10 text-text-placeholder">No upcoming events found for the selected category.</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {events.map((event) => (
        <FightCard key={event.id} {...event} />
      ))}
    </div>
  );
}

export default function UpcomingEventsList() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-text-primary">Loading upcoming events...</div>}>
      <UpcomingEventsListContent />
    </Suspense>
  );
}
