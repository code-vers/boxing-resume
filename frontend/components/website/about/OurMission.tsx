import Link from 'next/link';

/**
 * @constant WHAT_WE_DO
 * @description Data for the "What We Do" cards.
 */
const WHAT_WE_DO = [
  {
    title: 'Complete Records',
    description: 'Comprehensive fight histories for every professional boxer',
  },
  {
    title: 'Live Rankings',
    description: 'Real-time ratings updated daily across all weight divisions',
  },
  {
    title: 'Statistical Analysis',
    description: 'In-depth punch stats, KO rates, and performance metrics',
  },
  {
    title: 'Title Tracking',
    description: 'Complete championship lineage across all sanctioning bodies',
  },
];

/**
 * @component OurMission
 * @description The main content section of the About page, including the mission statement,
 * "What We Do" grid, team description, and a "Get In Touch" call-to-action.
 * Wrapped in a white card as per the Figma design.
 * @returns {JSX.Element} The rendered OurMission component.
 */
export default function OurMission() {
  return (
    <section className='mx-auto mb-16 mt-0 lg:mt-20 w-full max-w-[896px] px-4 sm:px-6'>
      {/* 
       * @section Main Container 
       * @description White card with border and shadow, containing all about content.
       */}
      <div className='bg-surface-white border-divider flex flex-col gap-8 rounded-lg border p-6 sm:p-8 md:p-[33px]'>
        
        {/* 
         * @block Our Mission Section 
         */}
        <div className='flex flex-col gap-3'>
          <h2 className='font-bebas text-2xl uppercase text-text-primary'>Our Mission</h2>
          <div className='flex flex-col gap-4'>
            <p className='text-text-secondary text-sm leading-relaxed sm:text-base'>
              Boxing Resume is the world&apos;s most comprehensive database of professional boxing records, statistics, and fight histories. Our mission is to preserve the sport&apos;s rich legacy while providing fans, analysts, and historians with accurate, up-to-date information.
            </p>
            <p className='text-text-secondary text-sm leading-relaxed sm:text-base'>
              We track over 345,000 fighters and 1.3 million bouts across all weight classes and sanctioning bodies, making us the definitive source for boxing data worldwide.
            </p>
          </div>
        </div>

        {/* 
         * @block What We Do Section 
         */}
        <div className='flex flex-col gap-4'>
          <h2 className='font-bebas text-2xl uppercase text-text-primary'>What We Do</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {WHAT_WE_DO.map((item) => (
              <div 
                key={item.title} 
                className='bg-section-bg border-divider flex flex-col gap-1 rounded-lg border p-[17px]'
              >
                <h3 className='font-bebas text-text-accent text-base uppercase'>{item.title}</h3>
                <p className='text-text-secondary text-[13px] leading-snug'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 
         * @block Our Team Section 
         */}
        <div className='flex flex-col gap-3'>
          <h2 className='font-bebas text-2xl uppercase text-text-primary'>Our Team</h2>
          <p className='text-text-secondary text-sm leading-relaxed sm:text-base'>
            Our team consists of boxing historians, data analysts, and passionate fans dedicated to maintaining the most accurate records in the sport. We work with industry experts, promoters, and sanctioning bodies to ensure every statistic is verified and up-to-date.
          </p>
        </div>

        {/* 
         * @block Get In Touch Section 
         * @description Dark CTA section within the white card.
         */}
        <div className='bg-card-dark flex flex-col items-center justify-center rounded-lg px-6 py-8 text-center'>
          <h2 className='font-bebas mb-2 text-2xl text-surface-white uppercase'>Get In Touch</h2>
          <p className='text-text-placeholder mb-6 text-[13px]'>
            Have questions, corrections, or want to contribute to our database?
          </p>
          <Link 
            href='/contact'
            className='bg-btn-primary hover:bg-btn-primary-hover rounded-md px-8 py-2.5 text-[13px] font-medium text-surface-white transition-colors'
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
