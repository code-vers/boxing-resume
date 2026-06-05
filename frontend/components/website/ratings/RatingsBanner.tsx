/**
 * @component RatingsBanner
 * @description Full-width dark themed hero/banner for the Fighter Ratings page.
 * @returns {JSX.Element}
 */
export default function RatingsBanner() {
  return (
    <section className='w-full bg-[#0A0A0A] py-12 md:py-16'>
      <div className='mx-auto flex w-full flex-col items-start justify-center px-4 sm:px-6 md:px-8 xl:px-12'>
        {/* * @block Main Title
         * @description Heavy weight, uppercase, tightly tracked to match the aggressive boxing aesthetic.
         */}
        <h1 className='text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl md:text-[40px] md:leading-none'>
          Fighter Ratings
        </h1>

        {/* * @block Subtitle
         * @description Muted helper text using the standard #857F78 hex for dark-mode text.
         */}
        <p className='mt-2 text-[12px] font-medium tracking-wide text-[#857F78] sm:text-[13px]'>
          Rankings based on complete bout history. Updated daily.
        </p>
      </div>
    </section>
  );
}
