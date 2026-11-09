"use client";

import React from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { ShieldCheck, ChevronLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function PlanRiskProfilePage() {
  const { profile } = useClientData();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/plan"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to My Plan</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
          Client Risk Profile & Volatility Mandate
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Formally recorded risk tolerance assessment for Vicky Hernandez.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-wealth-gold-700">Official Category</span>
          <h2 className="text-2xl font-serif font-bold text-wealth-navy-950 mt-1">
            Conservative Capital Preservation
          </h2>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            Your mandate prioritizes defense of purchasing power, minimal peak-to-trough drawdowns, and high liquidity reserves. Growth through equity markets is strictly calibrated to high-quality dividend payers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-bold text-sm text-wealth-navy-950">Drawdown Tolerance</h3>
            <p className="text-xs text-slate-600 mt-1">Maximum modeled 12-month drawdown threshold is capped at 5.0%.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-bold text-wealth-navy-950 text-sm">Liquidity Coverage</h3>
            <p className="text-xs text-slate-600 mt-1">Minimum 24 months of anticipated cash distributions in short-term paper.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-bold text-wealth-navy-950 text-sm">Mandate Review</h3>
            <p className="text-xs text-slate-600 mt-1">Mandatory annual review with Katherine Sterling, CFP®.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
