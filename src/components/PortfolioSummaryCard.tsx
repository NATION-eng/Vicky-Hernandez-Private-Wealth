"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { TrendingUp, ShieldAlert, CheckCircle2, Clock, Landmark, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const PortfolioSummaryCard: React.FC = () => {
  const { dataMode, holdings } = useClientData();

  // Calculate total portfolio valuation if verified or in demo
  const totalValuation = holdings.reduce((sum, h) => sum + h.totalValuation, 0);
  const totalGainLoss = holdings.reduce((sum, h) => sum + h.unrealizedGainLoss, 0);

  // Format currency with code
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
            Total Account Valuation
          </span>
          {dataMode === 'LIVE_VERIFIED' && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              Verified Sourced
            </span>
          )}
          {dataMode === 'PROPOSED_PLANNING' && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
              Awaiting Custodian Feed
            </span>
          )}
          {dataMode === 'DEMO_SIMULATED' && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-800 bg-red-100 px-2 py-0.5 rounded-full border border-red-300">
              Simulated Figure
            </span>
          )}
        </div>

        {/* Value Display or Fiduciary Unavailable State */}
        {dataMode === 'PROPOSED_PLANNING' ? (
          <div className="py-2">
            <div className="text-2xl md:text-3xl font-serif font-bold text-slate-500 tracking-tight">
              Value Not Connected
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              In accordance with our fiduciary presentation rules, we never display a fabricated balance. Once your custodian account (e.g. Northern Trust) is authenticated, your verified balance will appear here.
            </p>
          </div>
        ) : (
          <div className="py-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-serif font-bold text-wealth-navy-950 tracking-tight">
                {formatUSD(totalValuation)}
              </span>
              <span className="text-sm font-bold text-slate-500">USD</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs font-medium text-emerald-700">
              <TrendingUp className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>
                Unrealized Gain: +{formatUSD(totalGainLoss)} USD (+{((totalGainLoss / (totalValuation - totalGainLoss)) * 100).toFixed(2)}%)
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Valuation as of Nov 8, 2026, 4:30 PM EST</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Landmark className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <span>
            {dataMode === 'LIVE_VERIFIED' 
              ? 'Custodian: Northern Trust Global Custody' 
              : dataMode === 'DEMO_SIMULATED' 
                ? 'Source: Synthetic Demonstration Model' 
                : 'Custodian: Not yet connected'}
          </span>
        </div>

        <Link
          href="/portfolio"
          className="text-xs font-bold text-wealth-gold-700 hover:text-wealth-gold-900 flex items-center gap-1 group"
        >
          <span>View Holdings</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
