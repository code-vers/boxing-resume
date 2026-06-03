/**
 * @component ChampionsBanner
 * @description A high-impact, dark-themed banner for the World Champions page.
 * Strictly adheres to design system tokens for spacing, typography, and background color.
 * @returns {JSX.Element}
 */
export default function ChampionsBanner() {
  return (
    <section className='w-full bg-card-dark py-12 md:py-16'>
      <div className='mx-auto flex w-full max-w-7xl flex-col items-start justify-center px-4 sm:px-6 md:px-8 xl:px-12'>
        {/* * @block Main Title */}
        <h1 className='text-3xl font-black uppercase tracking-tighter text-surface-white sm:text-4xl md:text-[40px] md:leading-none'>
          World Champions
        </h1>

        {/* * @block Subtitle */}
        <p className='mt-2 text-[12px] font-medium tracking-wide text-text-placeholder sm:text-[13px]'>
          Current world champions across all weight classes and sanctioning bodies.
        </p>
      </div>
    </section>
  );
}
