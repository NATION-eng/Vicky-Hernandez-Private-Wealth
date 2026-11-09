"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { DataStatusBanner } from '@/components/DataStatusBanner';
import { PortfolioSummaryCard } from '@/components/PortfolioSummaryCard';
import { ProposedAllocationCard } from '@/components/ProposedAllocationCard';
import { AccessibleDonutChart } from '@/components/AccessibleDonutChart';
import Link from 'next/link';
import { 
  Briefcase, 
  Target, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Landmark,
  FileCheck
} from 'lucide-react';

export function DashboardView() {
  const { dataMode, assetAllocations, goals, activities, profile } = useClientData();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-200">
      {/* 1. Salutation & Live Status Banner */}
      <DataStatusBanner />

      {/* 2. Primary Financial Fact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <PortfolioSummaryCard />
        <ProposedAllocationCard />
      </div>

      {/* 3. Quick Access Hub (Icon-Forward & Minimalist) */}
      <section aria-labelledby="quick-actions-heading" className="bg-wealth-navy-950 text-white rounded-2xl p-5 sm:p-6 shadow-luxury border border-wealth-gold-500/20">
        <h2 id="quick-actions-heading" className="text-[11px] font-bold uppercase tracking-widest text-wealth-gold-400 mb-3.5">
          Quick Access
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/portfolio"
            className="btn-touch p-3.5 sm:p-4 bg-wealth-navy-900 rounded-xl border border-wealth-navy-800 hover:border-wealth-gold-400 hover:bg-wealth-navy-855 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-wealth-navy-950 flex items-center justify-center border border-wealth-navy-700 group-hover:border-wealth-gold-500/50">
                <Briefcase className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-white">Portfolio</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <Link
            href="/plan"
            className="btn-touch p-3.5 sm:p-4 bg-wealth-navy-900 rounded-xl border border-wealth-navy-800 hover:border-wealth-gold-400 hover:bg-wealth-navy-855 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-wealth-navy-950 flex items-center justify-center border border-wealth-navy-700 group-hover:border-wealth-gold-500/50">
                <Target className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-white">My Plan</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <Link
            href="/documents"
            className="btn-touch p-3.5 sm:p-4 bg-wealth-navy-900 rounded-xl border border-wealth-navy-800 hover:border-wealth-gold-400 hover:bg-wealth-navy-855 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-wealth-navy-950 flex items-center justify-center border border-wealth-navy-700 group-hover:border-wealth-gold-500/50">
                <FileText className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-white">Vault</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <Link
            href="/help"
            className="btn-touch p-3.5 sm:p-4 bg-wealth-navy-900 rounded-xl border border-wealth-navy-800 hover:border-wealth-gold-400 hover:bg-wealth-navy-855 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-lg bg-wealth-navy-950 flex items-center justify-center border border-wealth-navy-700 group-hover:border-wealth-gold-500/50">
                <HelpCircle className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-white">Concierge</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 4. Asset Allocation Breakdown */}
      {assetAllocations.length > 0 && (
        <section aria-labelledby="allocation-heading">
          <AccessibleDonutChart 
            allocations={assetAllocations} 
            title="Portfolio Asset Mix (Actual vs. Target)" 
            isSimulated={dataMode === 'DEMO_SIMULATED'}
          />
        </section>
      )}

      {/* 5. Stated Financial Goals & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Stated Goals Summary (Icon-forward, no wordy assumptions) */}
        <section aria-labelledby="goals-heading" className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-5 sm:p-6 md:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-wealth-gold-600" aria-hidden="true" />
                <h2 id="goals-heading" className="text-xl font-serif font-bold text-wealth-navy-950">
                  Stated Wealth Goals
                </h2>
              </div>
              <Link
                href="/plan"
                className="text-xs font-bold text-wealth-gold-700 hover:text-wealth-gold-900 flex items-center gap-1"
              >
                <span>Full Plan</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-wealth-navy-950 font-serif">
                      {goal.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                      {goal.targetHorizon}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fiduciary Mandate</span>
            </span>
            <span>Annual Review: Nov 15</span>
          </div>
        </section>

        {/* Recent Source-Backed Activity */}
        <section aria-labelledby="activity-heading" className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-5 sm:p-6 md:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-wealth-gold-600" aria-hidden="true" />
                <h2 id="activity-heading" className="text-xl font-serif font-bold text-wealth-navy-950">
                  Recent Activity
                </h2>
              </div>
              <Link
                href="/activity"
                className="text-xs font-bold text-wealth-gold-700 hover:text-wealth-gold-900 flex items-center gap-1"
              >
                <span>Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {activities.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                <Clock className="w-8 h-8 mx-auto text-slate-300 mb-1.5" aria-hidden="true" />
                <p>No settled activity for this cycle</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {activities.slice(0, 3).map((act) => (
                  <div key={act.id} className="py-2.5 flex items-center justify-between gap-3 first:pt-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                        {act.type === 'DIVIDEND' ? (
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                        ) : act.type === 'INTEREST' ? (
                          <Landmark className="w-4 h-4 text-wealth-navy-800" />
                        ) : (
                          <FileCheck className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-wealth-navy-950">
                          {act.plainLanguageTitle}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {act.date}
                        </p>
                      </div>
                    </div>

                    {act.amount !== null && (
                      <div className="text-right shrink-0">
                        <p className={`font-mono font-bold text-xs ${act.amount >= 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
                          {act.amount >= 0 ? '+' : ''}${Math.abs(act.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">USD</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Custody Verified</span>
            </span>
            <span className="font-mono text-[11px]">DTC Reconciled</span>
          </div>
        </section>

      </div>
    </div>
  );
}
