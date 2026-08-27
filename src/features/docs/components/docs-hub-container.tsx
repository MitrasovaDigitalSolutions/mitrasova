'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeading, GlassCard } from '@/components/shared';
import { INITIAL_SERVICES, INITIAL_POSTS } from '@/lib/data';
import { DocsServiceCard } from './docs-service-card';
import { APP_VERSION } from '@/lib/version';
import { useTranslation } from '@/lib/i18n';
import { FileText, ArrowRight } from 'lucide-react';

export const DocsHubContainer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 pb-28">
      <SectionHeading
        badge={`Documentation Hub v${APP_VERSION}`}
        title={t('docs.hub.title')}
        gradientText={t('docs.hub.titleGradient')}
        description={t('docs.hub.description')}
      />

      {/* Service Switcher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INITIAL_SERVICES.map((srv) => (
          <DocsServiceCard key={srv.id} service={srv} posts={INITIAL_POSTS} />
        ))}
      </div>

      {/* Featured Articles Section */}
      <section className="space-y-6 pt-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-400" />
          <span>{t('docs.hub.articlesCount')}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_POSTS.map((post) => (
            <GlassCard key={post.id} className="p-6 border-slate-800 bg-slate-950/70">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20 font-mono">
                    {post.categoryName}
                  </span>
                  <span className="text-slate-400 font-mono">{post.readTime}</span>
                </div>

                <h4 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                  <Link href={`/docs/${post.serviceSlug}/${post.categorySlug}/${post.slug}`}>
                    {post.title}
                  </Link>
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">{post.summary}</p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{t('docs.article.author')}: {post.authorName}</span>
                  <Link
                    href={`/docs/${post.serviceSlug}/${post.categorySlug}/${post.slug}`}
                    className="text-cyan-400 font-medium hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>{t('common.learnMore')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};
