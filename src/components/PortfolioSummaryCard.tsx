"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { TrendingUp, ShieldCheck, Clock, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

export const PortfolioSummaryCard: React.FC = () => {
  const { holdings } = useClientData();

  const totalValuation = holdings.reduce((sum, h) => sum + h.totalValuation, 0);
  const totalGainLoss = holdings.reduce((sum, h) => sum + h.unrealizedGainLoss, 0);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const costBasis = totalValuation - totalGainLoss;
  const gainPercent = costBasis > 0 ? ((totalGainLoss / costBasis) * 100).toFixed(2) : "0.00";

  return (
    <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-5 sm:p-6 md:p-7 flex flex-col justify-between hover:shadow-luxury-hover transition-all">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-wealth-navy-50 flex items-center justify-center border border-wealth-navy-100">
              <Briefcase className="w-4 h-4 text-wealth-navy-950" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Portfolio Valuation
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Northern Trust</span>
          </span>
        </div>

        {/* Valuation Numbers */}
        <div className="py-2">
          <div className="flex items-baseline flex-wrap gap-2">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-wealth-navy-950 tracking-tight tabular-nums break-words">
              {formatUSD(totalValuation)}
            </span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">USD</span>
          </div>

          {/* Gain Pill */}
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>+{formatUSD(totalGainLoss)} (+{gainPercent}%)</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">Unrealized Gain</span>
          </div>
        </div>
      </div>

      {/* Minimalist Bottom Row */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-slate-400" title="Central Time (Texas)">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>3:30 PM CST Close</span>
        </span>

        <Link
          href="/portfolio"
          className="btn-touch font-bold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 group transition-colors"
        >
          <span>Holdings</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
