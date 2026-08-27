import React from 'react';
import { GlassCard } from '@/components/shared';
import { Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export const ConsultationInfoCard: React.FC = () => {
  return (
    <div className="space-y-6">
      <GlassCard className="p-8 border-slate-800 space-y-6 bg-slate-950/80">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Konsultasi Solusi Enterprise</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Diskusikan kebutuhan arsitektur sistem, custom software, integrasi API, atau deployment cloud berkinerja tinggi bersama tim engineer Mitrasova.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Respon Cepat 1x24 Jam</p>
              <p className="text-slate-400">Tim kami akan mengkaji kebutuhan Anda dan menjadwalkan sesi demo interaktif.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Email Resmi</p>
              <p className="text-slate-400">hello@mitrasova.com / enterprise@mitrasova.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Telepon / WhatsApp Hotline</p>
              <p className="text-slate-400">+62 21 8062 9900 / +62 811 9000 8822</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Garansi Kerahasiaan (NDA)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Setiap data proses bisnis dan dokumen spesifikasi dilindungi Non-Disclosure Agreement standar industri.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};
