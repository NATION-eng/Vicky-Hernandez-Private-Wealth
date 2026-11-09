"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { Lightbulb, ArrowUpRight, Target, Calendar, ShieldAlert, Phone } from 'lucide-react';
import Link from 'next/link';

export const ProposedAllocationCard: React.FC = () => {
  const { proposedAllocation, profile } = useClientData();

  return (
    <section 
      aria-labelledby="proposed-allocation-title"
      className="bg-white rounded-2xl shadow-luxury border-2 border-wealth-gold-400/50 p-5 sm:p-6 md:p-7 relative overflow-hidden transition-all hover:border-wealth-gold-500 hover:shadow-luxury-hover flex flex-col justify-between"
    >
      {/* Visual Accent Badge */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-wealth-gold-600 to-wealth-gold-500 text-wealth-navy-950 font-bold text-[9px] sm:text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-widest shadow-xs">
        Planning Proposal
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-wealth-gold-50 flex items-center justify-center shrink-0 border border-wealth-gold-300/60 shadow-xs">
            <Lightbulb className="w-5 h-5 text-wealth-gold-700" aria-hidden="true" />
          </div>
          <div>
            <h2 id="proposed-allocation-title" className="text-xl sm:text-2xl font-serif font-bold text-wealth-navy-950">
              {proposedAllocation.title}
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-wider text-wealth-gold-800">
              Short-Duration Fixed Income
            </p>
          </div>
        </div>

        {/* 3 Sleek Icon Metric Rows (replacing large text paragraphs) */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-wealth-sand-50 border border-wealth-sand-200/80">
            <Target className="w-4 h-4 text-wealth-gold-700 shrink-0" aria-hidden="true" />
            <span className="text-slate-800">
              <strong>Target Class:</strong> US Treasury Notes (Principal Protected)
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <Calendar className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
            <span className="text-slate-700">
              <strong>Execution Status:</strong> On Hold pending Annual Review (Nov 15)
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span className="text-slate-600 text-[11px]">
              Fiduciary Planning Model • Requires Authorized Instruction
            </span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          href="/plan"
          className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-xl text-xs font-semibold hover:bg-wealth-navy-800 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span>Explore Plan</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
        </Link>

        <a
          href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
          className="btn-touch px-3 py-2 text-xs font-semibold text-slate-700 hover:text-wealth-gold-700 transition-colors flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
          <span>Discuss</span>
        </a>
      </div>
    </section>
  );
};
