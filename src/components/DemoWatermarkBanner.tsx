"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { AlertTriangle, RotateCcw, ShieldCheck } from 'lucide-react';

export const DemoWatermarkBanner: React.FC = () => {
  const { dataMode, setDataMode } = useClientData();

  if (dataMode !== 'DEMO_SIMULATED') {
    return null;
  }

  return (
    <div 
      role="alert" 
      aria-live="polite"
      className="bg-amber-600 text-white px-4 py-2.5 font-medium border-b-4 border-amber-800 shadow-md print:block"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-amber-200 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-bold text-base tracking-wide flex items-center gap-2">
              <span className="bg-amber-950 px-2 py-0.5 rounded text-xs uppercase tracking-wider font-extrabold text-amber-300">
                DISCLOSURE
              </span>
              DEMO — SIMULATED DATA ONLY
            </p>
            <p className="text-xs text-amber-100">
              This screen displays fictional synthetic balances for walkthrough and training purposes. It does not represent actual holdings, funds, or investments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDataMode('PROPOSED_PLANNING')}
            className="px-3 py-1.5 bg-wealth-navy-950 text-white rounded text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5 border border-amber-400"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Switch to Client Planning Mode
          </button>
          <button
            type="button"
            onClick={() => setDataMode('LIVE_VERIFIED')}
            className="px-3 py-1.5 bg-emerald-900 text-emerald-100 rounded text-xs font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-1.5 border border-emerald-400"
          >
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            View Live Verified State
          </button>
        </div>
      </div>
    </div>
  );
};
