'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AdminPostsTable } from './admin-posts-table';
import { APP_VERSION } from '@/lib/version';
import { Plus, Terminal, Activity, Database, Sparkles, Layers } from 'lucide-react';
import { usePostsQuery } from '../api/posts-api';

export const AdminDashboardContainer: React.FC = () => {
  const { data: posts = [], isLoading } = usePostsQuery();

  const articleCount = posts.filter((p) => p.categorySlug === 'wawasan-blog').length;
  const newsCount = posts.filter((p) => p.categorySlug === 'berita-media').length;
  const eventCount = posts.filter((p) => p.categorySlug === 'event-agenda').length;
  const releaseCount = posts.filter((p) => p.categorySlug === 'rilis-produk').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/4 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Command Center Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6 relative z-10"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-semibold border border-cyan-500/20 flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              <span>CORE v{APP_VERSION}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CMS ENGINE READY</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Editorial Command Center
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Sistem manajemen konten dan publikasi terpadu untuk Wawasan & Blog, Siaran Berita, Agenda Acara, serta Catatan Rilis Mitrasova.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/console/posts/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Postingan Baru</span>
          </Link>
        </div>
      </motion.div>

      {/* Telemetry Bar (Linear-style dense HUD stats) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 backdrop-blur-md"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {/* Stat 1 */}
          <div className="px-4 py-2 sm:py-0 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Total Publikasi
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {isLoading ? '...' : posts.length}
              </span>
              <span className="text-[11px] text-cyan-400 font-mono">Live di Web</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="px-4 py-2 sm:py-0 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Wawasan & Berita
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {isLoading ? '...' : `${articleCount + newsCount}`}
              </span>
              <span className="text-[11px] text-indigo-300 font-mono">
                {articleCount} Blog / {newsCount} Berita
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="px-4 py-2 sm:py-0 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Events & Rilis
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">
                {isLoading ? '...' : `${eventCount + releaseCount}`}
              </span>
              <span className="text-[11px] text-purple-300 font-mono">
                {eventCount} Event / {releaseCount} Rilis
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="px-4 py-2 sm:py-0 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Status Sinkronisasi
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-white font-mono">Real-time Cloud</span>
              <span className="text-[11px] text-emerald-400 font-mono">Terhubung</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main High-Density Posts Table Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <AdminPostsTable />
      </motion.div>
    </div>
  );
};
