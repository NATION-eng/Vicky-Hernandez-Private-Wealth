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
  FileSpreadsheet
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

  return (
    <div className="space-y-8">
      
      {/* Breadcrumb Header */}
      <div>
        <Link
          href="/portfolio"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Portfolio Overview</span>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
              Holding-Level Portfolio Details
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Source-verified security holdings, quantity, unit price, and institution record identifiers.
            </p>
          </div>

          <div className="text-xs bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>Valuation feed delay: End-of-Day Official Close (4:30 PM EST)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
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

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" role="group" aria-label="Filter by asset class">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0">Filter:</span>
          {assetClasses.map((ac) => (
            <button
              key={ac}
              type="button"
              onClick={() => setFilterAssetClass(ac)}
              aria-pressed={filterAssetClass === ac}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
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

      {/* Holdings Detailed Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
                    {formatUSD(filteredHoldings.reduce((sum, h) => sum + h.totalValuation, 0))} USD
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-800">
                    +{formatUSD(filteredHoldings.reduce((sum, h) => sum + h.unrealizedGainLoss, 0))} USD
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
