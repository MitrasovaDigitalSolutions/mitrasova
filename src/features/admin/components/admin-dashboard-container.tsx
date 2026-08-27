'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppButton } from '@/components/shared';
import { AdminMetricsGrid } from './admin-metrics-grid';
import { AdminPostsTable } from './admin-posts-table';
import { APP_VERSION } from '@/lib/version';
import { Plus, Zap } from 'lucide-react';

export const AdminDashboardContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative pb-28">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/90 pb-6 relative z-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>CENTRAL COMMAND & MANAGEMENT SYSTEM v{APP_VERSION}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white glow-text-indigo">
            Dashboard Console Mitrasova
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Kelola Layanan, Kategori, & Service-Scoped Documentation Hub secara terpusat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/console/posts/new">
            <AppButton variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
              Buat Artikel Docs Baru
            </AppButton>
          </Link>
        </div>
      </motion.div>

      {/* Animated Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <AdminMetricsGrid />
      </motion.div>

      {/* Animated Posts Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <AdminPostsTable />
      </motion.div>
    </div>
  );
};
