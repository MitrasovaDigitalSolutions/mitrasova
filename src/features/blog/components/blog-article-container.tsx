'use client';

import React from 'react';
import Link from 'next/link';
import { BlogArticleProps } from '../types';
import { EventBanner } from './event-banner';
import { BlogCard } from './blog-card';
import { SocialShareMenu } from './social-share-menu';
import { AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import {
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Tag,
  ArrowUpRight,
  Calendar,
  Clock,
  Rocket,
  Newspaper,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const BlogArticleContainer: React.FC<BlogArticleProps> = ({
  post,
  relatedPosts = [],
}) => {
  const { t, locale } = useTranslation();

  const isEvent = post.categorySlug === 'event-agenda';
  const isRelease = post.categorySlug === 'rilis-produk';
  const isNews = post.categorySlug === 'berita-media';

  const typeConfig = isEvent
    ? {
        label: t('blog.card.types.event'),
        color: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
        icon: Calendar,
      }
    : isRelease
    ? {
        label: t('blog.card.types.release'),
        color: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
        icon: Rocket,
      }
    : isNews
    ? {
        label: t('blog.card.types.news'),
        color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
        icon: Newspaper,
      }
    : {
        label: t('blog.card.types.article'),
        color: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
        icon: FileText,
      };

  const TypeIcon = typeConfig.icon;

  const formattedDate = new Date(post.updatedAt).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'id-ID',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <article className="relative overflow-hidden pb-32">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-indigo-600/15 via-cyan-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 space-y-10">
        {/* Breadcrumb Navigation & Back Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pb-1">
            <Link href="/" className="hover:text-white transition-colors">
              {t('navbar.home')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <Link href="/blog" className="hover:text-white transition-colors">
              {t('navbar.blog')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-cyan-400 font-semibold truncate max-w-[220px]">
              {post.title}
            </span>
          </div>

          <Link
            href="/blog"
            className="text-xs text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('blog.article.backToBlog')}</span>
          </Link>
        </div>

        {/* Article Hero Header */}
        <header className="space-y-6 pb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border',
                typeConfig.color
              )}
            >
              <TypeIcon className="w-3.5 h-3.5" />
              <span>{typeConfig.label}</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">{post.categoryName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18]">
            {post.title}
          </h1>

          {post.summary && (
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-500/5 border-l-4 border-indigo-500/70 border border-indigo-500/15">
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal italic">
                {post.summary}
              </p>
            </div>
          )}

          {/* Author Bar & Integrated Social Share Bar */}
          <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-slate-800/80">
            {/* Author Profile */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-base shadow-md shrink-0">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{post.authorName}</p>
                <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono mt-0.5">
                  <span>{post.authorRole || 'Mitrasova Editorial'}</span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Share Menu */}
            <SocialShareMenu title={post.title} summary={post.summary} />
          </div>
        </header>

        {/* Event Banner (if Event post) */}
        {isEvent && <EventBanner post={post} />}

        {/* Article Prose Body (Clean & Centered Reading Experience - 1:1 Identical with Console Editor) */}
        <main
          className="blog-article-content w-full"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Article Footer: Tags & Secondary Share */}
        <footer className="pt-8 border-t border-slate-800/80 space-y-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                {t('blog.article.relatedTags')}
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300"
                  >
                    <Tag className="w-3 h-3 text-cyan-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Bottom Share Bar */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-white">{t('blog.article.likeArticle')}</p>
              <p className="text-[11px] text-slate-400">{t('blog.article.shareWithTeam')}</p>
            </div>
            <SocialShareMenu title={post.title} summary={post.summary} />
          </div>

          {/* Consultation CTA Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-cyan-400 uppercase font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{t('blog.article.consultBadge')}</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              {t('blog.article.consultTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t('blog.article.consultDesc')}
            </p>
            <div className="pt-2">
              <Link href="/konsultasi">
                <AppButton variant="primary" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  {t('blog.article.consultBtn')}
                </AppButton>
              </Link>
            </div>
          </div>
        </footer>

        {/* Related Posts Recommendation */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 border-t border-slate-800/80 space-y-6">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                {t('blog.hub.badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {t('blog.article.relatedTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((relPost, idx) => (
                <BlogCard key={relPost.id} post={relPost} index={idx} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
