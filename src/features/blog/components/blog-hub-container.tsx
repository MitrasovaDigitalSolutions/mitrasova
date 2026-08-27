'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { INITIAL_POSTS } from '@/lib/data';
import { PostItem } from '@/types';
import { BlogCard } from './blog-card';
import { useTranslation } from '@/lib/i18n';
import {
  Search,
  Sparkles,
  Newspaper,
  Calendar,
  Layers,
  FileText,
  ArrowRight,
  Clock,
  X,
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const BlogHubContainer: React.FC<{ initialPosts?: PostItem[] }> = ({
  initialPosts = INITIAL_POSTS,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts]);

  const tabs = [
    { id: 'ALL', label: t('blog.hub.allTab'), icon: Layers },
    { id: 'ARTICLE', label: t('blog.hub.articlesTab'), icon: FileText },
    { id: 'NEWS', label: t('blog.hub.newsTab'), icon: Newspaper },
    { id: 'EVENT', label: t('blog.hub.eventsTab'), icon: Calendar },
    { id: 'RELEASE', label: t('blog.hub.updatesTab'), icon: Rocket },
  ];

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Tab filter
      if (activeTab !== 'ALL' && post.type !== activeTab) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchSummary = post.summary?.toLowerCase().includes(q) || false;
        const matchTags = post.tags?.some((tag) => tag.toLowerCase().includes(q)) || false;
        const matchAuthor = post.authorName.toLowerCase().includes(q);
        return matchTitle || matchSummary || matchTags || matchAuthor;
      }
      return true;
    });
  }, [initialPosts, activeTab, searchQuery]);

  return (
    <div className="relative overflow-hidden pb-32">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-indigo-600/15 via-cyan-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header Section */}
      <section className="pt-16 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('blog.hub.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t('blog.hub.title')}{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
              {t('blog.hub.titleGradient')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t('blog.hub.description')}
          </p>
        </div>

        {/* Featured Post Spotlight Banner */}
        {featuredPost && (
          <div className="mt-10">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl group-hover:border-cyan-400/50 transition-all duration-300">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      ★ {t('blog.hub.featuredTag')}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-cyan-300 transition-colors leading-tight max-w-4xl tracking-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed line-clamp-2">
                    {featuredPost.summary}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {featuredPost.authorName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{featuredPost.authorName}</p>
                        <p className="text-[11px] text-slate-400">{featuredPost.authorRole}</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                      <span>{t('blog.hub.readArticle')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Filter Controls: Tabs & Instant Search */}
        <div className="mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none shrink-0 min-h-[38px]',
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t('blog.hub.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-6">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <BlogCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/40">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">{t('blog.hub.emptyTitle')}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {t('blog.hub.emptyDesc')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
