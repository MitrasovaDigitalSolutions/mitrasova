import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { postsService } from '@/lib/posts-service';
import { buildCanonicalUrl, buildOgImageUrl } from '@/lib/seo';
import { BlogArticlePage } from '@/features/blog';
import {
  BreadcrumbJsonLd,
  BlogPostingJsonLd,
  EventJsonLd,
} from '@/components/shared/json-ld';

interface BlogArticlePageRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await postsService.getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await postsService.getPostByIdOrSlug(slug);

  if (!post) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  const title = `${post.title} — Mitrasova`;
  const description = post.summary || post.title;
  const url = buildCanonicalUrl(`/blog/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Mitrasova Editorial`,
      description,
      url,
      type: 'article',
      publishedTime: post.createdAt || post.updatedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      images: [
        {
          url: buildOgImageUrl(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Mitrasova`,
      description,
    },
  };
}

export default async function BlogArticleRoutePage({ params }: BlogArticlePageRouteProps) {
  const { slug } = await params;
  const post = await postsService.getPostByIdOrSlug(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = buildCanonicalUrl(`/blog/${slug}`);
  const allPosts = await postsService.getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: buildCanonicalUrl('/') },
          { name: 'Wawasan & Jurnal', url: buildCanonicalUrl('/blog') },
          { name: post.categoryName, url: buildCanonicalUrl('/blog') },
          { name: post.title, url: articleUrl },
        ]}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.summary || post.title}
        url={articleUrl}
        datePublished={post.createdAt || post.updatedAt}
        dateModified={post.updatedAt}
        authorName={post.authorName}
        categoryName={post.categoryName}
      />
      {post.categorySlug === 'event-agenda' && post.eventDate && (
        <EventJsonLd
          name={post.title}
          description={post.summary || post.title}
          url={articleUrl}
          startDate={post.eventDate}
          locationName={post.eventLocation || 'Solo Technopark, Surakarta'}
        />
      )}
      <BlogArticlePage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
