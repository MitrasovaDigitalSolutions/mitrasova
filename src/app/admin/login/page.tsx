'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, KeyRound, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { AppButton } from '@/components/common/AppButton';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@mitrasova.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg('Email atau password tidak valid. Silakan coba lagi.');
        setIsLoading(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi server.');
      setIsLoading(false);
    }
  };

  const handleFillPreset = (presetEmail: string, presetPass: string) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-cyber-dots">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card-rog rounded-2xl p-8 border border-slate-800/90 relative overflow-hidden space-y-6">
          {/* Cyber Corner Notches */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 z-20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 z-20" />

          {/* Top Glow Bar */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Header Badge & Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AUTHENTICATION GATEWAY v4.0</span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight glow-text-cyan">
              Portal Login Admin
            </h1>
            <p className="text-xs text-slate-400">
              Masuk untuk mengelola dokumentasi, artikel, & ekosistem Mitrasova.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Alamat Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mitrasova.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
              />
            </div>

            <AppButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center font-mono font-bold mt-2"
              disabled={isLoading}
              rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
            >
              {isLoading ? 'Mengautentikasi Sesi...' : 'Masuk ke Dashboard Admin'}
            </AppButton>
          </form>

          {/* Quick Preset Accounts Selection */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick Login Akun Demo (1-Click Fill):</span>
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleFillPreset('admin@mitrasova.com', 'admin123')}
                className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
              >
                <span className="text-[10px] font-mono font-bold text-indigo-400 block group-hover:text-indigo-300">
                  ADMIN
                </span>
                <span className="text-[10px] text-slate-400 truncate block">admin123</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillPreset('editor@mitrasova.com', 'editor123')}
                className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
              >
                <span className="text-[10px] font-mono font-bold text-cyan-400 block group-hover:text-cyan-300">
                  EDITOR
                </span>
                <span className="text-[10px] text-slate-400 truncate block">editor123</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillPreset('demo@mitrasova.com', 'demo123')}
                className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 text-left transition-all group"
              >
                <span className="text-[10px] font-mono font-bold text-purple-400 block group-hover:text-purple-300">
                  DEMO
                </span>
                <span className="text-[10px] text-slate-400 truncate block">demo123</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
