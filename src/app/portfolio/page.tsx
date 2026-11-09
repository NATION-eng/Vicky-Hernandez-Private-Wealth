"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { AccessibleDonutChart } from '@/components/AccessibleDonutChart';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  PieChart, 
  ListFilter, 
  BarChart2, 
  HelpCircle,
  Landmark,
  ChevronRight
} from 'lucide-react';

export default function PortfolioOverviewPage() {
  const { dataMode, holdings, assetAllocations } = useClientData();

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
    <div className="space-y-6 sm:space-y-8">
      
      {/* Portfolio Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Live Custody</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Northern Trust
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">
              My Portfolio
            </h1>
          </div>

          {/* Subpage Quick Links (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar w-full md:w-auto">
            <Link
              href="/portfolio/allocation"
              className="btn-touch px-3.5 sm:px-4 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <PieChart className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
              <span>Asset Allocation</span>
            </Link>
            <Link
              href="/portfolio/holdings"
              className="btn-touch px-3.5 sm:px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <ListFilter className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span>Holding Details</span>
            </Link>
            <Link
              href="/portfolio/performance"
              className="btn-touch px-3.5 sm:px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <BarChart2 className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span>Performance</span>
            </Link>
          </div>
        </div>

        {/* Financial Valuation Summary Card */}
        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Portfolio Valuation
            </span>
            {dataMode === 'PROPOSED_PLANNING' ? (
              <p className="text-2xl font-serif font-bold text-slate-500 mt-1">
                Value Not Connected
              </p>
            ) : (
              <p className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950 mt-1 tabular-nums break-words">
                {formatUSD(totalValuation)} <span className="text-xs font-sans text-slate-500">USD</span>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              <span>As of Nov 8, 2026, 4:30 PM EST</span>
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Unrealized Paper Gain
            </span>
            {dataMode === 'PROPOSED_PLANNING' ? (
              <p className="text-2xl font-serif font-bold text-slate-500 mt-1">—</p>
            ) : (
              <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800 mt-1 tabular-nums break-words">
                +{formatUSD(totalGainLoss)} <span className="text-xs font-sans text-slate-500">USD</span>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Reflects assets currently held, before tax treatment.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 sm:col-span-2 md:col-span-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Custodian Data Source
            </span>
            <p className="text-base font-bold text-wealth-navy-950 mt-1 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-wealth-gold-600 shrink-0" aria-hidden="true" />
              <span>
                {dataMode === 'LIVE_VERIFIED' 
                  ? 'Northern Trust Global Custody' 
                  : dataMode === 'DEMO_SIMULATED' 
                    ? 'Synthetic Demo Custodian' 
                    : 'Awaiting Connection'}
              </span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Reconciled nightly via secure institutional feed.
            </p>
          </div>
        </div>
      </div>

      {/* Asset Allocation Section */}
      {assetAllocations.length > 0 ? (
        <AccessibleDonutChart 
          allocations={assetAllocations} 
          title="Consolidated Asset Class Distribution"
          isSimulated={dataMode === 'DEMO_SIMULATED'}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" aria-hidden="true" />
          <h2 className="text-xl font-bold font-serif text-wealth-navy-950">
            Custodian Allocation Data Pending
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            Your asset allocation breakdown will populate here automatically once custodian feed synchronization completes. In the meantime, you can review your proposed planning framework.
          </p>
          <div className="mt-4">
            <Link
              href="/plan"
              className="btn-touch px-5 py-2.5 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 inline-flex items-center gap-2"
            >
              <span>Review Proposed Financial Plan</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-300" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      {/* Holdings Preview: Mobile Cards & Desktop Table */}
      {holdings.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
                Holding-Level Portfolio Summary
              </h2>
              <p className="text-xs text-slate-500">Verified institutional instruments</p>
            </div>
            <Link
              href="/portfolio/holdings"
              className="text-xs font-bold text-wealth-gold-700 hover:text-wealth-gold-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Holdings Preview Cards */}
          <div className="block md:hidden space-y-3">
            {holdings.slice(0, 4).map((h) => (
              <Link 
                key={h.id}
                href="/portfolio/holdings"
                className="block p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-serif font-bold text-sm text-wealth-navy-950">{h.instrumentName}</p>
                    <p className="font-mono text-xs text-slate-500">{h.tickerOrIdentifier} • {h.assetClass}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-serif font-bold text-sm text-wealth-navy-950 tabular-nums">
                      {formatUSD(h.totalValuation)}
                    </p>
                    <p className="text-[11px] font-bold text-emerald-700">
                      +{formatUSD(h.unrealizedGainLoss)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Holdings Preview Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse" aria-label="Holdings summary preview">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50 text-xs font-bold uppercase text-wealth-navy-950">
                  <th scope="col" className="py-2.5 px-3">Instrument</th>
                  <th scope="col" className="py-2.5 px-3">Asset Class</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Quantity</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Total Valuation</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Paper Gain/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {holdings.slice(0, 4).map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      <div>
                        <p>{h.instrumentName}</p>
                        <p className="text-xs text-slate-400 font-mono">{h.tickerOrIdentifier}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-xs font-medium">{h.assetClass}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700">{h.quantity.toLocaleString()}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-wealth-navy-950">
                      {formatUSD(h.totalValuation)} USD
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-xs font-bold text-emerald-800">
                      +{formatUSD(h.unrealizedGainLoss)} USD (+{h.unrealizedGainLossPercent.toFixed(2)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <ListFilter className="w-12 h-12 text-slate-300 mx-auto mb-3" aria-hidden="true" />
          <h2 className="text-xl font-bold font-serif text-wealth-navy-950">
            No Active Holdings on File
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            Your custody account currently holds $0.00 in settled active positions. Holdings will appear automatically following trade settlement and custodial clearing through Northern Trust.
          </p>
          <div className="mt-4">
            <Link
              href="/plan"
              className="btn-touch px-5 py-2.5 bg-wealth-navy-950 text-white rounded-lg text-xs font-bold hover:bg-wealth-navy-800 inline-flex items-center gap-2"
            >
              <span>View 300% Capital Growth Framework</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-300" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
