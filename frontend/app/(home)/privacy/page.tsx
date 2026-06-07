import PrivacyBanner from '@/components/website/privacy/PrivacyBanner';
import PrivacyContent from '@/components/website/privacy/PrivacyContent';

/**
 * @page Privacy
 * @description The Privacy Policy page for the Boxing Resume website.
 * It provides detailed information about data collection, usage, and user rights.
 * @returns {JSX.Element} The rendered Privacy page.
 */
export default function PrivacyPage() {
  return (
    <div className='flex flex-col'>
      {/* Banner Section */}
      <PrivacyBanner />
      
      {/* Main Content Section */}
      <PrivacyContent />
    </div>
  );
}
