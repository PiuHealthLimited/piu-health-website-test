import { useMainLayoutMeta } from '@/layouts';
import { ORGANIZATION_CONTACT, ORGANIZATION_FULL_ADDRESS, SITE_NAME, SITE_URL } from '@/constants';
import {
  ComingSoonSection,
  CorePillarsSection,
  FeatureHighlightsSection,
  HeroSection,
  PartnersCarousel,
} from './components';

export function HomePage() {
  useMainLayoutMeta({
    title: 'Home',
    description:
      'Discover PiuHealth—an AI-guided, preventive health companion with portable records and curated education.',
    canonicalPath: '/',
    keywords: [
      'preventive health platform',
      'AI health assistant',
      'digital health companion',
      'health education app',
      'portable medical records',
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        email: ORGANIZATION_CONTACT.email,
        telephone: ORGANIZATION_CONTACT.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: ORGANIZATION_CONTACT.address.street,
          addressLocality: ORGANIZATION_CONTACT.address.locality,
          addressRegion: ORGANIZATION_CONTACT.address.region,
          postalCode: ORGANIZATION_CONTACT.address.postalCode,
          addressCountry: ORGANIZATION_CONTACT.address.country,
        },
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
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description:
          'PiuHealth blends preventive care, portable health records, and trusted AI guidance for everyday decisions.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?s={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: SITE_NAME,
        address: {
          '@type': 'PostalAddress',
          streetAddress: ORGANIZATION_CONTACT.address.street,
          addressLocality: ORGANIZATION_CONTACT.address.locality,
          addressRegion: ORGANIZATION_CONTACT.address.region,
          postalCode: ORGANIZATION_CONTACT.address.postalCode,
          addressCountry: ORGANIZATION_CONTACT.address.country,
        },
        telephone: ORGANIZATION_CONTACT.phone,
        url: SITE_URL,
        description: ORGANIZATION_FULL_ADDRESS,
      },
    ],
  });

  return (
    <>
      <HeroSection />
      <div className="main-content">
        <FeatureHighlightsSection />
        <CorePillarsSection />
        <ComingSoonSection />
        <PartnersCarousel />
      </div>
    </>
  );
}
