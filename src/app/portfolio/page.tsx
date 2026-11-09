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
  Landmark
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
    <div className="space-y-8">
      
      {/* Portfolio Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-wealth-gold-600 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200">
                Fiduciary Portfolio
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Mandate: Balanced Conservative Growth
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
              My Portfolio Overview
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Consolidated view of your asset holdings, verified directly against institutional custodian records with source timestamps.
            </p>
          </div>

          {/* Subpage Quick Links */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/portfolio/allocation"
              className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 transition-colors flex items-center gap-1.5"
            >
              <PieChart className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
              <span>Asset Allocation</span>
            </Link>
            <Link
              href="/portfolio/holdings"
              className="btn-touch px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ListFilter className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span>Holding Details</span>
            </Link>
            <Link
              href="/portfolio/performance"
              className="btn-touch px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <BarChart2 className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span>Performance</span>
            </Link>
          </div>
        </div>

        {/* Financial Valuation Summary Card */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Portfolio Valuation
            </span>
            {dataMode === 'PROPOSED_PLANNING' ? (
              <p className="text-2xl font-serif font-bold text-slate-500 mt-1">
                Value Not Connected
              </p>
            ) : (
              <p className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950 mt-1">
                {formatUSD(totalValuation)} <span className="text-xs font-sans text-slate-500">USD</span>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>As of Nov 8, 2026, 4:30 PM EST</span>
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Unrealized Paper Gain
            </span>
            {dataMode === 'PROPOSED_PLANNING' ? (
              <p className="text-2xl font-serif font-bold text-slate-500 mt-1">—</p>
            ) : (
              <p className="text-2xl md:text-3xl font-serif font-bold text-emerald-800 mt-1">
                +{formatUSD(totalGainLoss)} <span className="text-xs font-sans text-slate-500">USD</span>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Reflects assets currently held, before tax treatment.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Custodian Data Source
            </span>
            <p className="text-base font-bold text-wealth-navy-950 mt-1 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-wealth-gold-600" aria-hidden="true" />
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

      {/* Holdings Preview Table */}
      {holdings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
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
              <span>View Full Holdings List</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="overflow-x-auto">
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
      )}

    </div>
  );
}
