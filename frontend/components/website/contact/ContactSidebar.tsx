import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @constant ICON_ASSETS
 * @description Remote asset URLs extracted from Figma for the sidebar icons.
 */
const ICON_ASSETS = {
  mail: 'https://www.figma.com/api/mcp/asset/bf2b3471-fa2b-4b30-bba6-c6644c92850a',
  alert: 'https://www.figma.com/api/mcp/asset/2143c8f2-7855-4bdb-81e1-f5936333ca77',
  help: 'https://www.figma.com/api/mcp/asset/3a774bbe-6c94-431c-a501-1a6b7e948a27',
};

/**
 * @constant FAQ_ITEMS
 * @description List of frequently asked questions for the FAQ section.
 */
const FAQ_ITEMS = [
  'How do I add a fighter to the database?',
  'How are fighter ratings calculated?',
  'Can I export fight data?',
  'Is there a mobile app available?',
  'How can I become a contributor?',
  'What sanctioning bodies do you track?',
];

/**
 * @component ContactSidebar
 * @description The right column of the Contact page containing info boxes and FAQs.
 */
export default function ContactSidebar() {
  return (
    <div className='flex w-full flex-col gap-3 lg:max-w-[587px]'>
      {/* 
       * @block Get In Touch Box 
       */}
      <div className='bg-surface-white border-divider flex flex-col gap-3 rounded-lg border p-4'>
        <div className='relative h-5 w-5'>
          <Image src={ICON_ASSETS.mail} alt='Mail' fill className='object-contain' />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-bebas text-base uppercase text-text-primary'>Get in Touch</h3>
          <p className='text-text-secondary text-xs'>
            For general inquiries, partnership opportunities, or media requests
          </p>
        </div>
        <a 
          href='mailto:contact@boxingresume.com' 
          className='text-text-accent text-xs font-medium hover:underline'
        >
          contact@boxingresume.com
        </a>
      </div>

      {/* 
       * @block Report Error Box 
       */}
      <div className='bg-surface-white border-divider flex flex-col gap-3 rounded-lg border p-4'>
        <div className='relative h-5 w-5'>
          <Image src={ICON_ASSETS.alert} alt='Alert' fill className='object-contain' />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-bebas text-base uppercase text-text-primary'>Report an Error</h3>
          <p className='text-text-secondary text-xs'>
            Found incorrect fighter data, bout results, or statistics?
          </p>
        </div>
        <Link 
          href='/report-error'
          className='text-text-accent flex items-center gap-1 text-xs font-medium hover:underline'
        >
          Submit error report <ArrowRight size={12} />
        </Link>
      </div>

      {/* 
       * @block FAQ Box 
       */}
      <div className='bg-surface-white border-divider flex flex-col gap-4 rounded-lg border p-4'>
        <div className='flex items-center gap-2'>
          <div className='relative h-5 w-5'>
            <Image src={ICON_ASSETS.help} alt='Help' fill className='object-contain' />
          </div>
          <h3 className='font-bebas text-base uppercase text-text-primary'>Frequently Asked</h3>
        </div>
        
        <div className='flex flex-col'>
          {FAQ_ITEMS.map((item, index) => (
            <Link
              key={index}
              href='#'
              className={`border-card-muted flex items-center justify-between py-2 text-[12px] text-text-secondary transition-colors hover:text-text-primary ${
                index !== FAQ_ITEMS.length - 1 ? 'border-b' : ''
              }`}
            >
              <span>{item}</span>
              <ArrowRight size={12} className='text-text-placeholder' />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
