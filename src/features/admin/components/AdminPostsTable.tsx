import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/common/GlassCard';
import { INITIAL_POSTS } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export const AdminPostsTable: React.FC = () => {
  return (
    <GlassCard className="p-6 border-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white">Daftar Artikel & Documentation Hub</h3>
        <Link href="/admin/posts/new" className="text-xs text-indigo-400 font-medium hover:underline">
          + Tambah Postingan
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Judul Artikel</th>
              <th className="py-3 px-4">Layanan Target</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Penulis</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {INITIAL_POSTS.map((post) => (
              <tr key={post.id} className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">{post.title}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20">
                    {post.serviceSlug}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">{post.categoryName}</td>
                <td className="py-3 px-4 text-slate-400">{post.authorName}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                    Published
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/docs/${post.serviceSlug}/${post.categorySlug}/${post.slug}`}
                    className="text-cyan-400 hover:text-white font-medium inline-flex items-center gap-1"
                  >
                    <span>Lihat Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
