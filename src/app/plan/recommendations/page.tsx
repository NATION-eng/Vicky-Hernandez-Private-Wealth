"use client";

import React from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { ProposedAllocationCard } from '@/components/ProposedAllocationCard';
import { ChevronLeft, Lightbulb, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PlanRecommendationsPage() {
  const { proposedAllocation, profile } = useClientData();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/plan"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to My Plan</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
          Advisory Recommendations & Proposals
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Strategic proposals prepared for discussion and future execution.
        </p>
      </div>

      <ProposedAllocationCard />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-serif font-bold text-wealth-navy-950">
          How Recommendations Are Authorized
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          In strict compliance with PRD Section 1, 2, and 6.1, advisory recommendations are never automatically executed or booked as balances. Any deployment of funds requires written client confirmation or verbal authorization recorded during your scheduled review with {profile.adviserName}.
        </p>
      </div>
    </div>
  );
}
