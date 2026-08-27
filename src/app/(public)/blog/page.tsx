import type { Metadata } from 'next';
import { INITIAL_POSTS } from '@/lib/data';
import { buildCanonicalUrl, buildOgImageUrl } from '@/lib/seo';
import { BlogHubPage } from '@/features/blog';
import { BreadcrumbJsonLd } from '@/components/shared/json-ld';

export const metadata: Metadata = {
  title: 'Blog, Berita & Wawasan Teknologi',
  description:
    'Kumpulan wawasan rekayasa software, rilis produk Mitrasova, strategi otomatisasi kasir & payroll, serta agenda acara teknologi terkini.',
  alternates: {
    canonical: buildCanonicalUrl('/blog'),
  },
  openGraph: {
    title: 'Blog, Berita & Wawasan Teknologi | Mitrasova Digital Solutions',
    description:
      'Wawasan rekayasa teknologi perangkat lunak enterprise, panduan modernisasi kasir offline, payroll TER, dan cloud hosting.',
    url: buildCanonicalUrl('/blog'),
    type: 'website',
    images: [
      {
        url: buildOgImageUrl(),
        width: 1200,
        height: 630,
        alt: 'Mitrasova Blog & Publications',
      },
    ],
  },
};

export default function BlogRoutePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: buildCanonicalUrl('/') },
          { name: 'Blog & Kabar', url: buildCanonicalUrl('/blog') },
        ]}
      />
      <BlogHubPage initialPosts={INITIAL_POSTS} />
    </>
  );
}
