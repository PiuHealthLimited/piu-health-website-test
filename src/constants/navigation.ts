export interface NavigationLink {
  label: string;
  path: string;
}

export const PRIMARY_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'Technology', path: '/technology' },
  { label: 'Partnership', path: '/partnership' },
  { label: 'Contact', path: '/contact' },
];

export const WAITLIST_LINK: NavigationLink = {
  label: 'Join the Waitlist',
  path: '/contact',
};

export const FOOTER_NAVIGATION_LINKS: NavigationLink[] = PRIMARY_NAVIGATION_LINKS.filter(
  (link) => link.path !== '/',
);

export const LEGAL_NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
];
