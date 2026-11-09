"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { TrendingUp, ShieldCheck, Clock, Landmark, ArrowRight } from 'lucide-react';
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

  return (
    <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-6 md:p-8 flex flex-col justify-between hover:shadow-luxury-hover transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Total Account Valuation
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Verified Custodian Feed
          </span>
        </div>

        <div className="py-2">
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-wealth-navy-950 tracking-tight tabular-nums">
              {formatUSD(totalValuation)}
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">USD</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-emerald-800">
            <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>+{formatUSD(totalGainLoss)} USD</span>
            </div>
            <span className="text-slate-500 font-normal">
              (+{((totalGainLoss / (totalValuation - totalGainLoss)) * 100).toFixed(2)}% paper gain)
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span>Valuation as of today, 04:30 PM EST</span>
          </p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Landmark className="w-4 h-4 text-wealth-gold-600" aria-hidden="true" />
          <span>Custodian: <strong>Northern Trust Global Custody</strong></span>
        </div>

        <Link
          href="/portfolio"
          className="text-xs font-bold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 group transition-colors"
        >
          <span>View Holdings</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
