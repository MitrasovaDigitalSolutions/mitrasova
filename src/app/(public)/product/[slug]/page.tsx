import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INITIAL_SERVICES } from '@/lib/data';
import { buildCanonicalUrl, buildOgImageUrl } from '@/lib/seo';
import { ProductDetailPage } from '@/features/product';
import {
  SoftwareApplicationJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from '@/components/shared/json-ld';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INITIAL_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: 'Produk Tidak Ditemukan' };
  }

  const title = `${service.title} — ${service.heroTagline}`;
  const description = service.summary;
  const url = buildCanonicalUrl(`/product/${slug}`);

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
          alt: `${service.title} — Mitrasova Enterprise Software`,
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

export default async function ProductRoutePage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const productUrl = buildCanonicalUrl(`/product/${slug}`);

  return (
    <>
      <SoftwareApplicationJsonLd
        name={service.title}
        description={service.summary}
        url={productUrl}
        category={service.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: buildCanonicalUrl('/') },
          { name: 'Produk & Solusi', url: buildCanonicalUrl('/product') },
          { name: service.title, url: productUrl },
        ]}
      />
      {service.faqs.length > 0 && <FaqJsonLd faqs={service.faqs} />}
      <ProductDetailPage product={service} />
    </>
  );
}
