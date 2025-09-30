export const SITE_NAME = 'PiuHealth';

export const SITE_URL = 'https://piuhealth.com';

export const SITE_LOCALE = 'en_US';

export const SITE_LOGO_PATH = '/logo.svg';

export const DEFAULT_META_TITLE = 'PiuHealth — Personalized, Preventive, Portable Health';

export const DEFAULT_META_DESCRIPTION =
  'PiuHealth is a next-generation health platform combining AI guidance, preventive care, and portable health records. Join the waitlist for early access.';

export const DEFAULT_META_KEYWORDS = [
  'PiuHealth',
  'preventive health',
  'portable health records',
  'AI health assistant',
  'patient engagement',
];

export const DEFAULT_TWITTER_HANDLE = '@PiuHealth';

export const ORGANIZATION_CONTACT = {
  phone: '+15745550123',
  phoneDisplay: '+1 (574) 555-0123',
  email: 'support@piuhealth.com',
  address: {
    street: '1234 North Avenue, Suite 200',
    locality: 'South Bend',
    region: 'IN',
    postalCode: '46601',
    country: 'US',
  },
} as const;

export const ORGANIZATION_FULL_ADDRESS = `${ORGANIZATION_CONTACT.address.street}, ${ORGANIZATION_CONTACT.address.locality}, ${ORGANIZATION_CONTACT.address.region} ${ORGANIZATION_CONTACT.address.postalCode}, USA`;
