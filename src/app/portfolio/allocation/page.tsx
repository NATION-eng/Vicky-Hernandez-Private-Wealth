"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { AccessibleDonutChart } from '@/components/AccessibleDonutChart';
import Link from 'next/link';
import { ChevronLeft, Info, AlertTriangle, ShieldCheck, PieChart, Sparkles } from 'lucide-react';

export default function AllocationPage() {
  const { dataMode, assetAllocations, proposedAllocation } = useClientData();

  const totalActual = assetAllocations.reduce((sum, item) => sum + item.actualPercentage, 0);
  const totalTarget = assetAllocations.reduce((sum, item) => sum + item.targetPercentage, 0);
  const unallocated = Math.max(0, 100 - totalActual);

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
          Target vs. Actual Asset Allocation
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Comparing your long-term strategic investment policy against current market valuations.
        </p>
      </div>

      {/* Target vs Actual Comparison Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Actual Allocation Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Market Distribution
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-wealth-navy-100 text-wealth-navy-900">
              Total: {totalActual}%
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Actual Allocation
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Calculated from settled custodian holdings. Fluctuates naturally with daily financial market movements.
          </p>

          <div className="mt-4 space-y-3">
            {assetAllocations.map((a, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-800">{a.assetClass}</span>
                  <span className="font-bold text-wealth-navy-950">{a.actualPercentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all" 
                    style={{ width: `${a.actualPercentage}%`, backgroundColor: a.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Strategic Mandate Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Strategic Target Mandate
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-wealth-gold-100 text-wealth-gold-900">
              Total: {totalTarget}%
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Target Allocation
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            The agreed long-term asset weightings formulated in your Investment Policy Statement (IPS) with Katherine Sterling.
          </p>

          <div className="mt-4 space-y-3">
            {assetAllocations.map((a, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-800">{a.assetClass}</span>
                  <span className="font-bold text-wealth-gold-800">{a.targetPercentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all" 
                    style={{ width: `${a.targetPercentage}%`, backgroundColor: a.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Accessible Interactive Chart and Full Text Table */}
      {assetAllocations.length > 0 && (
        <AccessibleDonutChart 
          allocations={assetAllocations} 
          title="Interactive Asset Allocation Breakdown"
          isSimulated={dataMode === 'DEMO_SIMULATED'}
        />
      )}

      {/* Proposed 20% Initial Allocation Context in Relationship to Full Portfolio */}
      <div className="bg-amber-50/70 border-2 border-amber-300 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-bold text-base text-amber-950">
              Advisory Note: Relationship to Proposed Initial 20% Allocation
            </h3>
            <p className="text-xs text-amber-900 mt-1 leading-relaxed">
              {proposedAllocation.basisDescription} Once formally approved and funded, this proposed allocation will shift into the <strong>Fixed Income</strong> actual holdings bucket and will be reconciled during the next scheduled quarterly rebalancing.
            </p>
          </div>
        </div>
      </div>

      {/* Risk and Investment Volatility Disclosure */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-3 text-xs text-slate-600">
        <AlertTriangle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong>Investment Risk Disclosures:</strong> Diversification across asset classes helps manage concentration risk, but does not guarantee a profit or protect against loss in declining markets. Values are subject to market fluctuations, interest rate changes, and inflation.
        </p>
      </div>

    </div>
  );
}
