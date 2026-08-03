import React from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { INITIAL_SERVICES, INITIAL_POSTS } from '@/lib/data';
import { Layers, FileText, Users, Eye } from 'lucide-react';

export const AdminMetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <GlassCard className="p-6 border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Layanan</span>
          <Layers className="w-5 h-5 text-indigo-400" />
        </div>
        <p className="text-3xl font-bold text-white mt-2">{INITIAL_SERVICES.length}</p>
        <span className="text-xs text-cyan-400 font-medium">POS, HRIS, Cloud, Labs</span>
      </GlassCard>

      <GlassCard className="p-6 border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold uppercase">Artikel Docs</span>
          <FileText className="w-5 h-5 text-cyan-400" />
        </div>
        <p className="text-3xl font-bold text-white mt-2">{INITIAL_POSTS.length}</p>
        <span className="text-xs text-indigo-400 font-medium">Status: Published</span>
      </GlassCard>

      <GlassCard className="p-6 border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold uppercase">Inquiry Konsultasi</span>
          <Users className="w-5 h-5 text-emerald-400" />
        </div>
        <p className="text-3xl font-bold text-white mt-2">18</p>
        <span className="text-xs text-emerald-400 font-medium">+5 Masuk Minggu Ini</span>
      </GlassCard>

      <GlassCard className="p-6 border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Views Docs</span>
          <Eye className="w-5 h-5 text-purple-400" />
        </div>
        <p className="text-3xl font-bold text-white mt-2">12,450</p>
        <span className="text-xs text-purple-400 font-medium">+14% dibanding bulan lalu</span>
      </GlassCard>
    </div>
  );
};
