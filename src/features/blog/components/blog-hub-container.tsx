'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const BlogHubContainer: React.FC<{ initialPosts?: PostItem[] }> = ({
  initialPosts = INITIAL_POSTS,
}) => {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // Reset to page 1 on tab or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts]);

  const tabs = [
    { id: 'ALL', label: t('blog.hub.allTab'), icon: Layers },
    { id: 'wawasan-blog', label: t('blog.hub.articlesTab'), icon: FileText },
    { id: 'berita-media', label: t('blog.hub.newsTab'), icon: Newspaper },
    { id: 'event-agenda', label: t('blog.hub.eventsTab'), icon: Calendar },
    { id: 'rilis-produk', label: t('blog.hub.updatesTab'), icon: Rocket },
  ];

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Tab filter
      if (activeTab !== 'ALL' && post.categorySlug !== activeTab) {
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

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPosts = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, safeCurrentPage, pageSize]);

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-24 relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Editorial Hub Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 text-cyan-300 border border-indigo-500/30 shadow-inner backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{t('blog.hub.badge')}</span>
          </div>

          {/* Headline with Multi-tone Gradient */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
            <span className="block">{t('blog.hub.title')}</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent mt-1.5">
              {t('blog.hub.titleGradient')}
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {t('blog.hub.subtitle', t('blog.hub.description'))}
          </p>
        </div>

        {/* Featured Editorial Post Card (Only on ALL tab & when no active search) */}
        {activeTab === 'ALL' && !searchQuery && featuredPost && (
          <div className="mt-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block relative rounded-3xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900/70 via-slate-950/80 to-slate-950 hover:border-indigo-500/50 transition-all duration-300 shadow-2xl backdrop-blur-xl"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 items-center">
                <div className="lg:col-span-12 space-y-4">
                  {/* Category & Read Time Pills */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                      <BookOpen className="w-3 h-3 text-cyan-400" />
                      <span>{t('blog.hub.featuredTag')}</span>
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {featuredPost.categoryName}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/90 px-2.5 py-1 rounded-full border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-tight tracking-tight">
                    {featuredPost.title}
                  </h2>

                  {/* Excerpt */}
                  {featuredPost.summary && (
                    <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {featuredPost.summary}
                    </p>
                  )}

                  {/* Card Footer: Author & Action Link */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {featuredPost.authorName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">
                          {featuredPost.authorName}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(featuredPost.updatedAt).toLocaleDateString(
                            locale === 'en' ? 'en-US' : 'id-ID',
                            { day: 'numeric', month: 'short', year: 'numeric' }
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                      <span>{t('blog.hub.readArticle')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Filter Controls: Category Tabs & Instant Search */}
        <div className="mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none shrink-0 min-h-[40px]',
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/25 font-bold'
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
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t('blog.hub.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8 space-y-10">
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post, idx) => (
                <BlogCard key={post.id} post={post} index={idx} />
              ))}
            </div>

            {/* Public Pagination Bar */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{locale === 'en' ? 'Previous' : 'Sebelumnya'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === safeCurrentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          'w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center font-mono',
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <span>{locale === 'en' ? 'Next' : 'Selanjutnya'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
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
