import FeaturedFighters from '@/components/home/FeaturedFighters';
import HeroBanner from '@/components/home/HeroBanner';

export default function Home() {
  return (
    <section className='bg-page-bg'>
      <HeroBanner />
      <FeaturedFighters />
    </section>
  );
}
