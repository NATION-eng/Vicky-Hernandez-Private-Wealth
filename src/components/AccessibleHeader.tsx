"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import { GlossaryModal } from '@/components/GlossaryModal';
import { 
  ShieldCheck, 
  BookOpen, 
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
  UserCheck,
  Sun,
  Moon,
  Eye,
  ZapOff
} from 'lucide-react';

export const AccessibleHeader: React.FC = () => {
  const { profile, isAuthenticated, logout } = useClientData();
  const { settings, setTextSize, setContrastMode, toggleReducedMotion } = useAccessibility();
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
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Prestigious Brand Identity */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              <Link 
                href="/dashboard"
                className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
                aria-label="Vicky Hernandez Private Wealth Home"
              >
                {/* Bespoke Monogram Crest or Uploaded Profile Photo */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-wealth-navy-900 to-wealth-navy-950 border border-wealth-gold-400/60 shadow-inner flex items-center justify-center relative group-hover:border-wealth-gold-300 transition-all shrink-0 overflow-hidden">
                  {profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.preferredName} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border border-wealth-gold-500/30 flex items-center justify-center">
                      <span className="font-serif text-xs sm:text-sm font-bold tracking-tighter text-wealth-gold-300 group-hover:text-wealth-gold-200 transition-colors">
                        VH
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-[13.5px] sm:text-base md:text-xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-wealth-gold-400 group-hover:text-wealth-gold-200 transition-colors uppercase leading-tight whitespace-nowrap">
                    Vicky Hernandez
                  </span>
                  <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.26em] sm:tracking-[0.32em] text-wealth-gold-400 font-semibold -mt-0.5">
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
                className="btn-touch px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 bg-wealth-navy-900/90 border border-wealth-navy-700 hover:border-wealth-gold-400/50 hover:text-white transition-all flex items-center gap-2"
                title="Open Plain-English Financial Terms Dictionary"
              >
                <BookOpen className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                <span className="font-sans">Dictionary</span>
              </button>

              {/* Verified Institutional Custody Pill */}
              <div 
                className="btn-touch px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                title="Live Institutional Custody Connection"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="hidden lg:inline font-semibold text-emerald-300/80">Custodian:</span>
                <span className="font-bold text-emerald-200">Institutional Custody</span>
              </div>

              {/* Authentication Status / Sign Out Action */}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="btn-touch px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-wealth-navy-900/80 border border-wealth-navy-700 hover:bg-red-950/80 hover:text-red-200 hover:border-red-600 transition-all flex items-center gap-1.5"
                  title="Sign out of portal session"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="btn-touch px-3.5 py-1.5 rounded-lg text-xs font-bold text-wealth-gold-300 bg-wealth-navy-900 border border-wealth-gold-500/50 hover:bg-wealth-gold-500 hover:text-wealth-navy-950 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sign In</span>
                </Link>
              )}

            </div>

            {/* Mobile Header Actions (visible on mobile only, < md) */}
            <div className="flex md:hidden items-center gap-2">
              
              {/* Custodian Live Status Dot Pill */}
              <div 
                className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 border bg-emerald-950/70 border-emerald-500/30 text-emerald-300 shadow-xs"
                title="Live Institutional Custody"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase font-bold tracking-wider">Live</span>
              </div>

              {/* Mobile Drawer Hamburger Button - Refined Jewel Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn-touch w-9 h-9 rounded-full bg-wealth-navy-900 border border-wealth-navy-700 hover:border-wealth-gold-500/50 text-slate-200 active:scale-95 transition-all flex items-center justify-center shadow-xs"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                ) : (
                  <Menu className="w-4 h-4 text-slate-200" aria-hidden="true" />
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
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-[320px] sm:max-w-sm bg-wealth-navy-950 text-white border-l border-wealth-gold-500/30 shadow-2xl h-full flex flex-col justify-between overflow-y-auto z-10 overscroll-contain">
            
            {/* Drawer Top Header */}
            <div>
              <div className="p-4 border-b border-wealth-navy-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-wealth-navy-900 border border-wealth-gold-400/60 flex items-center justify-center overflow-hidden shrink-0">
                    {profile.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={profile.avatarUrl} alt={profile.preferredName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-serif text-xs font-bold text-wealth-gold-300">VH</span>
                    )}
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold tracking-wider text-wealth-gold-400 uppercase">{profile.fullName}</p>
                    <p className="text-[10px] text-wealth-gold-400 uppercase tracking-widest font-semibold">Private Wealth</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-wealth-navy-900 border border-wealth-navy-700 text-slate-300 hover:text-white hover:border-wealth-gold-500/40 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Verified Account Identifier Card (Only when authenticated) */}
              {isAuthenticated ? (
                <div className="p-3.5 mx-4 mt-3 rounded-xl bg-wealth-navy-900/90 border border-wealth-gold-500/20 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Live Custody</span>
                    </span>
                    <span className="text-wealth-gold-300 font-mono font-bold text-xs">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300 text-[11px] font-semibold">
                    <span>Account: <strong>{profile.accountNumberMasked}</strong></span>
                    <span className="text-slate-400 truncate max-w-[140px]">{profile.fullName} Revocable Trust</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 mx-4 mt-3 rounded-xl bg-wealth-navy-900/90 border border-wealth-gold-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Institutional Custody</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Institutional 256-Bit SSL Encrypted Gateway</p>
                </div>
              )}

              {/* Display & Accessibility Controls (WCAG 2.2 AA compliant for mobile) */}
              <div className="p-3.5 mx-4 mt-3 rounded-xl bg-wealth-navy-900/80 border border-wealth-navy-800 text-xs">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold tracking-wider text-wealth-gold-400 uppercase flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-wealth-gold-400" />
                    Display & Accessibility
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">WCAG 2.2 AA</span>
                </div>

                {/* Text Size Stepper */}
                <div className="mb-2.5">
                  <div className="grid grid-cols-3 gap-1 bg-wealth-navy-950 p-1 rounded-lg border border-wealth-navy-800">
                    <button
                      type="button"
                      onClick={() => setTextSize('standard')}
                      aria-pressed={settings.textSize === 'standard'}
                      className={`py-1 rounded text-[11px] font-bold transition-all text-center ${
                        settings.textSize === 'standard'
                          ? 'bg-wealth-gold-500 text-wealth-navy-950 shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      100%
                    </button>
                    <button
                      type="button"
                      onClick={() => setTextSize('large')}
                      aria-pressed={settings.textSize === 'large'}
                      className={`py-1 rounded text-[11px] font-bold transition-all text-center ${
                        settings.textSize === 'large'
                          ? 'bg-wealth-gold-500 text-wealth-navy-950 shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      125%
                    </button>
                    <button
                      type="button"
                      onClick={() => setTextSize('extra-large')}
                      aria-pressed={settings.textSize === 'extra-large'}
                      className={`py-1 rounded text-[11px] font-bold transition-all text-center ${
                        settings.textSize === 'extra-large'
                          ? 'bg-wealth-gold-500 text-wealth-navy-950 shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      150%
                    </button>
                  </div>
                </div>

                {/* Appearance / Contrast Controls */}
                <div className="grid grid-cols-3 gap-1 bg-wealth-navy-950 p-1 rounded-lg border border-wealth-navy-800 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setContrastMode('default')}
                    aria-pressed={settings.contrastMode === 'default'}
                    className={`py-1 rounded text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                      settings.contrastMode === 'default'
                        ? 'bg-wealth-gold-500 text-wealth-navy-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>Warm</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContrastMode('high-contrast')}
                    aria-pressed={settings.contrastMode === 'high-contrast'}
                    className={`py-1 rounded text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                      settings.contrastMode === 'high-contrast'
                        ? 'bg-white text-black font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Contrast</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContrastMode('dark')}
                    aria-pressed={settings.contrastMode === 'dark'}
                    className={`py-1 rounded text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                      settings.contrastMode === 'dark'
                        ? 'bg-wealth-gold-500 text-wealth-navy-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>Night</span>
                  </button>
                </div>

                {/* Reduced Motion Toggle */}
                <button
                  type="button"
                  onClick={toggleReducedMotion}
                  aria-pressed={settings.reducedMotion}
                  className={`w-full py-1.5 px-2 rounded-lg border flex items-center justify-between text-[11px] font-medium transition-all ${
                    settings.reducedMotion
                      ? 'bg-wealth-gold-500/20 border-wealth-gold-400 text-wealth-gold-200'
                      : 'bg-wealth-navy-950 border-wealth-navy-800 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <ZapOff className="w-3 h-3 text-wealth-gold-400" />
                    <span>Reduced Motion</span>
                  </span>
                  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    settings.reducedMotion ? 'bg-wealth-gold-500 text-wealth-navy-950' : 'bg-wealth-navy-800 text-slate-400'
                  }`}>
                    {settings.reducedMotion ? 'On' : 'Off'}
                  </span>
                </button>
              </div>

              {/* Navigation Links (Only when authenticated) */}
              {isAuthenticated ? (
                <nav aria-label="Mobile Drawer Navigation" className="p-4 space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isOverview = link.href === '/dashboard';
                    const isActive = isOverview
                      ? (pathname === '/' || pathname === '/dashboard')
                      : (pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href)));
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
              ) : (
                <div className="p-4 space-y-2">
                  <div className="p-3.5 rounded-xl bg-wealth-navy-900/60 border border-wealth-navy-800 text-xs text-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
                    <p className="text-white font-semibold">Private Client Portal</p>
                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                      Please sign in to access your portfolio, holdings, and vault.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer: Institutional Custody Status & Sign Out */}
            <div className="p-4 border-t border-wealth-navy-800 space-y-3">
              <div className="bg-wealth-navy-900/60 p-3 rounded-xl border border-wealth-navy-800">
                <p className="text-[10px] uppercase font-bold tracking-wider text-wealth-gold-400 mb-0.5">
                  Institutional Custodian
                </p>
                <p className="text-xs font-bold text-white">Institutional Global Custody</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Fiduciary Link
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tier-1 Custody</span>
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
