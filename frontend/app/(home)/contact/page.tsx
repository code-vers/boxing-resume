import ContactBanner from '@/components/website/contact/ContactBanner';
import ContactForm from '@/components/website/contact/ContactForm';
import ContactSidebar from '@/components/website/contact/ContactSidebar';

/**
 * @component ContactPage
 * @description The main page component for the /contact route. 
 * Renders the ContactBanner, ContactForm, and ContactSidebar.
 * @returns {JSX.Element} The rendered Contact page.
 */
export default function ContactPage() {
  return (
    <section className='bg-page-bg min-h-screen'>
      {/* 
       * @section Header 
       */}
      <ContactBanner />

      {/* 
       * @section Main Content 
       * @description Responsive grid layout for form and sidebar.
       */}
      <div className='mx-auto max-w-[1242px] px-4 py-6 sm:px-6 md:py-10 lg:px-8'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
          {/* Form Column */}
          <div className='flex-1'>
            <ContactForm />
          </div>

          {/* Sidebar Column */}
          <div className='flex-1'>
            <ContactSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
