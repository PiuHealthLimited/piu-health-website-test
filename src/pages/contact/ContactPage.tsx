import { useMemo } from 'react';
import { PageLayout, type BreadcrumbItem, type StructuredDataPayload } from '@/layouts';
import { ORGANIZATION_CONTACT, SITE_NAME, SITE_URL } from '@/constants';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { useContactForm } from './hooks/useContactForm';

const BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Home', to: '/', iconClassName: 'fa fa-home' },
  { label: 'Contact' },
];

export function ContactPage() {
  const {
    formState,
    formErrors,
    statusMessage,
    statusType,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useContactForm();

  const contactStructuredData = useMemo<StructuredDataPayload[]>(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contact ${SITE_NAME}`,
        description:
          'Reach the PiuHealth team to discuss partnerships, product questions, or early access.',
        url: `${SITE_URL}/contact`,
        mainEntity: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: ORGANIZATION_CONTACT.email,
              telephone: ORGANIZATION_CONTACT.phone,
              areaServed: 'US',
              availableLanguage: ['English'],
            },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'PostalAddress',
        streetAddress: ORGANIZATION_CONTACT.address.street,
        addressLocality: ORGANIZATION_CONTACT.address.locality,
        addressRegion: ORGANIZATION_CONTACT.address.region,
        postalCode: ORGANIZATION_CONTACT.address.postalCode,
        addressCountry: ORGANIZATION_CONTACT.address.country,
      },
    ],
    [],
  );

  return (
    <PageLayout
      title="Contact Us"
      description="Reach the PiuHealth team to discuss partnerships, product questions, or early access."
      breadcrumbs={BREADCRUMBS}
      keywords={[
        'contact PiuHealth',
        'PiuHealth support',
        'PiuHealth partnerships',
        'health startup contact',
      ]}
      structuredData={contactStructuredData}
    >
      <section className="iq-contactbox pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="iq-get-in mt-5">
                <ContactForm
                  formState={formState}
                  formErrors={formErrors}
                  statusMessage={statusMessage}
                  statusType={statusType}
                  isSubmitting={isSubmitting}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
            <div className="col-lg-6 r-mt3">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
