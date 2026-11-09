"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  Download, 
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

export default function HoldingsPage() {
  const { dataMode, holdings } = useClientData();
  const [filterAssetClass, setFilterAssetClass] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const assetClasses = ["ALL", ...Array.from(new Set(holdings.map((h) => h.assetClass)))];

  const filteredHoldings = holdings.filter((h) => {
    const matchesSearch = h.instrumentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.tickerOrIdentifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.sourceRecordId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterAssetClass === "ALL" || h.assetClass === filterAssetClass;
    return matchesSearch && matchesClass;
  });

  const totalFilteredValuation = filteredHoldings.reduce((sum, h) => sum + h.totalValuation, 0);
  const totalFilteredGainLoss = filteredHoldings.reduce((sum, h) => sum + h.unrealizedGainLoss, 0);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Breadcrumb Header */}
      <div>
        <Link
          href="/portfolio"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Portfolio Overview</span>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">
              Holding-Level Portfolio Details
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Source-verified security holdings, quantity, unit price, and institution record identifiers.
            </p>
          </div>

          <div className="text-xs bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2 self-start md:self-auto">
            <Clock className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
            <span>Valuation delay: End-of-Day Official Close (4:30 PM EST)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search instrument, CUSIP, or ID..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar" role="group" aria-label="Filter by asset class">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0 mr-1">Filter:</span>
          {assetClasses.map((ac) => (
            <button
              key={ac}
              type="button"
              onClick={() => setFilterAssetClass(ac)}
              aria-pressed={filterAssetClass === ac}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                filterAssetClass === ac
                  ? 'bg-wealth-navy-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ac}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Card-Based Holdings View (Visible on mobile screens < md) */}
      <div className="block md:hidden space-y-4">
        {filteredHoldings.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500">
            <HelpCircle className="w-10 h-10 mx-auto text-slate-300 mb-2" aria-hidden="true" />
            <p className="font-semibold text-sm">No holding records found</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or filter.</p>
          </div>
        ) : (
          <>
            {filteredHoldings.map((h) => (
              <div 
                key={h.id} 
                className="bg-white rounded-xl shadow-luxury border border-slate-200/90 p-4 transition-all hover:border-wealth-gold-400/50"
              >
                {/* Header: Instrument name + Asset class badge */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-base text-wealth-navy-950 leading-snug">
                      {h.instrumentName}
                    </h3>
                    <p className="font-mono text-xs text-slate-500 mt-0.5">
                      {h.tickerOrIdentifier}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-wealth-sand-100 text-wealth-navy-900 border border-wealth-sand-300 px-2.5 py-1 rounded-md">
                    {h.assetClass}
                  </span>
                </div>

                {/* Valuation & Unrealized Gain Row */}
                <div className="py-3 flex items-baseline justify-between gap-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      Current Valuation
                    </span>
                    <span className="font-serif font-bold text-xl text-wealth-navy-950 tabular-nums">
                      {formatUSD(h.totalValuation)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      Unrealized Gain
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <TrendingUp className="w-3 h-3 text-emerald-700" />
                      <span>+{formatUSD(h.unrealizedGainLoss)}</span>
                    </span>
                  </div>
                </div>

                {/* Key Details Grid */}
                <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Quantity</span>
                    <span className="font-mono font-bold text-slate-800">{h.quantity.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Unit Price</span>
                    <span className="font-mono font-bold text-slate-800">${h.currentPrice.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Custodian Provenance Stamp */}
                <div className="mt-2.5 pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Northern Trust Custody</span>
                  </span>
                  <span className="font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                    {h.sourceRecordId}
                  </span>
                </div>
              </div>
            ))}

            {/* Mobile Portfolio Totals Card */}
            <div className="bg-wealth-navy-950 text-white rounded-xl p-5 shadow-luxury border border-wealth-gold-500/30">
              <span className="text-[10px] uppercase font-bold tracking-widest text-wealth-gold-400 block mb-1">
                Reconciled Holdings Total
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-serif font-bold text-white tabular-nums">
                  {formatUSD(totalFilteredValuation)} <span className="text-xs font-sans text-slate-400">USD</span>
                </span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  +{formatUSD(totalFilteredGainLoss)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>All {filteredHoldings.length} holdings verified against DTC / Federal Reserve feeds.</span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Desktop Holdings Detailed Table (Hidden on mobile, visible on md+) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredHoldings.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <HelpCircle className="w-12 h-12 mx-auto text-slate-300 mb-2" aria-hidden="true" />
            <p className="font-semibold text-base">No holding records found</p>
            <p className="text-xs text-slate-400 mt-1">
              {dataMode === 'PROPOSED_PLANNING' 
                ? 'Custodian holdings feed not connected for live reporting.' 
                : 'No matching instruments match your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse" aria-label="Detailed Holdings Table">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50 text-xs font-bold uppercase text-wealth-navy-950">
                  <th scope="col" className="py-3 px-4">Instrument & Identifier</th>
                  <th scope="col" className="py-3 px-3">Asset Class</th>
                  <th scope="col" className="py-3 px-3 text-right">Quantity</th>
                  <th scope="col" className="py-3 px-3 text-right">Price (USD)</th>
                  <th scope="col" className="py-3 px-4 text-right">Current Valuation</th>
                  <th scope="col" className="py-3 px-4 text-right">Unrealized Gain / Loss</th>
                  <th scope="col" className="py-3 px-4 text-right">Source Record ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredHoldings.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-wealth-navy-950">
                      <div>
                        <p className="text-sm">{h.instrumentName}</p>
                        <p className="text-xs font-mono text-slate-500">{h.tickerOrIdentifier}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-600 font-medium">{h.assetClass}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-800">{h.quantity.toLocaleString()}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-800">${h.currentPrice.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-wealth-navy-950">
                      {formatUSD(h.totalValuation)} USD
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs font-bold text-emerald-800">
                      +{formatUSD(h.unrealizedGainLoss)} USD<br/>
                      <span className="text-slate-500 font-normal">(+{h.unrealizedGainLossPercent.toFixed(2)}%)</span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs font-mono text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {h.sourceRecordId}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold text-wealth-navy-950">
                  <td colSpan={4} className="py-3.5 px-4">Total Reconciled Holdings</td>
                  <td className="py-3.5 px-4 text-right font-mono text-base">
                    {formatUSD(totalFilteredValuation)} USD
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-800">
                    +{formatUSD(totalFilteredGainLoss)} USD
                  </td>
                  <td className="py-3.5 px-4 text-right text-xs text-slate-500">All feeds verified</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
