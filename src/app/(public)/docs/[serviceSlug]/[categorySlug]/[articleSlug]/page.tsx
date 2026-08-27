import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INITIAL_SERVICES, INITIAL_POSTS, INITIAL_CATEGORIES } from '@/lib/data';
import { buildCanonicalUrl } from '@/lib/seo';
import { DocsArticlePage } from '@/features/docs';
import { BreadcrumbJsonLd } from '@/components/shared/json-ld';

interface DocsArticleRouteProps {
  params: Promise<{
    serviceSlug: string;
    categorySlug: string;
    articleSlug: string;
  }>;
}

export async function generateStaticParams() {
  return INITIAL_POSTS.map((post) => ({
    serviceSlug: post.serviceSlug,
    categorySlug: post.categorySlug,
    articleSlug: post.slug,
  }));
}

export async function generateMetadata({ params }: DocsArticleRouteProps): Promise<Metadata> {
  const { serviceSlug, categorySlug, articleSlug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === articleSlug);
  const service = INITIAL_SERVICES.find((s) => s.slug === serviceSlug);

  if (!post) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  const title = `${post.title} — ${service?.title || 'Docs'}`;
  const description = post.summary;
  const url = buildCanonicalUrl(`/docs/${serviceSlug}/${categorySlug}/${articleSlug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Mitrasova`,
      description,
      url,
      type: 'article',
      publishedTime: post.updatedAt,
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary',
      title: `${title} | Mitrasova`,
      description,
    },
  };
}

export default async function DocsArticleRoutePage({ params }: DocsArticleRouteProps) {
  const { serviceSlug, articleSlug } = await params;

  const currentService = INITIAL_SERVICES.find((s) => s.slug === serviceSlug) || INITIAL_SERVICES[0];
  const post = INITIAL_POSTS.find((p) => p.slug === articleSlug);

  if (!post) {
    notFound();
  }

  const category = INITIAL_CATEGORIES.find((c) => c.slug === post.categorySlug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: buildCanonicalUrl('/') },
          { name: 'Docs', url: buildCanonicalUrl('/docs') },
          { name: currentService.title, url: buildCanonicalUrl(`/docs/${currentService.slug}`) },
          { name: category?.name || post.categoryName, url: buildCanonicalUrl(`/docs/${currentService.slug}/${post.categorySlug}`) },
          { name: post.title, url: buildCanonicalUrl(`/docs/${currentService.slug}/${post.categorySlug}/${post.slug}`) },
        ]}
      />
      <DocsArticlePage
        post={post}
        currentService={currentService}
        allServices={INITIAL_SERVICES}
        allCategories={INITIAL_CATEGORIES}
        allPosts={INITIAL_POSTS}
      />
    </>
  );
}
