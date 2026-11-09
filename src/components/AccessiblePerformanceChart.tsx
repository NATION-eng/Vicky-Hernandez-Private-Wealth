"use client";

import React, { useState } from 'react';
import { PerformanceDataPoint } from '@/types/wealth';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { TrendingUp, ShieldAlert, Table, BarChart2, Info, Target, ShieldCheck } from 'lucide-react';

interface AccessiblePerformanceChartProps {
  performanceHistory: PerformanceDataPoint[];
  isSimulated?: boolean;
}

export const AccessiblePerformanceChart: React.FC<AccessiblePerformanceChartProps> = ({
  performanceHistory,
  isSimulated = false,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('ALL');
  const [showTableOnly, setShowTableOnly] = useState<boolean>(false);

  // If no data points, display authoritative stated objectives framework
  if (!performanceHistory || performanceHistory.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Clean Baseline State</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">Northern Trust Custody</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-wealth-navy-950">
              Platform Strategic Objectives & Performance Framework
            </h3>
          </div>
          <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
            Actual Returns: 0.00%
          </div>
        </div>

        {/* 3 Metric Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-wealth-sand-50 border border-wealth-sand-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Platform Objective</span>
              <Target className="w-4 h-4 text-wealth-gold-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">99.9%</p>
            <p className="text-xs font-bold text-wealth-gold-800 mt-1">Target Operational Success Rate</p>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Platform-stated execution and custodial reconciliation reliability target.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Growth Target</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">300%</p>
            <p className="text-xs font-bold text-emerald-800 mt-1">Target Portfolio Value (Triple Invested)</p>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Mathematical framework: 100% Initial Capital → 300% Final Value (+200% Profit).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Current Balances</span>
              <ShieldCheck className="w-4 h-4 text-wealth-navy-900" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">$0.00</p>
            <p className="text-xs font-bold text-slate-800 mt-1">0.00% Current Realized Return</p>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Ready for client timeframe and deployment instructions. No fabricated history.
            </p>
          </div>
        </div>

        {/* Legal and Fiduciary Disclosures */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-wealth-gold-600 shrink-0" />
            <span>Fiduciary Performance Standard & Statutory Disclosures</span>
          </p>
          <p>
            The 99.9% figure is a platform-stated operational and execution reliability objective and is not presented as an independently audited historical return. In strict accordance with fiduciary standards and investor protections, historical return curves are generated exclusively from verified custodial statements following capital deployment. Past performance is no guarantee of future results.
          </p>
        </div>
      </div>
    );
  }

  // Filter based on period
  let displayedData = performanceHistory;
  if (selectedPeriod === '1M') {
    displayedData = performanceHistory.slice(-2);
  } else if (selectedPeriod === '3M') {
    displayedData = performanceHistory.slice(-4);
  } else if (selectedPeriod === '6M') {
    displayedData = performanceHistory.slice(-6);
  }

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const latestReturn = displayedData[displayedData.length - 1]?.netReturnPercent ?? 0;
  const benchmarkReturn = displayedData[displayedData.length - 1]?.benchmarkReturnPercent ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-6 md:p-8">
      
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-serif font-bold text-wealth-navy-950">
              Cumulative Portfolio Performance
            </h3>
            {isSimulated && (
              <span className="text-xs bg-red-100 text-red-800 font-sans font-bold px-2 py-0.5 rounded border border-red-300">
                Simulated Time Series
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculated <strong>Net of Advisory and Custody Fees</strong>. Benchmark: Custom 70/30 Conservative Wealth Index.
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs" role="group" aria-label="Select performance time range">
            {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setSelectedPeriod(period)}
                aria-pressed={selectedPeriod === period}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  selectedPeriod === period 
                    ? 'bg-wealth-navy-950 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowTableOnly(!showTableOnly)}
            aria-pressed={showTableOnly}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-200"
          >
            <Table className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
            <span>{showTableOnly ? 'Show Chart' : 'Table Only'}</span>
          </button>
        </div>
      </div>

      {/* Return Highlights Badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-wealth-sand-50 p-4 rounded-lg border border-wealth-sand-200">
        <div>
          <span className="text-xs font-semibold uppercase text-slate-500">Portfolio Net Return ({selectedPeriod})</span>
          <p className="text-2xl font-bold font-serif text-emerald-800 mt-0.5 flex items-center gap-1.5">
            <TrendingUp className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            +{latestReturn.toFixed(2)}%
          </p>
          <span className="text-xs text-slate-500">After all management and custody fees</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase text-slate-500">Benchmark Return ({selectedPeriod})</span>
          <p className="text-2xl font-bold font-serif text-slate-700 mt-0.5">
            +{benchmarkReturn.toFixed(2)}%
          </p>
          <span className="text-xs text-slate-500">70% US Aggregate / 30% Global Dividend</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase text-slate-500">Net Value Added (Alpha)</span>
          <p className="text-2xl font-bold font-serif text-wealth-navy-950 mt-0.5">
            +{(latestReturn - benchmarkReturn).toFixed(2)}%
          </p>
          <span className="text-xs text-slate-500">Outperformance against passive benchmark</span>
        </div>
      </div>

      {/* Visual Chart */}
      {!showTableOnly && (
        <div className="w-full h-72 mb-6" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayedData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A192F" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0A192F" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis 
                stroke="#64748B" 
                fontSize={12} 
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} 
                domain={['auto', 'auto']}
              />
              <Tooltip 
                formatter={(value: any, name: any) => [
                  formatUSD(Number(value)) + ' USD',
                  name === 'portfolioValue' ? 'Portfolio Value (Net)' : 'Benchmark Composite'
                ]}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(val) => (
                  <span className="text-xs font-semibold text-slate-700">
                    {val === 'portfolioValue' ? 'Vicky Hernandez Portfolio (Net)' : 'Benchmark Target'}
                  </span>
                )}
              />
              <Area 
                type="monotone" 
                dataKey="portfolioValue" 
                stroke="#0A192F" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorPortfolio)" 
                dot={{ r: 4, fill: '#B3873B', stroke: '#0A192F', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="benchmarkValue" 
                stroke="#94A3B8" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                fillOpacity={0} 
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Accessible Structured Data Table Alternative */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse" aria-label="Tabular Performance History">
          <thead>
            <tr className="border-b-2 border-slate-300 bg-slate-50 text-xs font-bold uppercase text-wealth-navy-950">
              <th scope="col" className="py-2.5 px-3">Valuation Date</th>
              <th scope="col" className="py-2.5 px-3 text-right">Portfolio Value</th>
              <th scope="col" className="py-2.5 px-3 text-right">Portfolio Net Return</th>
              <th scope="col" className="py-2.5 px-3 text-right">Benchmark Return</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {displayedData.map((dp, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-900">{dp.date}</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-wealth-navy-950">
                  {formatUSD(dp.portfolioValue)} USD
                </td>
                <td className="py-2.5 px-3 text-right font-semibold text-emerald-800">
                  +{dp.netReturnPercent.toFixed(2)}%
                </td>
                <td className="py-2.5 px-3 text-right text-slate-600">
                  +{dp.benchmarkReturnPercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legal Disclaimers */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong>Mandatory Disclosure:</strong> Past performance is no guarantee of future returns. Investments are subject to market risks, including the possible loss of principal. Values shown reflect time-weighted returns net of all advisory and custodial fees.
        </p>
      </div>

    </div>
  );
};
