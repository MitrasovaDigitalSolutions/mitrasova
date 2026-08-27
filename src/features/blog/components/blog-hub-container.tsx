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
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const BlogHubContainer: React.FC<{ initialPosts?: PostItem[] }> = ({
  initialPosts = INITIAL_POSTS,
}) => {
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Hub Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-cyan-300 border border-indigo-500/20 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('blog.hub.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t('blog.hub.title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t('blog.hub.subtitle')}
          </p>
        </div>

        {/* Featured Editorial Post Card (Only on ALL tab & when no active search) */}
        {activeTab === 'ALL' && !searchQuery && featuredPost && (
          <div className="mt-12">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 hover:border-indigo-500/50 transition-all duration-300 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 items-center">
                <div className="lg:col-span-12 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                      {featuredPost.categoryName}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {featuredPost.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Oleh <span className="text-white font-medium">{featuredPost.authorName}</span>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-6 space-y-8">
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
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
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
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <span>Selanjutnya</span>
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
