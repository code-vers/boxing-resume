import Link from 'next/link';

/**
 * @component Footer
 * @description Renders the global dark-themed footer with brand logo, navigation links, and copyright.
 * Engineered for pixel-perfect adherence to the Figma design layout and typography.
 * @returns {JSX.Element}
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-[#0A0A0A] py-8'>
      <div className='mx-auto flex w-full flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 md:px-8 xl:px-12'>
        {/* * @block Logo
         * @description Left-aligned brand typography. "BOXING" uses tight tracking, "RESUME" uses wide tracking and the specific Figma red hex.
         */}
        <Link
          href='/'
          className='flex shrink-0 flex-col items-start justify-center transition-opacity hover:opacity-80 sm:w-1/3'
        >
          <span className='text-[18px] font-black uppercase leading-none tracking-tight text-white'>
            Boxing
          </span>
          <span className='mt-1 text-[9px] font-black uppercase leading-none tracking-[0.2em] text-[#D72322]'>
            Resume
          </span>
        </Link>

        {/* * @block Navigation Links
         * @description Center-aligned muted links with standard hover transitions.
         */}
        <nav className='flex items-center justify-center gap-6 sm:w-1/3'>
          <Link
            href='/about'
            className='text-[12px] font-medium text-[#857F78] transition-colors hover:text-white'
          >
            About
          </Link>
          <Link
            href='/privacy'
            className='text-[12px] font-medium text-[#857F78] transition-colors hover:text-white'
          >
            Privacy
          </Link>
          <Link
            href='/contact'
            className='text-[12px] font-medium text-[#857F78] transition-colors hover:text-white'
          >
            Contact
          </Link>
          <Link
            href='/terms'
            className='text-[12px] font-medium text-[#857F78] transition-colors hover:text-white'
          >
            Terms
          </Link>
        </nav>

        {/* * @block Copyright
         * @description Right-aligned copyright text matching the muted link colors.
         */}
        <div className='flex justify-end text-[12px] font-medium text-[#857F78] sm:w-1/3'>
          &copy; {currentYear} Boxing Resume
        </div>
      </div>
    </footer>
  );
}
