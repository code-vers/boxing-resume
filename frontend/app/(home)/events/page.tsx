import EventsBanner from '@/components/website/events/EventsBanner';
import EventsFilter from '@/components/website/events/EventsFilter';
import FightCard from '@/components/website/events/FightCard';
import LiveNow from '@/components/website/events/LiveNow';
import RecentResults from '@/components/website/events/RecentResults';

import UpcomingEventsList from '@/components/website/events/UpcomingEventsList';

/**
 * @page Events
 * @description The main events page assembly. Combines the banner, filters, live section,
 * upcoming fight grid, and recent results into a cohesive, responsive layout.
 * @returns {JSX.Element} The rendered events page.
 */
export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const resolvedParams = await searchParams;
  const filter = resolvedParams.filter || 'All';

  const showLive = filter === 'All' || filter === 'Live';
  const showUpcoming = filter === 'All' || filter === 'Upcoming' || filter === 'PPV Only';
  const showPast = filter === 'All' || filter === 'Past';

  return (
    <main className='bg-page-bg min-h-screen'>
      {/* Hero Banner Section */}
      <EventsBanner />

      {/* Filter Section */}
      <EventsFilter />

      {/* Main Content Area */}
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12 py-12 space-y-16'>
        {/* Live Section */}
        {showLive && <LiveNow />}

        {/* Upcoming Events Grid */}
        {showUpcoming && (
          <section>
            <div className='flex flex-col gap-1 mb-8'>
              <div className='flex items-center gap-2'>
                <div className='h-[1px] w-6 bg-text-accent'></div>
                <span className='text-text-accent text-[10px] uppercase font-medium tracking-wider'>
                  FIGHT CARD
                </span>
              </div>
              <h2 className='font-bebas text-3xl text-text-primary uppercase tracking-tight'>
                {filter === 'PPV Only' ? 'PPV EVENTS' : 'UPCOMING EVENTS'}
              </h2>
            </div>

            <UpcomingEventsList />
          </section>
        )}

        {/* Recent Results Section */}
        {showPast && <RecentResults />}
      </div>
    </main>
  );
}
