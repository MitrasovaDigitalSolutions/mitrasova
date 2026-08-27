'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';
import { AppButton } from '@/components/shared';
import { PostItem } from '@/types';

export interface DeletePostDialogProps {
  post: PostItem | null;
  isOpen: boolean;
  isDeleting: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export const DeletePostDialog: React.FC<DeletePostDialogProps> = ({
  post,
  isOpen,
  isDeleting,
  error,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          onClick={!isDeleting ? onClose : undefined}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-black relative z-10 space-y-5 overflow-hidden"
        >
          {/* Top subtle alert accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Hapus Publikasi</h3>
                <p className="text-xs text-slate-400 font-mono">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              {post.categoryName}
            </span>
            <p className="text-sm font-semibold text-slate-200 line-clamp-2">
              &quot;{post.title}&quot;
            </p>
            <span className="text-[11px] font-mono text-slate-400 block truncate">
              Slug: /blog/{post.slug}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Apakah Anda yakin ingin menghapus konten ini dari basis data publikasi? Konten tidak akan
            dapat diakses lagi di website publik.
          </p>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
            <AppButton
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isDeleting}
            >
              Batal
            </AppButton>
            <button
              type="button"
              onClick={onConfirmDelete}
              disabled={isDeleting}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menghapus...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Konfirmasi Hapus</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
