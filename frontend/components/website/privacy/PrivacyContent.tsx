/**
 * @constant PRIVACY_DATA
 * @description Structured data for the Privacy Policy content.
 */
const PRIVACY_DATA = [
  {
    id: 'introduction',
    title: 'INTRODUCTION',
    content: `Boxing Resume ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.`,
  },
  {
    id: 'info-collect',
    title: 'INFORMATION WE COLLECT',
    sections: [
      {
        subtitle: 'Personal Information',
        content: 'We may collect personal information that you voluntarily provide when registering, such as name, email address, and user preferences.',
      },
      {
        subtitle: 'Usage Data',
        content: 'We automatically collect certain information about your device and how you interact with our services, including IP address, browser type, pages visited, and access times.',
      },
    ],
  },
  {
    id: 'how-use',
    title: 'HOW WE USE YOUR INFORMATION',
    list: [
      'To provide and maintain our services',
      'To improve and personalize user experience',
      'To send notifications about saved fighters and events',
      'To analyze usage patterns and optimize our platform',
      'To comply with legal obligations',
    ],
  },
  {
    id: 'data-security',
    title: 'DATA SECURITY',
    content: 'We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    id: 'your-rights',
    title: 'YOUR RIGHTS',
    intro: 'You have the right to:',
    list: [
      'Access and receive a copy of your personal data',
      'Request correction of inaccurate data',
      'Request deletion of your data',
      'Opt-out of marketing communications',
      'Withdraw consent at any time',
    ],
  },
];

/**
 * @component PrivacyContent
 * @description The main content section of the Privacy Policy page, organized into
 * logical sections with clear headings and bulleted lists.
 * Wrapped in a white card as per the Figma design.
 * @returns {JSX.Element} The rendered PrivacyContent component.
 */
export default function PrivacyContent() {
  return (
    <section className='mx-auto mb-16 mt-6 w-full max-w-[896px] px-4 sm:px-6'>
      {/* 
       * @section Main Container 
       * @description White card with border and shadow, containing all privacy content.
       */}
      <div className='bg-surface-white border-divider flex flex-col gap-8 rounded-lg border p-6 sm:p-8 md:p-[33px]'>
        
        {PRIVACY_DATA.map((item) => (
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
                  <div key={idx} className='flex flex-col gap-1'>
                    <h3 className='text-text-primary text-[15px] font-medium uppercase'>
                      {section.subtitle}
                    </h3>
                    <p className='text-text-secondary text-sm leading-relaxed sm:text-base'>
                      {section.content}
                    </p>
                  </div>
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
          </div>
        ))}

        {/* 
         * @block Questions Box 
         * @description Light brown background section for contact info.
         */}
        <div className='bg-card-muted flex flex-col gap-2 rounded-lg p-5'>
          <h2 className='font-bebas text-lg uppercase text-text-primary'>
            QUESTIONS ABOUT PRIVACY?
          </h2>
          <p className='text-text-secondary text-[13px] leading-relaxed'>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <a 
            href='mailto:privacy@boxingresume.com' 
            className='text-text-accent text-[13px] font-medium transition-colors hover:underline'
          >
            privacy@boxingresume.com
          </a>
        </div>
      </div>
    </section>
  );
}
