import { SEO_DEFAULTS, SITE_URL } from '@/lib/seo';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_DEFAULTS.siteName,
    alternateName: SEO_DEFAULTS.siteNameShort,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SEO_DEFAULTS.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_DEFAULTS.location.streetAddress,
      addressLocality: SEO_DEFAULTS.location.addressLocality,
      addressRegion: SEO_DEFAULTS.location.addressRegion,
      postalCode: SEO_DEFAULTS.location.postalCode,
      addressCountry: SEO_DEFAULTS.location.addressCountry,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Indonesia',
      },
    ],
    knowsAbout: [
      'Point of Sale Software',
      'HRIS & Payroll System',
      'Cloud Server Hosting',
      'Custom Web Development',
      'Mobile App Development',
      'Enterprise Software',
      'Software Engineering',
    ],
    sameAs: [
      SEO_DEFAULTS.socialLinks.linkedin,
      SEO_DEFAULTS.socialLinks.facebook,
      SEO_DEFAULTS.socialLinks.instagram,
    ],
  };

  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_DEFAULTS.siteName,
    alternateName: SEO_DEFAULTS.siteNameShort,
    url: SITE_URL,
    description: SEO_DEFAULTS.description,
    inLanguage: 'id-ID',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
}

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#local-business`,
    name: SEO_DEFAULTS.siteName,
    description: SEO_DEFAULTS.description,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_DEFAULTS.location.streetAddress,
      addressLocality: SEO_DEFAULTS.location.addressLocality,
      addressRegion: SEO_DEFAULTS.location.addressRegion,
      postalCode: SEO_DEFAULTS.location.postalCode,
      addressCountry: SEO_DEFAULTS.location.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.5947,
      longitude: 110.9519,
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  return <JsonLd data={data} />;
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  category: string;
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  category,
}: ServiceJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
    },
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

interface BlogPostingProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  categoryName?: string;
}

export function BlogPostingJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  categoryName,
}: BlogPostingProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    articleSection: categoryName,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return <JsonLd data={data} />;
}

interface EventJsonLdProps {
  name: string;
  description: string;
  url: string;
  startDate: string;
  locationName: string;
}

export function EventJsonLd({
  name,
  description,
  url,
  startDate,
  locationName,
}: EventJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    url,
    startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: locationName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surakarta',
        addressCountry: 'ID',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
      url: SITE_URL,
    },
  };

  return <JsonLd data={data} />;
}
