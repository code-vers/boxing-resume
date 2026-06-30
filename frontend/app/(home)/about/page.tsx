import AboutBanner from '@/components/website/about/AboutBanner';
import OurMission from '@/components/website/about/OurMission';

/**
 * @component AboutPage
 * @description The main page component for the /about route. 
 * Renders the AboutBanner and OurMission components within the HomeLayout.
 * @returns {JSX.Element} The rendered About page.
 */
export default function AboutPage() {
  return (
    <section className='bg-page-bg min-h-screen'>
      <AboutBanner />
      <OurMission />
    </section>
  );
}
