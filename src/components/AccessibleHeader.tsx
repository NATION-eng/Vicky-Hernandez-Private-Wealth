"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { GlossaryModal } from '@/components/GlossaryModal';
import { 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  LogOut,
  LogIn,
  Crown
} from 'lucide-react';

export const AccessibleHeader: React.FC = () => {
  const { profile, isAuthenticated, logout } = useClientData();
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  return (
    <>
      <header className="bg-wealth-navy-950 text-white border-b border-wealth-gold-500/20 sticky top-0 z-40 shadow-luxury backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Prestigious Brand Identity */}
            <div className="flex items-center gap-3.5">
              <Link 
                href="/dashboard"
                className="flex items-center gap-3 group focus:outline-none"
                aria-label="Vicky Hernandez Private Wealth Home"
              >
                {/* Bespoke Private Wealth Monogram Crest */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-wealth-navy-900 to-wealth-navy-950 border border-wealth-gold-400/60 shadow-inner flex items-center justify-center relative group-hover:border-wealth-gold-300 transition-all">
                  <div className="w-9 h-9 rounded-full border border-wealth-gold-500/30 flex items-center justify-center">
                    <span className="font-serif text-sm font-bold tracking-tighter text-wealth-gold-300 group-hover:text-wealth-gold-200 transition-colors">
                      VH
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-lg sm:text-xl font-bold tracking-[0.2em] text-white group-hover:text-wealth-gold-200 transition-colors uppercase">
                    Vicky Hernandez
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.32em] text-wealth-gold-400 font-medium -mt-0.5">
                    Private Wealth Management
                  </span>
                </div>
              </Link>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              
              {/* Financial Glossary Button */}
              <button
                type="button"
                onClick={() => setIsGlossaryOpen(true)}
                className="btn-touch px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-wealth-navy-900/90 border border-wealth-navy-700 hover:border-wealth-gold-400/50 hover:text-white transition-all flex items-center gap-2"
                title="Open Plain-English Financial Terms Dictionary"
              >
                <BookOpen className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                <span className="hidden sm:inline font-sans">Dictionary</span>
              </button>

              {/* Verified Institutional Custody Pill */}
              <div 
                className="btn-touch px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                title="Live Custodian Connection via Northern Trust Global Custody"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="hidden md:inline font-normal text-emerald-300/80">Custodian:</span>
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
                  <span className="hidden sm:inline">Sign Out</span>
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

          </div>
        </div>
      </header>

      {/* Glossary Modal */}
      <GlossaryModal 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)} 
      />
    </>
  );
};
