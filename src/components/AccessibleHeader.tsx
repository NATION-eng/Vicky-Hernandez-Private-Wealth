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
  LogIn
} from 'lucide-react';

export const AccessibleHeader: React.FC = () => {
  const { profile, isAuthenticated, logout } = useClientData();
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  return (
    <>
      <header className="bg-wealth-navy-950 text-white border-b border-wealth-navy-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Title */}
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard"
                className="flex flex-col group focus:outline-none"
                aria-label="Vicky Hernandez Private Wealth Home"
              >
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-wealth-sand-50 group-hover:text-wealth-gold-300 transition-colors">
                  VICKY HERNANDEZ
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-wealth-gold-400 font-semibold -mt-1">
                  Private Wealth Management
                </span>
              </Link>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Financial Glossary Button */}
              <button
                type="button"
                onClick={() => setIsGlossaryOpen(true)}
                className="btn-touch px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-wealth-navy-900 border border-wealth-navy-700 hover:bg-wealth-navy-800 hover:text-white transition-all flex items-center gap-1.5"
                title="Open Plain-English Financial Terms Dictionary"
              >
                <BookOpen className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                <span className="hidden sm:inline">Financial Glossary</span>
              </button>

              {/* Permanent Live Verified Custody Badge */}
              <div 
                className="btn-touch px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                title="Live Custodian Connection via Northern Trust Global Custody"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="hidden md:inline font-normal text-emerald-200">Custodian:</span>
                <span className="font-semibold text-emerald-300">Northern Trust (Live)</span>
              </div>

              {/* Dedicated Adviser Phone Link */}
              <a
                href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
                className="btn-touch px-3 py-1.5 rounded-lg text-xs font-semibold bg-wealth-gold-500 text-wealth-navy-950 hover:bg-wealth-gold-400 transition-all flex items-center gap-1.5 shadow-sm"
                title={`Call ${profile.adviserName}`}
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden lg:inline">Adviser Hotline</span>
              </a>

              {/* Client Initial Avatar */}
              <Link
                href="/settings"
                className="w-10 h-10 rounded-full bg-wealth-navy-800 border-2 border-wealth-gold-400/80 flex items-center justify-center text-wealth-gold-300 font-bold text-sm hover:border-wealth-gold-300 transition-colors"
                title="Account Settings"
                aria-label="Vicky Hernandez Profile and Settings"
              >
                VH
              </Link>

              {/* Authentication Status / Sign Out Action */}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="btn-touch px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-wealth-navy-900 border border-wealth-navy-700 hover:bg-red-950 hover:text-red-200 hover:border-red-600 transition-all flex items-center gap-1.5"
                  title="Sign out of portal session"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="btn-touch px-3 py-1.5 rounded-lg text-xs font-semibold text-wealth-gold-300 bg-wealth-navy-900 border border-wealth-gold-500/50 hover:bg-wealth-gold-500 hover:text-wealth-navy-950 transition-all flex items-center gap-1.5"
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
