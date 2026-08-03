'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { INITIAL_POSTS } from '@/lib/data';
import { ArrowUpRight, Plus } from 'lucide-react';

export const AdminPostsTable: React.FC = () => {
  return (
    <GlassCard className="p-6 border-slate-800/90 space-y-4 relative overflow-hidden bg-slate-950/80">
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Daftar Artikel & Documentation Hub</h3>
          <p className="text-xs text-slate-400">Total {INITIAL_POSTS.length} postingan aktif di database</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="text-xs text-cyan-400 font-mono font-semibold hover:text-cyan-300 inline-flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Postingan</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono font-semibold">
              <th className="py-3.5 px-4">Judul Artikel</th>
              <th className="py-3.5 px-4">Layanan Target</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Penulis</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {INITIAL_POSTS.map((post, idx) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="hover:bg-slate-900/60 transition-colors group"
              >
                <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 font-mono font-medium border border-indigo-500/20">
                    {post.serviceSlug}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400">{post.categoryName}</td>
                <td className="py-3.5 px-4 text-slate-400">{post.authorName}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-semibold border border-emerald-500/20 inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Published
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/docs/${post.serviceSlug}/${post.categorySlug}/${post.slug}`}
                    className="text-cyan-400 hover:text-white font-medium inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 hover:border-cyan-500/40 transition-all"
                  >
                    <span>Lihat Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
