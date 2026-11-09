"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { Lightbulb, ArrowUpRight, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const ProposedAllocationCard: React.FC = () => {
  const { proposedAllocation, profile } = useClientData();

  return (
    <section 
      aria-labelledby="proposed-allocation-title"
      className="bg-white rounded-xl shadow-sm border-2 border-wealth-gold-300 p-6 relative overflow-hidden transition-all hover:border-wealth-gold-500"
    >
      {/* Visual Accent Badge */}
      <div className="absolute top-0 right-0 bg-wealth-gold-500 text-wealth-navy-950 font-bold text-xs uppercase px-3 py-1 rounded-bl-lg tracking-wider">
        Advisory Strategy Proposal
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-wealth-gold-100 flex items-center justify-center shrink-0 border border-wealth-gold-300">
          <Lightbulb className="w-6 h-6 text-wealth-gold-700" aria-hidden="true" />
        </div>

        <div className="flex-1 pr-12">
          <h2 id="proposed-allocation-title" className="text-xl md:text-2xl font-bold text-wealth-navy-950">
            {proposedAllocation.title}
          </h2>

          <p className="text-sm font-medium text-wealth-gold-700 mt-0.5">
            Target Focus: {proposedAllocation.targetAssetClass}
          </p>

          <div className="mt-3 bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-sm text-slate-700 leading-relaxed">
            <p className="font-semibold text-amber-950 mb-1">
              What does this 20% represent?
            </p>
            <p>
              {proposedAllocation.basisDescription}
            </p>
            <p className="mt-1 text-xs text-slate-600 italic">
              <strong>Denominator Basis:</strong> {proposedAllocation.intendedDenominator}
            </p>
          </div>

          {/* Fiduciary Guardrail Notice */}
          <div className="mt-3 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Important Fiduciary Boundary:</strong> {proposedAllocation.disclaimer}
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/plan"
              className="btn-touch px-4 py-2 bg-wealth-navy-900 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 transition-colors flex items-center gap-1.5"
            >
              <span>Explore My Full Financial Plan</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
            </Link>

            <Link
              href="/help/contact"
              className="btn-touch px-3 py-2 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              <span>Discuss With {profile.adviserName.split(',')[0]}</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
