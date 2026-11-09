"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { Lightbulb, ArrowUpRight, HelpCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export const ProposedAllocationCard: React.FC = () => {
  const { proposedAllocation, profile } = useClientData();

  return (
    <section 
      aria-labelledby="proposed-allocation-title"
      className="bg-white rounded-2xl shadow-luxury border-2 border-wealth-gold-400/50 p-6 md:p-8 relative overflow-hidden transition-all hover:border-wealth-gold-500 hover:shadow-luxury-hover"
    >
      {/* Visual Accent Badge */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-wealth-gold-600 to-wealth-gold-500 text-wealth-navy-950 font-bold text-[10px] uppercase px-3.5 py-1 rounded-bl-xl tracking-[0.2em] shadow-xs">
        Strategic Advisory Proposal
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-wealth-gold-50 flex items-center justify-center shrink-0 border border-wealth-gold-300/60 shadow-xs">
          <Lightbulb className="w-6 h-6 text-wealth-gold-700" aria-hidden="true" />
        </div>

        <div className="flex-1 pr-6 sm:pr-12">
          <h2 id="proposed-allocation-title" className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950 tracking-tight">
            {proposedAllocation.title}
          </h2>

          <p className="text-xs font-semibold tracking-wider uppercase text-wealth-gold-800 mt-1">
            Focus: {proposedAllocation.targetAssetClass}
          </p>

          <div className="mt-4 bg-wealth-sand-50/80 border border-wealth-sand-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            <p className="font-bold text-wealth-navy-950 mb-1">
              What does this 20% represent?
            </p>
            <p className="text-slate-600">
              {proposedAllocation.basisDescription}
            </p>
            <p className="mt-2 text-xs text-slate-500 italic pt-2 border-t border-slate-200/60">
              <strong>Denominator Basis:</strong> {proposedAllocation.intendedDenominator}
            </p>
          </div>

          {/* Fiduciary Guardrail Notice */}
          <div className="mt-3.5 flex items-start gap-2.5 text-xs text-slate-500 bg-slate-50/70 p-3 rounded-lg border border-slate-200/60">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>Important Fiduciary Boundary:</strong> {proposedAllocation.disclaimer}
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/plan"
              className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-xl text-xs font-semibold hover:bg-wealth-navy-850 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Explore My Full Financial Plan</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
            </Link>

            <Link
              href="/help/contact"
              className="btn-touch px-3.5 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-medium hover:bg-slate-200 transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>Discuss With {profile.adviserName.split(',')[0]}</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
