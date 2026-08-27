'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Share2, X as CloseIcon } from 'lucide-react';
import {
  FaWhatsapp,
  FaXTwitter,
  FaLinkedinIn,
  FaTelegram,
  FaRegEnvelope,
} from 'react-icons/fa6';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export interface SocialShareMenuProps {
  title: string;
  summary?: string;
  className?: string;
}

export const SocialShareMenu: React.FC<SocialShareMenuProps> = ({
  title,
  summary = '',
  className = '',
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : '';
  };

  const handleCopy = () => {
    const url = getShareUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareWhatsApp = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`${title}\n`);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  const shareX = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareTelegram = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const shareEmail = () => {
    const url = getShareUrl();
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${summary}\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Quick WhatsApp Action with React-Icons */}
      <button
        type="button"
        onClick={shareWhatsApp}
        title="Bagikan ke WhatsApp"
        aria-label="Bagikan ke WhatsApp"
        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center justify-center min-h-[40px] min-w-[40px]"
      >
        <FaWhatsapp className="w-4 h-4 text-emerald-400" />
      </button>

      {/* Quick X (Twitter) Action with React-Icons */}
      <button
        type="button"
        onClick={shareX}
        title="Bagikan ke X (Twitter)"
        aria-label="Bagikan ke X"
        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-center min-h-[40px] min-w-[40px]"
      >
        <FaXTwitter className="w-3.5 h-3.5" />
      </button>

      {/* Quick Salin Tautan (Copy Link) with Copy Icon */}
      <button
        type="button"
        onClick={handleCopy}
        title={t('blog.share.copyLink')}
        className={cn(
          'px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer min-h-[40px]',
          copied
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80'
        )}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? t('blog.share.copied') : t('blog.share.copyLink')}</span>
      </button>

      {/* Open Share Modal (Icon Share2) */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        title={t('blog.share.shareModalTitle')}
        aria-label={t('blog.share.shareModalTitle')}
        className="p-2.5 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-cyan-300 hover:text-white hover:bg-indigo-600/30 transition-all cursor-pointer flex items-center justify-center min-h-[40px] min-w-[40px]"
      >
        <Share2 className="w-4 h-4 text-cyan-400" />
      </button>

      {/* Share Modal Dialog Popover */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/90 space-y-6 relative overflow-hidden"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500" />

              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-cyan-400">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{t('blog.share.shareModalTitle')}</h3>
                    <p className="text-xs text-slate-400">{t('blog.share.shareModalDesc')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Social Channels Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    shareWhatsApp();
                    setModalOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/30 text-slate-200 hover:text-emerald-400 transition-all cursor-pointer text-xs font-semibold"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <FaWhatsapp className="w-4 h-4" />
                  </div>
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    shareX();
                    setModalOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-all cursor-pointer text-xs font-semibold"
                >
                  <div className="p-2 rounded-lg bg-slate-800 text-white">
                    <FaXTwitter className="w-4 h-4" />
                  </div>
                  <span>X (Twitter)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    shareLinkedIn();
                    setModalOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/30 text-slate-200 hover:text-indigo-300 transition-all cursor-pointer text-xs font-semibold"
                >
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <FaLinkedinIn className="w-4 h-4" />
                  </div>
                  <span>LinkedIn</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    shareTelegram();
                    setModalOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 text-slate-200 hover:text-cyan-300 transition-all cursor-pointer text-xs font-semibold"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <FaTelegram className="w-4 h-4" />
                  </div>
                  <span>Telegram</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    shareEmail();
                    setModalOpen(false);
                  }}
                  className="col-span-2 flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-purple-500/10 border border-slate-800 hover:border-purple-500/30 text-slate-200 hover:text-purple-300 transition-all cursor-pointer text-xs font-semibold"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <FaRegEnvelope className="w-4 h-4" />
                  </div>
                  <span>{t('blog.share.sendEmail')}</span>
                </button>
              </div>

              {/* Direct Copy URL Section */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-400">{t('blog.share.copyFullUrl')}</span>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <input
                    type="text"
                    readOnly
                    value={getShareUrl()}
                    className="w-full bg-transparent text-xs text-slate-300 font-mono outline-none truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t('blog.share.copied') : t('blog.share.copyLink')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
