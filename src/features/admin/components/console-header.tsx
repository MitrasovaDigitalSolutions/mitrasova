'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Plus, ExternalLink, LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { APP_VERSION } from '@/lib/version';
import { MitrasovaLogo, LanguageSwitcher } from '@/components/shared';
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

  const isPostsSection = pathname.startsWith('/console/posts');
  const isNewPostPage = pathname === '/console/posts/new';

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Console Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/console" className="flex items-center gap-2.5 group">
              <MitrasovaLogo size={32} className="group-hover:scale-105 transition-transform" />
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight group-hover:text-cyan-300 transition-colors">
                  MITRASOVA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/30">
                  CONSOLE
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CORE v{APP_VERSION} ONLINE</span>
            </div>
          </div>

          {/* Navigation & Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/console"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all',
                pathname === '/console'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              href="/console/posts/new"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all',
                isNewPostPage
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-900 border border-transparent'
              )}
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>New Post</span>
            </Link>

            {isPostsSection && !isNewPostPage && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono">
                <FileText className="w-3 h-3 text-cyan-400" />
                <span>Editor</span>
              </div>
            )}

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent transition-colors"
              title="Buka Website Publik di Tab Baru"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Live Site</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" />

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all cursor-pointer ml-1"
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
