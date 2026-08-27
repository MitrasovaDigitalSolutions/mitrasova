'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'compact';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = 'pill',
}) => {
  const { locale, setLocale } = useTranslation();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setLocale(locale === 'id' ? 'en' : 'id')}
        aria-label={`Ganti bahasa ke ${locale === 'id' ? 'English' : 'Bahasa Indonesia'}`}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer',
          className
        )}
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span className="uppercase">{locale}</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Pilih Bahasa / Select Language"
      className={cn(
        'inline-flex items-center p-1 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLocale('id')}
        className={cn(
          'px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer select-none',
          locale === 'id'
            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        )}
        title="Bahasa Indonesia"
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => setLocale('en')}
        className={cn(
          'px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer select-none',
          locale === 'en'
            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        )}
        title="English"
      >
        EN
      </button>
    </div>
  );
};
