import React from 'react';
import Link from 'next/link';
import { APP_VERSION } from '@/lib/version';
import { SEO_DEFAULTS } from '@/lib/seo';
import { ArrowRight, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="font-black text-white text-xl">M</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-white">MITRASOVA</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-cyan-300 font-mono text-[10px] font-bold border border-indigo-500/20">
                    v{APP_VERSION}
                  </span>
                </div>
                <p className="text-[10px] tracking-widest text-cyan-400 font-semibold uppercase">Digital Solutions</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Mitrasova Digital Solutions adalah penyedia teknologi dan rekayasa perangkat lunak. Kami menghadirkan ekosistem POS Kasir, HRIS & Payroll, Managed Cloud Server, Custom Web & Mobile App Development.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SEO_DEFAULTS.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mitrasova LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.62 1.62 0 0 0-1.62 1.63c0 .9.73 1.63 1.62 1.63.9 0 1.63-.73 1.63-1.63A1.63 1.63 0 0 0 7.83 6.2Z" />
                </svg>
              </a>
              <a
                href={SEO_DEFAULTS.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mitrasova Facebook"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12Z" />
                </svg>
              </a>
              <a
                href={SEO_DEFAULTS.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mitrasova Instagram"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Suite */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4 font-mono">Ekosistem Produk</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/layanan/mitrasova-pos" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  Mitrasova POS
                </Link>
              </li>
              <li>
                <Link href="/layanan/mitrasova-daya" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  Mitrasova Daya (HRIS)
                </Link>
              </li>
              <li>
                <Link href="/layanan/mitrasova-nexus" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  Mitrasova Nexus (Cloud)
                </Link>
              </li>
              <li>
                <Link href="/layanan/mitrasova-labs" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  Mitrasova Labs (Web & App)
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4 font-mono">Pusat Dokumentasi</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/docs/mitrasova-pos" className="hover:text-cyan-400 transition-colors">
                  Tutorial & Setup POS
                </Link>
              </li>
              <li>
                <Link href="/docs/mitrasova-daya" className="hover:text-cyan-400 transition-colors">
                  Panduan Payroll & HRIS
                </Link>
              </li>
              <li>
                <Link href="/docs/mitrasova-nexus" className="hover:text-cyan-400 transition-colors">
                  Release Notes Cloud Server
                </Link>
              </li>
              <li>
                <Link href="/docs/mitrasova-labs" className="hover:text-cyan-400 transition-colors">
                  Dokumentasi Integrasi API
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4 font-mono">Hubungi Kami</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{SEO_DEFAULTS.location.formattedAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:hello@mitrasova.com" className="hover:text-white transition-colors">
                  hello@mitrasova.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {currentYear} Mitrasova Digital Solutions v{APP_VERSION}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <Link href="/layanan" className="hover:text-slate-400">Layanan</Link>
            <Link href="/konsultasi" className="hover:text-slate-400">Konsultasi</Link>
            <Link href="/docs" className="hover:text-slate-400">Dokumentasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
