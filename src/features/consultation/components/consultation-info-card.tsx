'use client';

import React from 'react';
import { GlassCard } from '@/components/shared';
import { SEO_DEFAULTS } from '@/lib/seo';
import { useTranslation } from '@/lib/i18n';
import { Mail, Clock, CheckCircle, MapPin } from 'lucide-react';

export const ConsultationInfoCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <GlassCard className="p-8 border-slate-800 space-y-6 bg-slate-950/80">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            {t('consultation.infoCard.cardTitle')}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t('consultation.infoCard.cardDesc')}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">{t('consultation.infoCard.officeLocation')}</p>
              <p className="text-slate-400">{SEO_DEFAULTS.location.formattedAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">{t('consultation.infoCard.fastResponse')}</p>
              <p className="text-slate-400">{t('consultation.infoCard.fastResponseDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">{t('consultation.infoCard.officialEmail')}</p>
              <p className="text-slate-400">hello@mitrasova.com</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>{t('consultation.infoCard.ndaGuarantee')}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {t('consultation.infoCard.ndaDesc')}
          </p>
        </div>
      </GlassCard>
    </div>
  );
};
