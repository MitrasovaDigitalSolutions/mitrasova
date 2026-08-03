import { INITIAL_SERVICES, INITIAL_POSTS, INITIAL_CATEGORIES } from '@/lib/data';
import { DocsArticlePage } from '@/features/docs';

interface DocsArticleRouteProps {
  params: Promise<{
    serviceSlug: string;
    categorySlug: string;
    articleSlug: string;
  }>;
}

export async function generateMetadata({ params }: DocsArticleRouteProps) {
  const { serviceSlug, articleSlug } = await params;
  const post = INITIAL_POSTS.find((p) => p.slug === articleSlug);
  const service = INITIAL_SERVICES.find((s) => s.slug === serviceSlug);

  if (!post) return { title: 'Artikel tidak ditemukan | Mitrasova Docs' };

  return {
    title: `${post.title} - ${service?.title || 'Docs'} | Mitrasova`,
    description: post.summary,
  };
}

export default async function DocsArticleRoutePage({ params }: DocsArticleRouteProps) {
  const { serviceSlug, categorySlug, articleSlug } = await params;

  const currentService = INITIAL_SERVICES.find((s) => s.slug === serviceSlug) || INITIAL_SERVICES[0];
  const post = INITIAL_POSTS.find((p) => p.slug === articleSlug) || INITIAL_POSTS[0];

  return (
    <DocsArticlePage
      post={post}
      currentService={currentService}
      allServices={INITIAL_SERVICES}
      allCategories={INITIAL_CATEGORIES}
      allPosts={INITIAL_POSTS}
    />
  );
}
