import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Footer, Header } from '@/components';
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_KEYWORDS,
  DEFAULT_META_TITLE,
  DEFAULT_TWITTER_HANDLE,
  SITE_LOCALE,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_URL,
} from '@/constants';

export type MainLayoutOgType = 'website' | 'article';
export type MainLayoutTwitterCard = 'summary' | 'summary_large_image';
export type StructuredDataPayload =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | string;

export interface MainLayoutMetaInput {
  title?: string;
  description?: string;
  canonicalPath?: string | null;
  keywords?: string[] | null;
  image?: string | null;
  noindex?: boolean;
  ogType?: MainLayoutOgType;
  twitterCard?: MainLayoutTwitterCard;
  structuredData?: StructuredDataPayload | StructuredDataPayload[] | null | undefined;
}

export interface MainLayoutMetaContextValue {
  /**
   * Apply a partial meta update. Returns a restore function that reverts
   * to the previous meta when called (ideal for page-level temporary overrides).
   */
  setMeta: (meta: MainLayoutMetaInput) => () => void;
}

const MainLayoutMetaContext = createContext<MainLayoutMetaContextValue | null>(null);

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const STRUCTURED_DATA_ELEMENT_ID = 'piuhealth-structured-data';

const DEFAULT_TITLE = DEFAULT_META_TITLE;
const DEFAULT_DESCRIPTION = DEFAULT_META_DESCRIPTION;
const DEFAULT_CANONICAL_PATH = '/';
const DEFAULT_KEYWORDS = DEFAULT_META_KEYWORDS;
const DEFAULT_IMAGE = SITE_LOGO_PATH;
const DEFAULT_OG_TYPE: MainLayoutOgType = 'website';
const DEFAULT_TWITTER_CARD: MainLayoutTwitterCard = 'summary_large_image';
const DEFAULT_ROBOTS_INDEX = 'index,follow';
const DEFAULT_ROBOTS_NOINDEX = 'noindex,nofollow';
const SITE_IMAGE_ALT = `${SITE_NAME} brand mark`;

function resolveTitle(value?: string) {
  return value ? `${value} • PiuHealth` : DEFAULT_TITLE;
}

function resolveDescription(value?: string) {
  return value ?? DEFAULT_DESCRIPTION;
}

function resolveCanonicalPath(value?: string | null) {
  if (value === null) return null;
  if (value === undefined) return DEFAULT_CANONICAL_PATH;
  if (ABSOLUTE_URL_PATTERN.test(value) || value.startsWith('/')) return value;
  return `/${value}`;
}

function resolveKeywords(value?: string[] | null) {
  if (value === null) return [];
  if (value === undefined) return DEFAULT_KEYWORDS;
  const normalized = value.map((k) => k.trim()).filter((k) => k.length > 0);
  return Array.from(new Set(normalized));
}

function resolveImage(value?: string | null) {
  if (value === null) return null;
  if (!value) return DEFAULT_IMAGE;
  if (ABSOLUTE_URL_PATTERN.test(value) || value.startsWith('/')) return value;
  return `/${value}`;
}

function normalizeStructuredData(
  value: MainLayoutMetaInput['structuredData'],
  fallback: string | null,
): string | null {
  if (value === undefined) return fallback;
  if (value === null) return null;
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return fallback;
  }
}

/**
 * Page-level hook to temporarily override layout meta.
 * Restores automatically on unmount or when inputs change back.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useMainLayoutMeta(metaUpdate: MainLayoutMetaInput) {
  const context = useContext(MainLayoutMetaContext);
  if (!context) {
    throw new Error('useMainLayoutMeta must be used within a MainLayout component.');
  }

  const { setMeta } = context;

  const stableMetaUpdate = useMemo<MainLayoutMetaInput>(() => metaUpdate, [metaUpdate]);

  useEffect(() => {
    const restore = setMeta(stableMetaUpdate);
    return restore;
  }, [setMeta, stableMetaUpdate]);
}

interface MainLayoutMetaState {
  title: string;
  description: string;
  canonicalPath: string | null;
  keywords: string[];
  image: string | null;
  noindex: boolean;
  ogType: MainLayoutOgType;
  twitterCard: MainLayoutTwitterCard;
  structuredData: string | null;
}

function mergeMeta(
  current: MainLayoutMetaState,
  next: MainLayoutMetaInput,
  base: MainLayoutMetaState,
): MainLayoutMetaState {
  const fallback = current ?? base;
  const keywords = next.keywords === undefined ? fallback.keywords : resolveKeywords(next.keywords);
  const canonicalPath =
    next.canonicalPath === undefined
      ? fallback.canonicalPath
      : resolveCanonicalPath(next.canonicalPath);
  const image = next.image === undefined ? fallback.image : resolveImage(next.image);
  const structuredData = normalizeStructuredData(next.structuredData, fallback.structuredData);

  return {
    title: next.title === undefined ? fallback.title : resolveTitle(next.title),
    description:
      next.description === undefined ? fallback.description : resolveDescription(next.description),
    canonicalPath,
    keywords,
    image,
    noindex: next.noindex ?? fallback.noindex,
    ogType: next.ogType ?? fallback.ogType,
    twitterCard: next.twitterCard ?? fallback.twitterCard,
    structuredData,
  };
}

function getWindowOrigin() {
  if (typeof window === 'undefined') return SITE_URL;
  try {
    return window.location.origin || SITE_URL;
  } catch {
    return SITE_URL;
  }
}

function getCurrentUrl() {
  if (typeof window === 'undefined') return SITE_URL;
  try {
    return window.location.href;
  } catch {
    return SITE_URL;
  }
}

function buildAbsoluteUrl(value: string | null) {
  if (!value) return null;
  if (ABSOLUTE_URL_PATTERN.test(value)) return value;
  const origin = getWindowOrigin();
  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${origin}${normalized}`;
}

function buildCanonicalUrl(path: string | null) {
  if (path === null) return null;
  if (ABSOLUTE_URL_PATTERN.test(path)) return path;
  const origin = getWindowOrigin();
  const candidate = path ?? DEFAULT_CANONICAL_PATH;
  const normalizedPath = candidate.startsWith('/') ? candidate : `/${candidate}`;
  return `${origin}${normalizedPath}`;
}

function setMetaTag(attribute: 'name' | 'property', key: string, content: string | null) {
  const selector = `meta[${attribute}="${key}"]`;
  const head = document.head;
  let element = head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    element?.parentElement?.removeChild(element);
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    head.appendChild(element);
  }

  element.content = content;
}

function setLinkTag(rel: string, href: string | null) {
  const selector = `link[rel="${rel}"]`;
  const head = document.head;
  let element = head.querySelector<HTMLLinkElement>(selector);

  if (!href) {
    element?.parentElement?.removeChild(element);
    return;
  }

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    head.appendChild(element);
  }

  element.href = href;
}

function setStructuredData(content: string | null) {
  const head = document.head;
  let element = head.querySelector<HTMLScriptElement>(`#${STRUCTURED_DATA_ELEMENT_ID}`);

  if (!content) {
    element?.parentElement?.removeChild(element);
    return;
  }

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = STRUCTURED_DATA_ELEMENT_ID;
    head.appendChild(element);
  }

  element.textContent = content;
}

export function MainLayout({
  title,
  description,
  canonicalPath,
  keywords,
  image,
  noindex,
  ogType,
  twitterCard,
  structuredData,
  children,
}: {
  title?: string;
  description?: string;
  canonicalPath?: string | null;
  keywords?: string[] | null;
  image?: string | null;
  noindex?: boolean;
  ogType?: MainLayoutOgType;
  twitterCard?: MainLayoutTwitterCard;
  structuredData?: MainLayoutMetaInput['structuredData'];
  children: ReactNode;
}) {
  const baseMeta = useMemo<MainLayoutMetaState>(
    () => ({
      title: resolveTitle(title),
      description: resolveDescription(description),
      canonicalPath: resolveCanonicalPath(canonicalPath),
      keywords: resolveKeywords(keywords),
      image: resolveImage(image),
      noindex: noindex ?? false,
      ogType: ogType ?? DEFAULT_OG_TYPE,
      twitterCard: twitterCard ?? DEFAULT_TWITTER_CARD,
      structuredData: normalizeStructuredData(structuredData ?? undefined, null),
    }),
    [
      title,
      description,
      canonicalPath,
      keywords,
      image,
      noindex,
      ogType,
      twitterCard,
      structuredData,
    ],
  );

  const [meta, setMetaState] = useState<MainLayoutMetaState>(baseMeta);

  useEffect(() => {
    setMetaState(baseMeta);
  }, [baseMeta]);

  useEffect(() => {
    const canonicalUrl = buildCanonicalUrl(meta.canonicalPath);
    const absoluteImage = buildAbsoluteUrl(meta.image);
    const keywordsContent = meta.keywords.length ? meta.keywords.join(', ') : null;
    const robotsContent = meta.noindex ? DEFAULT_ROBOTS_NOINDEX : DEFAULT_ROBOTS_INDEX;

    // document title
    document.title = meta.title;

    // Basic SEO
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', keywordsContent);
    setMetaTag('name', 'robots', robotsContent);

    // Open Graph
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:locale', SITE_LOCALE);
    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalUrl ?? getCurrentUrl());
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:image:alt', absoluteImage ? SITE_IMAGE_ALT : null);

    // Twitter
    setMetaTag('name', 'twitter:card', meta.twitterCard);
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', absoluteImage);
    setMetaTag('name', 'twitter:site', DEFAULT_TWITTER_HANDLE);

    // Link + LD+JSON
    setLinkTag('canonical', canonicalUrl);
    setLinkTag('icon', buildAbsoluteUrl(SITE_LOGO_PATH));
    setLinkTag('apple-touch-icon', buildAbsoluteUrl(SITE_LOGO_PATH));
    setLinkTag('manifest', '/site.webmanifest');
    setStructuredData(meta.structuredData);
  }, [meta]);

  const setMeta = useCallback<MainLayoutMetaContextValue['setMeta']>(
    (nextMeta) => {
      let previousMeta: MainLayoutMetaState = baseMeta;
      let resolvedMeta: MainLayoutMetaState = baseMeta;

      setMetaState((current) => {
        previousMeta = current;
        resolvedMeta = mergeMeta(current, nextMeta, baseMeta);
        return resolvedMeta;
      });

      return () => {
        setMetaState((current) => (current === resolvedMeta ? previousMeta : current));
      };
    },
    [baseMeta],
  );

  const contextValue = useMemo<MainLayoutMetaContextValue>(() => ({ setMeta }), [setMeta]);

  return (
    <MainLayoutMetaContext.Provider value={contextValue}>
      <a
        href="#main-content"
        className="sr-only sr-only-focusable inline-flex items-center rounded bg-white px-4 py-2 text-sm font-semibold text-dark shadow focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="flex min-h-screen flex-col bg-accent/10 text-dark">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </MainLayoutMetaContext.Provider>
  );
}

export default MainLayout;
