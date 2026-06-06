import EventsBanner from '@/components/website/events/EventsBanner';
import EventsFilter from '@/components/website/events/EventsFilter';
import FightCard from '@/components/website/events/FightCard';
import LiveNow from '@/components/website/events/LiveNow';
import RecentResults from '@/components/website/events/RecentResults';

/**
 * @constant UPCOMING_EVENTS
 * @description Array of mock data for upcoming boxing matches to populate the FightCard grid.
 */
const UPCOMING_EVENTS = [
  {
    eventName: 'Mexican Independence Day',
    date: 'July 3, 2026',
    venue: 'T-Mobile Arena, Las Vegas, Nevada',
    isPPV: true,
    isTitle: true,
    weightClass: 'Welterweight',
    fighter1: {
      name: 'Crawford',
      record: '40-0-0 (31 KOs)',
      initials: 'TC',
      image: 'https://www.figma.com/api/mcp/asset/9f2e2427-d4a7-497a-b3a2-a2b3b28d7868',
      country: '🇺🇸 USA',
    },
    fighter2: {
      name: 'Spence Jr',
      record: '28-1-0 (22 KOs)',
      initials: 'ES',
      image: 'https://www.figma.com/api/mcp/asset/5b3d0851-fa01-4bc2-85fb-74c5019ab1cf',
      country: '🇺🇸 USA',
    },
  },
  {
    eventName: 'London Heavyweight Clash',
    date: 'August 12, 2026',
    venue: 'O2 Arena, London, UK',
    isPPV: false,
    isTitle: false,
    weightClass: 'Heavyweight',
    fighter1: {
      name: 'Joshua',
      record: '28-3-0 (25 KOs)',
      initials: 'AJ',
      image: 'https://www.figma.com/api/mcp/asset/4fbc3b31-f64f-4dea-857c-74b7d6e7f004',
      country: '🇬🇧 GBR',
    },
    fighter2: {
      name: 'Wilder',
      record: '43-3-1 (42 KOs)',
      initials: 'DW',
      image: 'https://www.figma.com/api/mcp/asset/6222f1a9-e666-41fc-95db-9396d52799e8',
      country: '🇺🇸 USA',
    },
  },
  {
     eventName: 'Tokyo Featherweight Duel',
     date: 'September 5, 2026',
     venue: 'Ariake Arena, Tokyo, Japan',
     isPPV: false,
     isTitle: true,
     weightClass: 'Featherweight',
     fighter1: {
       name: 'Inoue',
       record: '27-0-0 (24 KOs)',
       initials: 'NI',
       image: 'https://www.figma.com/api/mcp/asset/21f940d8-1bea-4022-a153-5148ac315ffe',
       country: '🇯🇵 JPN',
     },
     fighter2: {
       name: 'Tapales',
       record: '37-4-0 (19 KOs)',
       initials: 'MT',
       image: 'https://www.figma.com/api/mcp/asset/1f99e010-22f1-4c21-8d03-6ef2c8fe5a8e',
       country: '🇵🇭 PHI',
     },
   },
   {
      eventName: 'NYC Lightweight Battle',
      date: 'October 15, 2026',
      venue: 'Madison Square Garden, New York, NY',
      isPPV: true,
      isTitle: false,
      weightClass: 'Lightweight',
      fighter1: {
        name: 'Haney',
        record: '31-0-0 (15 KOs)',
        initials: 'DH',
        image: 'https://www.figma.com/api/mcp/asset/9f2e2427-d4a7-497a-b3a2-a2b3b28d7868',
        country: '🇺🇸 USA',
      },
      fighter2: {
        name: 'Davis',
        record: '29-0-0 (27 KOs)',
        initials: 'GD',
        image: 'https://www.figma.com/api/mcp/asset/5b3d0851-fa01-4bc2-85fb-74c5019ab1cf',
        country: '🇺🇸 USA',
      },
    },
];

/**
 * @page Events
 * @description The main events page assembly. Combines the banner, filters, live section,
 * upcoming fight grid, and recent results into a cohesive, responsive layout.
 * @returns {JSX.Element} The rendered events page.
 */
export default function EventsPage() {
  return (
    <main className='bg-page-bg min-h-screen'>
      {/* Hero Banner Section */}
      <EventsBanner />

      {/* Filter Section */}
      <EventsFilter />

      {/* Main Content Area */}
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12 py-12 space-y-16'>
        {/* Live Section */}
        <LiveNow />

        {/* Upcoming Events Grid */}
        <section>
          <div className='flex flex-col gap-1 mb-8'>
            <div className='flex items-center gap-2'>
              <div className='h-[1px] w-6 bg-text-accent'></div>
              <span className='text-text-accent text-[10px] uppercase font-medium tracking-wider'>
                FIGHT CARD
              </span>
            </div>
            <h2 className='font-bebas text-3xl text-text-primary uppercase tracking-tight'>
              UPCOMING EVENTS
            </h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {UPCOMING_EVENTS.map((event, index) => (
              <FightCard key={index} {...event} />
            ))}
          </div>
        </section>

        {/* Recent Results Section */}
        <RecentResults />
      </div>
    </main>
  );
}
