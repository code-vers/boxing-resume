import TermsBanner from '@/components/website/terms/TermsBanner';
import TermsContent from '@/components/website/terms/TermsContent';

/**
 * @page Terms
 * @description The Terms of Service page for the Boxing Resume website.
 * It outlines the rules and regulations for using the platform.
 * @returns {JSX.Element} The rendered Terms page.
 */
export default function TermsPage() {
  return (
    <div className='flex flex-col'>
      {/* Banner Section */}
      <TermsBanner />
      
      {/* Main Content Section */}
      <TermsContent />
    </div>
  );
}
