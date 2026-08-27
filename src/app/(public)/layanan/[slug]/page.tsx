import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INITIAL_SERVICES } from '@/lib/data';
import { buildCanonicalUrl, buildOgImageUrl } from '@/lib/seo';
import { ServiceDetailPage } from '@/features/services';
import {
  SoftwareApplicationJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from '@/components/shared/json-ld';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INITIAL_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: 'Layanan Tidak Ditemukan' };
  }

  const title = `${service.title} — ${service.heroTagline}`;
  const description = service.summary;
  const url = buildCanonicalUrl(`/layanan/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Mitrasova Digital Solutions`,
      description,
      url,
      type: 'website',
      images: [
        {
          url: buildOgImageUrl(),
          width: 1200,
          height: 630,
          alt: `${service.title} — Mitrasova Digital Solutions`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Mitrasova`,
      description,
    },
  };
}

export default async function ServiceRoutePage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceUrl = buildCanonicalUrl(`/layanan/${slug}`);

  return (
    <>
      <SoftwareApplicationJsonLd
        name={service.title}
        description={service.summary}
        url={serviceUrl}
        category={service.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: buildCanonicalUrl('/') },
          { name: 'Layanan', url: buildCanonicalUrl('/layanan') },
          { name: service.title, url: serviceUrl },
        ]}
      />
      {service.faqs.length > 0 && <FaqJsonLd faqs={service.faqs} />}
      <ServiceDetailPage service={service} />
    </>
  );
}
