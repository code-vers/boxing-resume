import CurrentChampions from '@/components/website/home/CurrentChampions';
import FeaturedFighters from '@/components/website/home/FeaturedFighters';
import HeroBanner from '@/components/website/home/HeroBanner';
import RecentResults from '@/components/website/home/RecentResults';
import TopRankings from '@/components/website/home/TopRankings';
import UpcomingSchedule from '@/components/website/home/UpcomingSchedule';

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
