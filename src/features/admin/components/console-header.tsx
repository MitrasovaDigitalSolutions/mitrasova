'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Plus, ExternalLink, LogOut, LayoutDashboard } from 'lucide-react';
import { APP_VERSION } from '@/lib/version';
import { MitrasovaLogo } from '@/components/shared';
import { cn } from '@/lib/utils';

export const ConsoleHeader: React.FC = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/console/login';

  if (isLoginPage) {
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/console/login' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 border-b border-slate-800/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Console Title */}
          <div className="flex items-center gap-4">
            <Link href="/console" className="flex items-center gap-2.5 group">
              <MitrasovaLogo size={32} />
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">
                  MITRASOVA
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/30">
                  CONSOLE
                </span>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-800 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CORE v{APP_VERSION} ONLINE</span>
            </div>
          </div>

          {/* Navigation & Quick Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/console"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors',
                pathname === '/console'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              href="/console/posts/new"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors',
                pathname === '/console/posts/new'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900'
              )}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Post</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
              title="Buka Website Publik di Tab Baru"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Live Site</span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors cursor-pointer ml-2"
              title="Keluar dari sesi console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
