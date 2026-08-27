'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PostItem } from '@/types';
import { useTranslation } from '@/lib/i18n';
import {
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  Newspaper,
  FileText,
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const BlogCard: React.FC<{ post: PostItem; index?: number }> = ({ post, index = 0 }) => {
  const { t, locale } = useTranslation();
  const isEvent = post.categorySlug === 'event-agenda';
  const isRelease = post.categorySlug === 'rilis-produk';
  const isNews = post.categorySlug === 'berita-media';

  const typeConfig = isEvent
    ? {
        label: t('blog.card.types.event'),
        color: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
        icon: Calendar,
        gradient: 'from-purple-600/20 via-indigo-600/10 to-transparent',
        accentGlow: 'group-hover:border-purple-500/50',
      }
    : isRelease
    ? {
        label: t('blog.card.types.release'),
        color: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
        icon: Rocket,
        gradient: 'from-amber-600/20 via-cyan-600/10 to-transparent',
        accentGlow: 'group-hover:border-amber-500/50',
      }
    : isNews
    ? {
        label: t('blog.card.types.news'),
        color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
        icon: Newspaper,
        gradient: 'from-emerald-600/20 via-indigo-600/10 to-transparent',
        accentGlow: 'group-hover:border-emerald-500/50',
      }
    : {
        label: t('blog.card.types.article'),
        color: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
        icon: FileText,
        gradient: 'from-indigo-600/20 via-cyan-600/10 to-transparent',
        accentGlow: 'group-hover:border-cyan-500/50',
      };

  const TypeIcon = typeConfig.icon;

  const formattedDate = new Date(post.updatedAt).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'id-ID',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <div
          className={cn(
            'h-full flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-950/75 hover:bg-slate-900/40 transition-all duration-300 relative overflow-hidden backdrop-blur-md p-6 sm:p-7 shadow-lg shadow-black/40',
            typeConfig.accentGlow
          )}
        >
          {/* Subtle Ambient Header Gradient Glow */}
          <div
            className={cn(
              'absolute top-0 left-0 right-0 h-32 bg-gradient-to-b opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none',
              typeConfig.gradient
            )}
          />

          {/* Top Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Main Card Content */}
          <div className="space-y-4 relative z-10">
            {/* Header: Category & Type Badge + Read Time */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border backdrop-blur-md',
                    typeConfig.color
                  )}
                >
                  <TypeIcon className="w-3 h-3" />
                  <span>{typeConfig.label}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  {post.categoryName}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 font-mono font-medium flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                <Clock className="w-3 h-3 text-slate-400" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors leading-snug tracking-tight">
              {post.title}
            </h3>

            {/* Summary */}
            {post.summary && (
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed line-clamp-2 font-normal">
                {post.summary}
              </p>
            )}

            {/* Event Specific Card Callout */}
            {isEvent && post.eventDate && (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs space-y-1.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-purple-300 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>
                    {new Date(post.eventDate).toLocaleDateString(
                      locale === 'en' ? 'en-US' : 'id-ID',
                      {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </span>
                </div>
                {post.eventLocation && (
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{post.eventLocation}</span>
                  </div>
                )}
              </div>
            )}

            {/* Tags Pills */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800/80 text-slate-400 group-hover:text-slate-300 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer: Author & Action Link */}
          <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-[11px] shadow-sm shrink-0">
                {post.authorName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[130px] sm:max-w-[160px]">
                  {post.authorName}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formattedDate}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all">
              <span>{isEvent ? t('blog.card.eventAction') : t('blog.card.readAction')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
