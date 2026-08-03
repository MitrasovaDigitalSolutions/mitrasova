'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { INITIAL_SERVICES, INITIAL_POSTS } from '@/lib/data';
import { Layers, FileText, Users, Eye } from 'lucide-react';

export const AdminMetricsGrid: React.FC = () => {
  const metrics = [
    {
      title: 'Total Layanan',
      value: INITIAL_SERVICES.length,
      subtext: 'POS, HRIS, Cloud, Labs',
      icon: Layers,
      color: 'text-indigo-400',
      border: 'hover:border-indigo-500/50',
    },
    {
      title: 'Artikel Docs',
      value: INITIAL_POSTS.length,
      subtext: 'Status: Published',
      icon: FileText,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
    },
    {
      title: 'Inquiry Konsultasi',
      value: 18,
      subtext: '+5 Masuk Minggu Ini',
      icon: Users,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
    },
    {
      title: 'Total Views Docs',
      value: '12,450',
      subtext: '+14% dibanding bulan lalu',
      icon: Eye,
      color: 'text-purple-400',
      border: 'hover:border-purple-500/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => {
        const IconComponent = metric.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <GlassCard className={`p-6 border-slate-800/90 ${metric.border} transition-all duration-300 relative group`}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono font-semibold uppercase">{metric.title}</span>
                <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${metric.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black font-mono text-white mt-3 tracking-tight">{metric.value}</p>
              <span className={`text-xs font-medium mt-1 block ${metric.color}`}>{metric.subtext}</span>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};
