import React from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { ShieldCheck, Clock, Mail, Phone } from 'lucide-react';

export const ConsultationInfoCard: React.FC = () => {
  return (
    <GlassCard className="p-8 border-indigo-500/30 space-y-6">
      <h3 className="text-2xl font-bold text-white">Mengapa Berkonsultasi dengan Mitrasova?</h3>

      <div className="space-y-4 text-xs text-slate-300">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Analisis Arsitektur Tanpa Biaya</h4>
            <p className="mt-0.5 text-slate-400">Tim kami menganalisis infrastruktur & alur operasional Anda secara cuma-cuma.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Respon Instan 1x24 Jam</h4>
            <p className="mt-0.5 text-slate-400">Jadwal demo langsung dan konsultasi teknis dijadwalkan secara fleksibel.</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 space-y-3 text-xs">
        <div className="flex items-center gap-3 text-slate-300">
          <Mail className="w-4 h-4 text-indigo-400" />
          <span>hello@mitrasova.com</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <Phone className="w-4 h-4 text-indigo-400" />
          <span>+62 21 8062 9900</span>
        </div>
      </div>
    </GlassCard>
  );
};
