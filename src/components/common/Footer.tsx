import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Shield, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
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
                <span className="font-extrabold text-xl tracking-tight text-white">MITRASOVA</span>
                <p className="text-[10px] tracking-widest text-cyan-400 font-semibold uppercase">Digital Solutions</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Mitrasova Digital Solutions adalah penyedia teknologi enterprise terdepan. Kami menghadirkan ekosistem perangkat lunak POS, HRIS, High-Availability Cloud Server, & Custom Web Engineering.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                System Status: All Operational
              </span>
            </div>
          </div>

          {/* Product Suite */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Ekosistem Produk</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/layanan/mitrasova-pos" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                  Mitrasova POS
                </Link>
              </li>
              <li>
                <Link href="/layanan/mitrasova-daya" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                  Mitrasova Daya (HRIS)
                </Link>
              </li>
              <li>
                <Link href="/layanan/mitrasova-nexus" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                  Mitrasova Nexus (Cloud)
                </Link>
              </li>
              <li>
                <Link href="/layanan/mitrasova-labs" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                  Mitrasova Labs (Web Dev)
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Pusat Dokumentasi</h4>
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

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Jakarta Digital Hub, Level 18, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>hello@mitrasova.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+62 21 8062 9900</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Mitrasova Digital Solutions. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-slate-400">Syarat & Ketentuan</Link>
            <Link href="/security" className="hover:text-slate-400">Keamanan Cloud</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
