import { SITE_NAME, SITE_URL } from '@/constants';
import { useMemo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { PageHero, type BreadcrumbItem } from './PageHero';
import {
  type MainLayoutMetaInput,
  type StructuredDataPayload,
  useMainLayoutMeta,
} from './MainLayout';

const HOME_CRUMB: BreadcrumbItem = { label: 'Home', to: '/', iconClassName: 'fa fa-home' };

interface PageLayoutProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[] | null;
  hero?: ReactNode;
  keywords?: string[] | null;
  canonicalPath?: string | null;
  structuredData?: StructuredDataPayload | StructuredDataPayload[] | null;
  noindex?: boolean;
  children: ReactNode;
}

export function PageLayout({
  title,
  description,
  breadcrumbs,
  hero,
  keywords,
  canonicalPath,
  structuredData,
  noindex,
  children,
}: PageLayoutProps) {
  const location = useLocation();

  const defaultCanonicalPath = useMemo(() => {
    const path = `${location.pathname}${location.search ?? ''}`;
    return path ? path : '/';
  }, [location.pathname, location.search]);

  const resolvedCanonicalPath = canonicalPath ?? defaultCanonicalPath;

  const resolvedBreadcrumbs = useMemo(() => {
    if (breadcrumbs === undefined) {
      return [HOME_CRUMB, { label: title }];
    }

    return breadcrumbs;
  }, [breadcrumbs, title]);

  const canonicalUrl = useMemo(() => {
    if (resolvedCanonicalPath === null) return null;
    if (!resolvedCanonicalPath) return `${SITE_URL}/`;
    if (resolvedCanonicalPath.startsWith('http')) return resolvedCanonicalPath;
    const normalized = resolvedCanonicalPath.startsWith('/')
      ? resolvedCanonicalPath
      : `/${resolvedCanonicalPath}`;
    return `${SITE_URL}${normalized}`;
  }, [resolvedCanonicalPath]);

  const breadcrumbStructuredData = useMemo<StructuredDataPayload | null>(() => {
    if (!resolvedBreadcrumbs || !resolvedBreadcrumbs.length || !canonicalUrl) {
      return null;
    }

    const itemListElement = resolvedBreadcrumbs.map((item, index) => {
      const itemPath = item.to ?? resolvedCanonicalPath ?? '/';
      const itemUrl = itemPath.startsWith('http')
        ? itemPath
        : `${SITE_URL}${itemPath.startsWith('/') ? itemPath : `/${itemPath}`}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: itemUrl,
      };
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    };
  }, [canonicalUrl, resolvedBreadcrumbs, resolvedCanonicalPath]);

  const webPageStructuredData = useMemo<StructuredDataPayload | null>(() => {
    if (!canonicalUrl) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${title} • ${SITE_NAME}`,
      description,
      url: canonicalUrl,
    };
  }, [canonicalUrl, description, title]);

  const combinedStructuredData = useMemo<
    StructuredDataPayload | StructuredDataPayload[] | null
  >(() => {
    const entries: StructuredDataPayload[] = [];

    if (webPageStructuredData) entries.push(webPageStructuredData);
    if (breadcrumbStructuredData) entries.push(breadcrumbStructuredData);

    if (structuredData) {
      const additional = Array.isArray(structuredData) ? structuredData : [structuredData];
      entries.push(...additional);
    }

    if (entries.length === 0) return null;
    return entries.length === 1 ? entries[0] : entries;
  }, [breadcrumbStructuredData, structuredData, webPageStructuredData]);

  const metaInput = useMemo<MainLayoutMetaInput>(() => {
    const meta: MainLayoutMetaInput = {
      title,
      description,
      canonicalPath: resolvedCanonicalPath,
      keywords,
    };

    if (typeof noindex === 'boolean') {
      meta.noindex = noindex;
    }

    if (combinedStructuredData) {
      meta.structuredData = combinedStructuredData;
    }

    return meta;
  }, [combinedStructuredData, description, keywords, noindex, resolvedCanonicalPath, title]);

  useMainLayoutMeta(metaInput);

  return (
    <>
      {hero}
      <div className="main-content">
        {resolvedBreadcrumbs ? <PageHero title={title} breadcrumbs={resolvedBreadcrumbs} /> : null}
        {children}
      </div>
    </>
  );
}
