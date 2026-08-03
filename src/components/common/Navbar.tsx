'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppButton } from './AppButton';
import { ShieldCheck, BookOpen, Layers, PhoneCall, Menu, X, ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda', icon: ShieldCheck },
    { href: '/layanan', label: 'Ekosistem Layanan', icon: Layers },
    { href: '/docs', label: 'Docs Hub', icon: BookOpen },
    { href: '/konsultasi', label: 'Konsultasi', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-black text-white text-xl tracking-tighter">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                MITRASOVA
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400 font-semibold uppercase -mt-1">
                Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin/login">
              <AppButton variant="outline" size="sm">
                Admin Portal
              </AppButton>
            </Link>
            <Link href="/konsultasi">
              <AppButton variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Mulai Konsultasi
              </AppButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-indigo-400"
              >
                <Icon className="w-4 h-4 text-indigo-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
              <AppButton variant="outline" size="md" className="w-full">
                Admin Portal
              </AppButton>
            </Link>
            <Link href="/konsultasi" onClick={() => setMobileMenuOpen(false)}>
              <AppButton variant="primary" size="md" className="w-full">
                Mulai Konsultasi
              </AppButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
