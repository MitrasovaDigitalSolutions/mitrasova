import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { INITIAL_SERVICES, INITIAL_POSTS } from '@/lib/data';
import { BookOpen, ShoppingBag, Users, Server, Code, ArrowRight, FileText, ChevronRight } from 'lucide-react';

export const DocsHubContainer: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Users,
    Server,
    Code,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <SectionHeading
        badge="Service-Scoped Docs Hub"
        title="Portal Dokumentasi & Tutorial"
        gradientText="Terisolasi Per Layanan"
        description="Pilih layanan target Anda untuk membuka panduan khusus, langkah konfigurasi, dan rilis fitur terisolasi."
      />

      {/* Service Switcher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INITIAL_SERVICES.map((srv) => {
          const Icon = iconMap[srv.icon] || BookOpen;
          const servicePosts = INITIAL_POSTS.filter((p) => p.serviceSlug === srv.slug);

          return (
            <GlassCard key={srv.id} className="p-6 border-slate-800 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{srv.badge}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Artikel Tersedia:</p>
                  {servicePosts.length > 0 ? (
                    servicePosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/docs/${post.serviceSlug}/${post.categorySlug}/${post.slug}`}
                        className="block text-xs text-slate-300 hover:text-indigo-400 truncate py-0.5"
                      >
                        • {post.title}
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Dokumentasi umum & panduan awal</p>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800">
                <Link href={`/docs/${srv.slug}/tutorial/${servicePosts[0]?.slug || 'setup-printer-thermal'}`}>
                  <AppButton variant="outline" size="sm" className="w-full" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                    Buka Docs {srv.title}
                  </AppButton>
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Featured Articles Section */}
      <section className="space-y-6 pt-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-400" />
          <span>Artikel Dokumentasi Terbaru</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_POSTS.map((post) => (
            <GlassCard key={post.id} className="p-6 border-slate-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20">
                    {post.categoryName}
                  </span>
                  <span className="text-slate-400">{post.readTime}</span>
                </div>

                <h4 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                  <Link href={`/docs/${post.serviceSlug}/${post.categorySlug}/${post.slug}`}>
                    {post.title}
                  </Link>
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">{post.summary}</p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Ditulis oleh: {post.authorName}</span>
                  <Link
                    href={`/docs/${post.serviceSlug}/${post.categorySlug}/${post.slug}`}
                    className="text-cyan-400 font-medium hover:underline flex items-center gap-1"
                  >
                    <span>Baca Selengkapnya</span>
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
