import type { Metadata } from 'next';
import { postsService } from '@/lib/posts-service';
import { buildCanonicalUrl, buildOgImageUrl } from '@/lib/seo';
import { BlogHubPage } from '@/features/blog';
import { BreadcrumbJsonLd } from '@/components/shared/json-ld';

export const metadata: Metadata = {
  title: 'Wawasan, Cerita Rekayasa & Jurnal Teknologi Enterprise',
  description:
    'Kajian mendalam seputar arsitektur software enterprise, optimasi ritel & payroll modern, hingga catatan rilis dan perspektif praktisi teknologi di Mitrasova.',
  alternates: {
    canonical: buildCanonicalUrl('/blog'),
  },
  openGraph: {
    title: 'Wawasan, Cerita Rekayasa & Jurnal Teknologi | Mitrasova Digital Solutions',
    description:
      'Kajian mendalam seputar arsitektur software enterprise, optimasi kasir offline-first, otomatisasi payroll TER, dan infrastruktur cloud terkelola.',
    url: buildCanonicalUrl('/blog'),
    type: 'website',
    images: [
      {
        url: buildOgImageUrl(),
        width: 1200,
        height: 630,
        alt: 'Mitrasova Engineering Journal & Insights',
      },
    ],
  },
};

export default async function BlogRoutePage() {
  const posts = await postsService.getAllPosts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: buildCanonicalUrl('/') },
          { name: 'Wawasan & Jurnal', url: buildCanonicalUrl('/blog') },
        ]}
      />
      <BlogHubPage initialPosts={posts} />
    </>
  );
}
