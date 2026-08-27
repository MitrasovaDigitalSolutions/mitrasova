'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AppButton } from './app-button';
import { MitrasovaLogo } from './mitrasova-logo';
import { LanguageSwitcher } from './language-switcher';
import { useTranslation } from '@/lib/i18n';
import {
  ShieldCheck,
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  ShoppingBag,
  Users,
  Server,
  Code,
  Newspaper,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(true);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t, dict } = useTranslation();
  const srvItems = dict.services.items;

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const saasProducts = [
    {
      title: srvItems['mitrasova-pos']?.title || 'Mitrasova POS',
      tagline: srvItems['mitrasova-pos']?.heroTagline || 'Kasir Offline-First, Konsinyasi & Akuntansi',
      badge: srvItems['mitrasova-pos']?.badge || 'Offline POS & Konsinyasi',
      href: '/product/mitrasova-pos',
      icon: ShoppingBag,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      title: srvItems['mitrasova-daya']?.title || 'Mitrasova Daya',
      tagline: srvItems['mitrasova-daya']?.heroTagline || 'HRIS, Presensi Geolocation & Payroll TER',
      badge: srvItems['mitrasova-daya']?.badge || 'HRIS & Payroll Enterprise',
      href: '/product/mitrasova-daya',
      icon: Users,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
  ];

  const infraProducts = [
    {
      title: srvItems['mitrasova-nexus']?.title || 'Mitrasova Nexus',
      tagline: srvItems['mitrasova-nexus']?.heroTagline || 'Tier-4 Managed Cloud & DDoS Protection',
      badge: srvItems['mitrasova-nexus']?.badge || 'Tier-4 Managed Cloud',
      href: '/product/mitrasova-nexus',
      icon: Server,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: srvItems['mitrasova-labs']?.title || 'Mitrasova Labs',
      tagline: srvItems['mitrasova-labs']?.heroTagline || 'Custom Software, Mobile App & API Gateway',
      badge: srvItems['mitrasova-labs']?.badge || 'Enterprise Engineering',
      href: '/product/mitrasova-labs',
      icon: Code,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  const isProductActive = pathname.startsWith('/product');

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <MitrasovaLogo size={40} className="shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                MITRASOVA
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400 font-semibold uppercase -mt-1">
                Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/70 p-1.5 rounded-full border border-slate-800/90 backdrop-blur-md">
            {/* Beranda */}
            <Link
              href="/"
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors',
                pathname === '/'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('navbar.home')}</span>
            </Link>

            {/* Produk & Solusi (Mega Menu Trigger) */}
            <div
              ref={megaMenuRef}
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer',
                  isProductActive || megaMenuOpen
                    ? 'bg-indigo-600/30 text-cyan-300 font-semibold border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                )}
              >
                <span>{t('navbar.products')}</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200',
                    megaMenuOpen && 'rotate-180 text-cyan-400'
                  )}
                />
              </button>

              {/* Mekari-Style Mega Menu Dropdown */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px]"
                  >
                    <div className="p-6 rounded-2xl bg-slate-950/95 border border-slate-800/90 shadow-2xl shadow-black/80 backdrop-blur-2xl grid grid-cols-12 gap-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500" />

                      {/* Left: SaaS Apps */}
                      <div className="col-span-6 space-y-3">
                        <div className="pb-1 border-b border-slate-800/80 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                            {t('navbar.megaMenu.saasTitle')}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {saasProducts.map((p) => {
                            const Icon = p.icon;
                            return (
                              <Link
                                key={p.href}
                                href={p.href}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900/80 border border-transparent hover:border-slate-800 transition-all group"
                              >
                                <div className={cn('p-2 rounded-lg shrink-0 mt-0.5 border', p.color)}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                                      {p.title}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-medium bg-slate-800 text-slate-300">
                                      {p.badge}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-snug">
                                    {p.tagline}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Cloud & Engineering */}
                      <div className="col-span-6 space-y-3">
                        <div className="pb-1 border-b border-slate-800/80 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                            {t('navbar.megaMenu.infraTitle')}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {infraProducts.map((p) => {
                            const Icon = p.icon;
                            return (
                              <Link
                                key={p.href}
                                href={p.href}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900/80 border border-transparent hover:border-slate-800 transition-all group"
                              >
                                <div className={cn('p-2 rounded-lg shrink-0 mt-0.5 border', p.color)}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                                      {p.title}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-medium bg-slate-800 text-slate-300">
                                      {p.badge}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-snug">
                                    {p.tagline}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom Banner Callout */}
                      <div className="col-span-12 pt-3 border-t border-slate-800/80 flex items-center justify-between bg-slate-900/50 -mx-6 -mb-6 p-4 px-6 rounded-b-2xl">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{t('navbar.megaMenu.integratedNote')}</span>
                        </div>
                        <Link href="/konsultasi">
                          <span className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
                            <span>{t('navbar.megaMenu.demoCardBtn')}</span>
                            <ArrowRight className="w-3 h-3 text-cyan-400" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog & Kabar */}
            <Link
              href="/blog"
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors',
                pathname.startsWith('/blog')
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              )}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>{t('navbar.blog')}</span>
            </Link>
          </nav>

          {/* Desktop Actions & Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/konsultasi">
              <AppButton variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                {t('navbar.startConsultation')}
              </AppButton>
            </Link>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher variant="compact" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Accordion */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Beranda */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
              pathname === '/'
                ? 'bg-indigo-600/20 text-cyan-300 font-semibold border border-indigo-500/30'
                : 'text-slate-200 hover:bg-slate-900'
            )}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>{t('navbar.home')}</span>
          </Link>

          {/* Produk & Solusi Accordion */}
          <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/30">
            <button
              type="button"
              onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>{t('navbar.products')}</span>
              </div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-slate-400 transition-transform duration-200',
                  mobileAccordionOpen && 'rotate-180 text-cyan-400'
                )}
              />
            </button>

            {mobileAccordionOpen && (
              <div className="px-3 pb-3 space-y-1.5 border-t border-slate-800/80 pt-2">
                {[...saasProducts, ...infraProducts].map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-xs font-medium text-slate-200"
                    >
                      <div className={cn('p-1.5 rounded-md border', p.color)}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{p.title}</span>
                        <span className="text-[10px] text-slate-400">{p.tagline}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Blog & Kabar */}
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
              pathname.startsWith('/blog')
                ? 'bg-indigo-600/20 text-cyan-300 font-semibold border border-indigo-500/30'
                : 'text-slate-200 hover:bg-slate-900'
            )}
          >
            <Newspaper className="w-4 h-4 text-cyan-400" />
            <span>{t('navbar.blog')}</span>
          </Link>

          {/* Mobile CTA */}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/konsultasi" onClick={() => setMobileMenuOpen(false)}>
              <AppButton variant="primary" size="md" className="w-full justify-center">
                {t('navbar.startConsultation')}
              </AppButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
