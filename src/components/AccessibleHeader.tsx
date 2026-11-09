"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { GlossaryModal } from '@/components/GlossaryModal';
import { 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  LogOut,
  LogIn,
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  Target,
  History,
  FileText,
  HelpCircle,
  Settings,
  PieChart,
  ListFilter,
  BarChart2,
  Mail,
  UserCheck
} from 'lucide-react';

export const AccessibleHeader: React.FC = () => {
  const { profile, isAuthenticated, logout } = useClientData();
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/portfolio', label: 'My Portfolio', icon: Briefcase },
    { href: '/portfolio/holdings', label: 'Holding Details', icon: ListFilter },
    { href: '/portfolio/allocation', label: 'Asset Allocation', icon: PieChart },
    { href: '/portfolio/performance', label: 'Performance', icon: BarChart2 },
    { href: '/plan', label: 'My Plan', icon: Target },
    { href: '/activity', label: 'Audited Ledger', icon: History },
    { href: '/documents', label: 'Statements & Vault', icon: FileText },
    { href: '/help', label: 'Help & Concierge', icon: HelpCircle },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <header className="bg-wealth-navy-950 text-white border-b border-wealth-gold-500/20 sticky top-0 z-40 shadow-luxury backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Prestigious Brand Identity */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <Link 
                href="/dashboard"
                className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
                aria-label="Vicky Hernandez Private Wealth Home"
              >
                {/* Bespoke Private Wealth Monogram Crest */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-wealth-navy-900 to-wealth-navy-950 border border-wealth-gold-400/60 shadow-inner flex items-center justify-center relative group-hover:border-wealth-gold-300 transition-all shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-wealth-gold-500/30 flex items-center justify-center">
                    <span className="font-serif text-xs sm:text-sm font-bold tracking-tighter text-wealth-gold-300 group-hover:text-wealth-gold-200 transition-colors">
                      VH
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-sm sm:text-lg md:text-xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-white group-hover:text-wealth-gold-200 transition-colors uppercase leading-tight">
                    Vicky Hernandez
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.32em] text-wealth-gold-400 font-medium -mt-0.5">
                    Private Wealth
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Header Actions (hidden on mobile, shown on md+) */}
            <div className="hidden md:flex items-center gap-2.5 sm:gap-3.5">
              
              {/* Financial Glossary Button */}
              <button
                type="button"
                onClick={() => setIsGlossaryOpen(true)}
                className="btn-touch px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-wealth-navy-900/90 border border-wealth-navy-700 hover:border-wealth-gold-400/50 hover:text-white transition-all flex items-center gap-2"
                title="Open Plain-English Financial Terms Dictionary"
              >
                <BookOpen className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                <span className="font-sans">Dictionary</span>
              </button>

              {/* Verified Institutional Custody Pill */}
              <div 
                className="btn-touch px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                title="Live Custodian Connection via Northern Trust Global Custody"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="hidden lg:inline font-normal text-emerald-300/80">Custodian:</span>
                <span className="font-semibold text-emerald-200">Northern Trust</span>
              </div>

              {/* Dedicated Adviser Phone Link */}
              <a
                href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
                className="btn-touch px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-wealth-gold-600 via-wealth-gold-500 to-wealth-gold-600 text-wealth-navy-950 hover:brightness-105 transition-all flex items-center gap-1.5 shadow-sm border border-wealth-gold-300/40"
                title={`Call Lead Adviser ${profile.adviserName}`}
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden lg:inline">Adviser Hotline</span>
              </a>

              {/* Authentication Status / Sign Out Action */}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="btn-touch px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-wealth-navy-900/80 border border-wealth-navy-700 hover:bg-red-950/80 hover:text-red-200 hover:border-red-600 transition-all flex items-center gap-1.5"
                  title="Sign out of portal session"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="btn-touch px-3.5 py-1.5 rounded-lg text-xs font-semibold text-wealth-gold-300 bg-wealth-navy-900 border border-wealth-gold-500/50 hover:bg-wealth-gold-500 hover:text-wealth-navy-950 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sign In</span>
                </Link>
              )}

            </div>

            {/* Mobile Header Actions (visible on mobile only, < md) */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
              
              {/* Custodian Live Status Dot */}
              <div 
                className="px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 border bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                title="Live Northern Trust Custody"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider">NT Live</span>
              </div>

              {/* Tap to Call Lead Adviser */}
              <a
                href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
                className="btn-touch p-2 sm:px-2.5 rounded-lg text-wealth-navy-950 bg-gradient-to-r from-wealth-gold-400 to-wealth-gold-500 hover:brightness-105 shadow-sm border border-wealth-gold-300 flex items-center justify-center"
                aria-label={`Call Lead Adviser ${profile.adviserName}`}
                title="Call Adviser Hotline"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
              </a>

              {/* Mobile Drawer Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn-touch p-2 rounded-lg bg-wealth-navy-900 border border-wealth-navy-700 text-slate-200 hover:text-white hover:border-wealth-gold-500/50 transition-all flex items-center justify-center"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-wealth-gold-400" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-200" aria-hidden="true" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 md:hidden flex justify-end"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-wealth-navy-950 text-white border-l border-wealth-gold-500/30 shadow-2xl h-full flex flex-col justify-between overflow-y-auto z-10">
            
            {/* Drawer Top Header */}
            <div>
              <div className="p-4 border-b border-wealth-navy-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-wealth-navy-900 border border-wealth-gold-400/60 flex items-center justify-center">
                    <span className="font-serif text-xs font-bold text-wealth-gold-300">VH</span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold tracking-wider text-white uppercase">Vicky Hernandez</p>
                    <p className="text-[10px] text-wealth-gold-400 uppercase tracking-widest">Private Wealth</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-wealth-navy-900"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Verified Account Identifier Card */}
              <div className="p-4 mx-4 mt-4 rounded-xl bg-wealth-navy-900/90 border border-wealth-gold-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Northern Trust Live Custody</span>
                </div>
                <p className="text-slate-300">Account: <strong>{profile.accountNumberMasked}</strong></p>
                <p className="text-slate-400 text-[11px] mt-0.5 truncate">{profile.fullName} Revocable Trust</p>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Mobile Drawer Navigation" className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`btn-touch w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-between border ${
                        isActive
                          ? 'bg-wealth-gold-500 text-wealth-navy-950 border-wealth-gold-400 shadow-sm'
                          : 'text-slate-300 border-transparent hover:bg-wealth-navy-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-wealth-navy-950' : 'text-wealth-gold-400'}`} aria-hidden="true" />
                        <span>{link.label}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-wealth-navy-950" />}
                    </Link>
                  );
                })}

                {/* Financial Dictionary Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsGlossaryOpen(true);
                  }}
                  className="btn-touch w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-slate-300 hover:bg-wealth-navy-900 hover:text-white transition-all flex items-center gap-3 border border-transparent mt-2"
                >
                  <BookOpen className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                  <span>Financial Dictionary</span>
                </button>
              </nav>
            </div>

            {/* Drawer Footer: Lead Adviser Direct Contact & Sign Out */}
            <div className="p-4 border-t border-wealth-navy-800 space-y-3">
              <div className="bg-wealth-navy-900/60 p-3 rounded-xl border border-wealth-navy-800">
                <p className="text-[10px] uppercase font-bold tracking-wider text-wealth-gold-400 mb-1">
                  Dedicated Lead Adviser
                </p>
                <p className="text-xs font-bold text-white">{profile.adviserName}</p>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
                    className="btn-touch flex-1 py-1.5 px-2 bg-wealth-gold-500 text-wealth-navy-950 rounded-md text-[11px] font-bold text-center justify-center flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${profile.adviserEmail}`}
                    className="btn-touch flex-1 py-1.5 px-2 bg-wealth-navy-800 text-slate-200 border border-wealth-navy-700 rounded-md text-[11px] font-medium text-center justify-center flex items-center gap-1 hover:text-white"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="btn-touch w-full py-2.5 px-3 bg-red-950/60 border border-red-700/50 text-red-200 hover:bg-red-900/80 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  <span>Sign Out of Portal</span>
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-touch w-full py-2.5 px-3 bg-wealth-gold-500 text-wealth-navy-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Financial Glossary Modal */}
      <GlossaryModal 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)} 
      />
    </>
  );
};
