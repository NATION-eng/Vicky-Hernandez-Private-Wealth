"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { GlossaryModal } from '@/components/GlossaryModal';
import { 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  HelpCircle, 
  SlidersHorizontal, 
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const AccessibleHeader: React.FC = () => {
  const { dataMode, setDataMode, profile } = useClientData();
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);

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

              {/* Data Environment Mode Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                  aria-expanded={isModeDropdownOpen}
                  aria-label="Select Data Source Environment"
                  className="btn-touch px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border bg-wealth-navy-900 border-wealth-navy-700 hover:border-wealth-gold-500"
                >
                  <Layers className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                  <span className="hidden md:inline text-slate-300 font-normal">Environment:</span>
                  <span className={`font-semibold ${
                    dataMode === 'LIVE_VERIFIED' ? 'text-emerald-400' :
                    dataMode === 'PROPOSED_PLANNING' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {dataMode === 'LIVE_VERIFIED' ? 'Live Verified' :
                     dataMode === 'PROPOSED_PLANNING' ? 'Proposed Plan' : 'Demo Sandbox'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </button>

                {isModeDropdownOpen && (
                  <div 
                    role="menu"
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 text-slate-900 p-2 z-50 text-xs"
                  >
                    <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Switch Data Environment
                    </p>
                    
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setDataMode('PROPOSED_PLANNING');
                        setIsModeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                        dataMode === 'PROPOSED_PLANNING' ? 'bg-amber-50 text-amber-950 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="font-semibold">Proposed Plan Mode</p>
                        <p className="text-[11px] text-slate-500">Unconnected baseline advisory plan</p>
                      </div>
                      {dataMode === 'PROPOSED_PLANNING' && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setDataMode('LIVE_VERIFIED');
                        setIsModeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                        dataMode === 'LIVE_VERIFIED' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="font-semibold">Live Verified State</p>
                        <p className="text-[11px] text-slate-500">Connected Northern Trust custody records</p>
                      </div>
                      {dataMode === 'LIVE_VERIFIED' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setDataMode('DEMO_SIMULATED');
                        setIsModeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                        dataMode === 'DEMO_SIMULATED' ? 'bg-red-50 text-red-950 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="font-semibold">Demo Sandbox (Fictional)</p>
                        <p className="text-[11px] text-slate-500">Watermarked synthetic presentation</p>
                      </div>
                      {dataMode === 'DEMO_SIMULATED' && <span className="w-2 h-2 rounded-full bg-red-500" />}
                    </button>
                  </div>
                )}
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
