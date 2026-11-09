"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { AccessiblePerformanceChart } from '@/components/AccessiblePerformanceChart';
import Link from 'next/link';
import { ChevronLeft, Info, HelpCircle, ShieldCheck, Landmark } from 'lucide-react';

export default function PerformancePage() {
  const { dataMode, performanceHistory } = useClientData();

  return (
    <div className="space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          href="/portfolio"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Portfolio Overview</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
          Historical Performance & Benchmark Analysis
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Time-weighted returns calculated net of advisory fees, custodial expenses, and cash distributions.
        </p>
      </div>

      {/* Primary Performance Chart & Data Table Component */}
      <AccessiblePerformanceChart 
        performanceHistory={performanceHistory}
        isSimulated={dataMode === 'DEMO_SIMULATED'}
      />

      {/* Disclosures and Methodology */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-serif font-bold text-wealth-navy-950 flex items-center gap-2">
          <Info className="w-5 h-5 text-wealth-gold-600" aria-hidden="true" />
          <span>Calculation Methodology & Fiduciary Disclosures</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">Time-Weighted Rate of Return (TWR)</h3>
            <p>
              Performance figures reflect daily compounding time-weighted returns to remove the distorting effects of client deposits or withdrawals.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">Fee Deductions (Net Basis)</h3>
            <p>
              All reported returns are strictly <strong>Net of Fees</strong>. Advisory fees, transaction costs, and custodian administration expenses have been fully subtracted.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">Benchmark Construction</h3>
            <p>
              The benchmark shown is a custom blended index composed of 70% Bloomberg US Aggregate Bond Index and 30% Dow Jones US Dividend 100 Index, rebalanced monthly.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">Fiduciary Safeguard</h3>
            <p>
              In compliance with SEC Rule 206(4)-1 and international private banking standards, simulated past returns are never shown on live accounts.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
