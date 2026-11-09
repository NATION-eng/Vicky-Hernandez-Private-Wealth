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
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const { dataMode, assetAllocations, goals, activities, documents, profile } = useClientData();

  return (
    <div className="space-y-8">
      {/* 1. First-Screen Greeting & Provenance Status Banner */}
      <DataStatusBanner />

      {/* 2. Primary Financial Fact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Total Valuation Summary (Fiduciary guarded: shows Unavailable if not connected) */}
        <PortfolioSummaryCard />

        {/* Proposed 20% Allocation Card (Plain-language explanation & boundary) */}
        <ProposedAllocationCard />
      </div>

      {/* 3. Quick Action Hub (Large, Accessible Touch Targets) */}
      <section aria-labelledby="quick-actions-heading" className="bg-gradient-to-r from-wealth-navy-950 via-wealth-navy-900 to-wealth-navy-950 text-white rounded-2xl p-6 md:p-8 shadow-luxury border border-wealth-gold-500/20">
        <h2 id="quick-actions-heading" className="text-xs font-bold uppercase tracking-widest text-wealth-gold-400 mb-4">
          Quick Access & Assistance
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/portfolio"
            className="btn-touch p-4 bg-wealth-navy-900 rounded-lg border border-wealth-navy-700 hover:border-wealth-gold-400 hover:bg-wealth-navy-850 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-wealth-gold-400" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm text-white">My Portfolio</p>
                <p className="text-xs text-slate-400">View asset holdings</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            href="/plan"
            className="btn-touch p-4 bg-wealth-navy-900 rounded-lg border border-wealth-navy-700 hover:border-wealth-gold-400 hover:bg-wealth-navy-850 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-wealth-gold-400" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm text-white">My Plan</p>
                <p className="text-xs text-slate-400">Goals & assumptions</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            href="/documents"
            className="btn-touch p-4 bg-wealth-navy-900 rounded-lg border border-wealth-navy-700 hover:border-wealth-gold-400 hover:bg-wealth-navy-850 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-wealth-gold-400" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm text-white">Statements</p>
                <p className="text-xs text-slate-400">Quarterly reports</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            href="/help"
            className="btn-touch p-4 bg-wealth-navy-900 rounded-lg border border-wealth-navy-700 hover:border-wealth-gold-400 hover:bg-wealth-navy-850 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-wealth-gold-400" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm text-white">Get Help</p>
                <p className="text-xs text-slate-400">Concierge & Adviser</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-wealth-gold-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 4. Asset Allocation Breakdown (Only if data exists or in Demo mode) */}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Stated Goals Summary */}
        <section aria-labelledby="goals-heading" className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 id="goals-heading" className="text-2xl font-serif font-bold text-wealth-navy-950">
                Stated Wealth Goals
              </h2>
              <p className="text-xs text-slate-500">Agreed objectives with Katherine Sterling</p>
            </div>
            <Link
              href="/plan"
              className="text-xs font-bold text-wealth-gold-700 hover:text-wealth-gold-900 flex items-center gap-1"
            >
              <span>View Full Plan</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base text-wealth-navy-950 font-serif">
                    {goal.title}
                  </h3>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {goal.targetHorizon}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {goal.description}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Assumptions: {goal.assumptions[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Source-Backed Activity */}
        <section aria-labelledby="activity-heading" className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 id="activity-heading" className="text-2xl font-serif font-bold text-wealth-navy-950">
                Recent Verified Activity
              </h2>
              <p className="text-xs text-slate-500">Source-backed ledger events</p>
            </div>
            <Link
              href="/activity"
              className="text-xs font-bold text-wealth-gold-700 hover:text-wealth-gold-900 flex items-center gap-1"
            >
              <span>View All Activity</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Clock className="w-10 h-10 mx-auto text-slate-300 mb-2" aria-hidden="true" />
              <p className="font-semibold text-sm">No activity recorded for this period</p>
              <p className="text-xs text-slate-400 mt-1">Once verified transactions settle, they will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {activities.slice(0, 3).map((act) => (
                <div key={act.id} className="py-3.5 flex items-start justify-between gap-3 first:pt-0">
                  <div>
                    <p className="font-semibold text-sm text-wealth-navy-950">
                      {act.plainLanguageTitle}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {act.date} • {act.custodianName}
                    </p>
                  </div>
                  {act.amount !== null && (
                    <div className="text-right">
                      <p className={`font-mono font-bold text-sm ${act.amount >= 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {act.amount >= 0 ? '+' : ''}${Math.abs(act.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <span className="text-[10px] uppercase font-bold text-slate-400">USD</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
