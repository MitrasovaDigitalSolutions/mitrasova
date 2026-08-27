import React from 'react';
import Link from 'next/link';
import { ServiceItem, PostItem } from '@/types';
import { GlassCard, AppButton } from '@/components/shared';
import { ShoppingBag, Users, Server, Code, BookOpen, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const DocsServiceCard: React.FC<{ service: ServiceItem; posts: PostItem[] }> = ({
  service,
  posts,
}) => {
  const Icon = iconMap[service.icon] || BookOpen;
  const servicePosts = posts.filter((p) => p.serviceSlug === service.slug);

  return (
    <GlassCard className="p-6 border-slate-800 flex flex-col justify-between group bg-slate-950/70">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
          <Icon className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{service.badge}</p>
        </div>

        <div className="pt-3 border-t border-slate-800/80 space-y-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Artikel Tersedia:
          </p>
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
        <Link href={`/docs/${service.slug}/tutorial/${servicePosts[0]?.slug || 'setup-printer-thermal'}`}>
          <AppButton variant="outline" size="sm" className="w-full justify-center" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
            Buka Docs {service.title}
          </AppButton>
        </Link>
      </div>
    </GlassCard>
  );
};
