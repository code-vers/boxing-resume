/**
 * @component ContactBanner
 * @description The header section of the Contact page, featuring the title "CONTACT US" 
 * and a brief description. Consistent with the site's dark banner theme.
 * @returns {JSX.Element} The rendered ContactBanner component.
 */
export default function ContactBanner() {
  /**
   * @section Main Container
   * @description Dark background section with responsive padding and precise typography.
   */
  return (
    <section className='bg-card-dark flex w-full flex-col items-start justify-center px-4 py-[60px] sm:px-6 md:px-8 xl:px-[50px]'>
      <div className='w-full max-w-[1280px]'>
        {/* 
         * @block Heading 
         * @description Impactful uppercase title using the Bebas Neue font.
         */}
        <div className='flex flex-col gap-2'>
          <h1 className='font-bebas text-5xl leading-[1.1] text-surface-white uppercase sm:text-6xl md:text-[64px]'>
            Contact Us
          </h1>
          
          {/* 
           * @block Subtitle 
           * @description Light font weight description with specific letter spacing.
           */ }
          <p className='text-muted-foreground font-light text-sm tracking-[0.6px] sm:text-base md:text-[14px] text-[#d4cec4]'>
            The complete boxing database and record keeper.
          </p>
        </div>
      </div>
    </section>
  );
}
