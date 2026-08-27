import React from 'react';
import Link from 'next/link';
import { ServiceItem, CategoryItem, PostItem } from '@/types';
import { GlassCard } from '@/components/shared';
import { Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ServiceDocsLeftSidebarProps {
  currentService: ServiceItem;
  post: PostItem;
  allServices: ServiceItem[];
  allCategories: CategoryItem[];
  allPosts: PostItem[];
}

export const ServiceDocsLeftSidebar: React.FC<ServiceDocsLeftSidebarProps> = ({
  currentService,
  post,
  allServices,
  allCategories,
  allPosts,
}) => {
  const servicePosts = allPosts.filter((p) => p.serviceSlug === currentService.slug);

  return (
    <aside className="lg:col-span-3 space-y-6 sticky top-28">
      {/* Service Switcher Box */}
      <GlassCard className="p-4 border-slate-800 bg-slate-950/70">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
          Pilih Layanan Docs:
        </label>
        <div className="space-y-1.5">
          {allServices.map((srv) => (
            <Link
              key={srv.slug}
              href={`/docs/${srv.slug}/tutorial/${allPosts.find((p) => p.serviceSlug === srv.slug)?.slug || 'setup-printer-thermal'}`}
              className={cn(
                'flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all',
                srv.slug === currentService.slug
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              )}
            >
              <span>{srv.title}</span>
              {srv.slug === currentService.slug && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
            </Link>
          ))}
        </div>
      </GlassCard>

      {/* Navigation Tree for Current Service */}
      <GlassCard className="p-5 border-slate-800 space-y-4 bg-slate-950/70">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 pb-2 border-b border-slate-800 font-mono uppercase tracking-wider">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Dokumentasi {currentService.title}</span>
        </div>

        <div className="space-y-3">
          {allCategories.map((cat) => {
            const catPosts = servicePosts.filter((p) => p.categorySlug === cat.slug);
            return (
              <div key={cat.id} className="space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block font-mono">
                  {cat.name}
                </span>
                {catPosts.length > 0 ? (
                  catPosts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/docs/${currentService.slug}/${cat.slug}/${p.slug}`}
                      className={cn(
                        'block text-xs py-1.5 px-2 rounded-lg font-medium transition-all truncate',
                        p.slug === post.slug
                          ? 'bg-indigo-500/20 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-2.5'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      )}
                    >
                      {p.title}
                    </Link>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-500 italic block pl-2">Belum ada artikel</span>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </aside>
  );
};
