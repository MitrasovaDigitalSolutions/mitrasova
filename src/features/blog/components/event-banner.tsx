'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { AppButton } from '@/components/shared';
import { PostItem } from '@/types';
import { useTranslation } from '@/lib/i18n';

export const EventBanner: React.FC<{ post: PostItem }> = ({ post }) => {
  const { t, locale } = useTranslation();
  if (post.categorySlug !== 'event-agenda' && !post.eventDate) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950/60 border border-purple-800/40 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{t('blog.eventBanner.badge')}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            {t('blog.eventBanner.title')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            {post.eventDate && (
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">{t('blog.eventBanner.timeLabel')}</span>
                  <span className="text-white font-semibold">
                    {new Date(post.eventDate).toLocaleDateString(
                      locale === 'en' ? 'en-US' : 'id-ID',
                      { dateStyle: 'full' }
                    )}
                  </span>
                </div>
              </div>
            )}

            {post.eventLocation && (
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">{t('blog.eventBanner.locationLabel')}</span>
                  <span className="text-white font-semibold">{post.eventLocation}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link href="/konsultasi">
            <AppButton
              variant="primary"
              size="lg"
              className="w-full sm:w-auto justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('blog.eventBanner.actionBtn')}
            </AppButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
