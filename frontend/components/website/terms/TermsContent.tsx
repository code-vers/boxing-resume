/**
 * @constant TERMS_DATA
 * @description Structured data for the Terms of Service content.
 */
const TERMS_DATA = [
  {
    id: 'agreement',
    title: 'AGREEMENT TO TERMS',
    content: 'By accessing and using Boxing Resume, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.',
  },
  {
    id: 'use-license',
    title: 'USE LICENSE',
    content: 'Permission is granted to temporarily access the materials on Boxing Resume for personal, non-commercial use only. This license shall automatically terminate if you violate any of these restrictions.',
    subsections: [
      {
        id: 'license-restrictions',
        intro: 'You may not:',
        list: [
          'Modify or copy the materials',
          'Use the materials for commercial purposes',
          'Attempt to reverse engineer any software',
          'Remove copyright or proprietary notations',
          'Transfer materials to another person',
        ],
      },
    ],
  },
  {
    id: 'user-accounts',
    title: 'USER ACCOUNTS',
    sections: [
      {
        content: 'When creating an account, you must provide accurate and complete information. You are responsible for maintaining the security of your account and password.',
      },
      {
        content: 'You agree to notify us immediately of any unauthorized use of your account. We cannot be held liable for any loss or damage arising from your failure to maintain account security.',
      },
    ],
  },
  {
    id: 'data-accuracy',
    title: 'DATA ACCURACY',
    content: 'While we strive to maintain accurate and up-to-date information, we make no warranties or representations regarding the accuracy, completeness, or reliability of any data on this site. Fight records, statistics, and rankings are provided for informational purposes only.',
  },
  {
    id: 'prohibited-activities',
    title: 'PROHIBITED ACTIVITIES',
    intro: 'You may not access or use the site for any purpose other than that for which we make it available. Prohibited activities include:',
    list: [
      'Systematic data scraping or harvesting',
      'Attempting to gain unauthorized access',
      'Interfering with site security features',
      'Uploading viruses or malicious code',
      'Engaging in any automated use of the system',
    ],
  },
  {
    id: 'liability',
    title: 'LIMITATION OF LIABILITY',
    content: 'In no event shall Boxing Resume or its suppliers be liable for any damages arising out of the use or inability to use the materials on this site, even if we have been notified of the possibility of such damage.',
  },
];

/**
 * @component TermsContent
 * @description The main content section of the Terms of Service page, organized into
 * logical sections with clear headings and bulleted lists.
 * Wrapped in a white card as per the Figma design.
 * @returns {JSX.Element} The rendered TermsContent component.
 */
export default function TermsContent() {
  return (
    <section className='mx-auto mb-16 mt-6 w-full max-w-[896px] px-4 sm:px-6'>
      {/* 
       * @section Main Container 
       * @description White card with border and shadow, containing all terms content.
       */}
      <div className='bg-surface-white border-divider flex flex-col gap-8 rounded-lg border p-6 sm:p-8 md:p-[33px]'>
        
        {TERMS_DATA.map((item) => (
          <div key={item.id} className='flex flex-col gap-3'>
            <h2 className='font-bebas text-2xl uppercase text-text-primary'>{item.title}</h2>
            
            {item.content && (
              <p className='text-text-secondary text-sm leading-relaxed sm:text-base'>
                {item.content}
              </p>
            )}

            {item.sections && (
              <div className='flex flex-col gap-4'>
                {item.sections.map((section, idx) => (
                  <p key={idx} className='text-text-secondary text-sm leading-relaxed sm:text-base'>
                    {section.content}
                  </p>
                ))}
              </div>
            )}

            {item.intro && (
              <p className='text-text-secondary text-sm leading-relaxed sm:text-base'>
                {item.intro}
              </p>
            )}

            {item.list && (
              <ul className='flex flex-col gap-2 pl-1'>
                {item.list.map((listItem, idx) => (
                  <li key={idx} className='flex items-start gap-3'>
                    <span className='bg-btn-primary mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full' />
                    <span className='text-text-secondary text-sm leading-relaxed sm:text-base'>
                      {listItem}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {item.subsections && (
              <div className='flex flex-col gap-4'>
                {item.subsections.map((sub) => (
                  <div key={sub.id} className='bg-card-muted border-divider flex flex-col gap-2 rounded-lg border p-4'>
                    {sub.intro && (
                      <p className='text-text-secondary text-xs font-medium uppercase tracking-wider sm:text-[13px]'>
                        {sub.intro}
                      </p>
                    )}
                    {sub.list && (
                      <ul className='flex flex-col gap-1.5'>
                        {sub.list.map((listItem, idx) => (
                          <li key={idx} className='flex items-center gap-3'>
                            <span className='bg-btn-primary h-1.5 w-1.5 shrink-0 rounded-full' />
                            <span className='text-text-secondary text-xs sm:text-[13px]'>
                              {listItem}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* 
         * @block Questions Box 
         * @description Dark background section for legal contact info.
         */}
        <div className='bg-card-dark flex flex-col items-center justify-center gap-3 rounded-lg p-6 text-center sm:p-8'>
          <h2 className='font-bebas text-lg uppercase text-surface-white sm:text-xl'>
            QUESTIONS ABOUT TERMS?
          </h2>
          <p className='text-muted-foreground max-w-[400px] text-xs leading-relaxed sm:text-[13px]'>
            If you have questions about these Terms of Service, contact us at:
          </p>
          <a 
            href='mailto:legal@boxingresume.com' 
            className='text-btn-primary text-sm font-medium transition-colors hover:brightness-110 sm:text-base'
          >
            legal@boxingresume.com
          </a>
        </div>
      </div>
    </section>
  );
}
