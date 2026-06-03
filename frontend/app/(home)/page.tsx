import CurrentChampions from '@/components/home/CurrentChampions';
import FeaturedFighters from '@/components/home/FeaturedFighters';
import HeroBanner from '@/components/home/HeroBanner';
import RecentResults from '@/components/home/RecentResults';
import TopRankings from '@/components/home/TopRankings';
import UpcomingSchedule from '@/components/home/UpcomingSchedule';

export default function Home() {
  return (
    <section className='bg-page-bg'>
      <HeroBanner />
      <FeaturedFighters />
      <div className='xl:flex px-4 sm:px-6 md:px-8 xl:px-12'>
        <RecentResults />
        <CurrentChampions />
      </div>
      <TopRankings />
      <UpcomingSchedule />
    </section>
  );
}
