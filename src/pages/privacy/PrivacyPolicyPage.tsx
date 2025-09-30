import { useMemo } from 'react';
import { PageLayout, type BreadcrumbItem, type StructuredDataPayload } from '@/layouts';
import { ORGANIZATION_CONTACT, ORGANIZATION_FULL_ADDRESS, SITE_NAME, SITE_URL } from '@/constants';

interface PrivacyPolicySection {
  heading: string;
  description: string;
}

const PRIVACY_POLICY_SECTIONS: PrivacyPolicySection[] = [
  {
    heading: 'Overview',
    description:
      'PiuHealth offers educational tools and general wellness guidance. This privacy notice outlines how we handle the personal information you choose to share while exploring our website and preview experiences.',
  },
  {
    heading: 'Information We Collect',
    description:
      'We may collect contact details, messages, and usage analytics when you interact with forms, previews, or early-access programs. We do not request protected health information within this experience.',
  },
  {
    heading: 'How We Use Information',
    description:
      'Any details you provide help us respond to inquiries, refine the product, and share relevant updates. We do not sell or rent personal information and only share it with service providers who support PiuHealth operations under strict confidentiality.',
  },
  {
    heading: 'Data Security',
    description:
      'We apply administrative, technical, and physical safeguards—such as encryption in transit, access controls, and regular reviews—to protect your information from unauthorized access, disclosure, alteration, or destruction.',
  },
  {
    heading: 'Your Choices',
    description: `You may request updates or deletion of your contact details by emailing ${ORGANIZATION_CONTACT.email}. Marketing communications include an unsubscribe option, and we honor opt-out choices promptly.`,
  },
  {
    heading: 'Cookies & Analytics',
    description:
      'We use minimal cookies and analytics tools to understand aggregate site usage. You can adjust your browser settings to limit cookies; doing so may impact certain site features.',
  },
  {
    heading: 'Updates to This Notice',
    description:
      'We review this policy periodically and will post any changes with a revised effective date. Significant updates may be highlighted on the homepage or via email when appropriate.',
  },
  {
    heading: 'Contact Us',
    description: `For privacy questions or requests, reach us at ${ORGANIZATION_CONTACT.email} or ${ORGANIZATION_FULL_ADDRESS}.`,
  },
];

const BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Home', to: '/', iconClassName: 'fa fa-home' },
  { label: 'Privacy Policy' },
];

export function PrivacyPolicyPage() {
  const structuredData = useMemo<StructuredDataPayload>(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'PrivacyPolicy',
      name: `${SITE_NAME} Privacy Policy`,
      url: `${SITE_URL}/privacy-policy`,
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'privacy inquiries',
            email: ORGANIZATION_CONTACT.email,
            telephone: ORGANIZATION_CONTACT.phone,
          },
        ],
      },
    }),
    [],
  );

  return (
    <PageLayout
      title="Privacy Policy"
      description="Understand how PiuHealth handles your information across previews, waitlists, and outreach."
      breadcrumbs={BREADCRUMBS}
      keywords={['PiuHealth privacy policy', 'health app data protection', 'PiuHealth compliance']}
      structuredData={structuredData}
    >
      <section className="privacy-policy">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {PRIVACY_POLICY_SECTIONS.map((section, index) => (
                <div className={index === 0 ? 'mt-2' : 'mt-5'} key={section.heading}>
                  <h4 className="iq-tw-7">{section.heading}</h4>
                  <p>{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
