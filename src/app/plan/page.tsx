"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { ProposedAllocationCard } from '@/components/ProposedAllocationCard';
import { 
  Target, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Send, 
  FileText, 
  ArrowUpRight, 
  Sliders,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function PlanPage() {
  const { goals, proposedAllocation, profile, requestPlanReview } = useClientData();
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewNotes.trim().length > 0) {
      requestPlanReview(reviewNotes);
      setReviewSubmitted(true);
      setReviewNotes("");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Plan Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-wealth-gold-700 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200 flex items-center gap-1">
                <Target className="w-3 h-3 text-wealth-gold-600" />
                <span>Strategic Mandate</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Annual Review: Nov 15
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">
              My Financial Plan
            </h1>
          </div>

          <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2 w-fit">
            <span className="font-bold text-wealth-navy-950">Adviser:</span>
            <span>{profile.adviserName}</span>
          </div>
        </div>

        {/* 3 Sleek Icon Metric Tiles */}
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Risk Profile</span>
              <p className="text-sm font-bold font-serif text-wealth-navy-950">Conservative</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-wealth-sand-100 border border-wealth-sand-300 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-wealth-navy-900" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Horizon</span>
              <p className="text-sm font-bold font-serif text-wealth-navy-950">10+ Years (Legacy)</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-wealth-gold-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Tax Strategy</span>
              <p className="text-sm font-bold font-serif text-wealth-navy-950">Treasury Shield</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Proposed Initial 20% Allocation Feature Card */}
      <ProposedAllocationCard />

      {/* 3. Stated Goals with Detailed Assumptions */}
      <section aria-labelledby="goals-section-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h2 id="goals-section-title" className="text-xl md:text-2xl font-serif font-bold text-wealth-navy-950">
            Detailed Life & Wealth Objectives
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear milestones agreed upon during your financial planning sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((g) => (
            <div key={g.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-wealth-gold-700 bg-wealth-gold-100 px-2 py-0.5 rounded border border-wealth-gold-300">
                    Horizon: {g.targetHorizon}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    Status: {g.currentStatus.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-wealth-navy-950">
                  {g.title}
                </h3>

                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                  {g.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Agreed Plan Assumptions:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {g.assumptions.map((ass, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{ass}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Request Plan Review Mechanism (PRD 9.5 Requirement) */}
      <section aria-labelledby="review-section-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h2 id="review-section-title" className="text-xl font-serif font-bold text-wealth-navy-950 mb-1">
          Request a Plan Adjustment or Advisory Review
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Any modification to your investment proposals, risk parameters, or cash withdrawal timelines requires formal consultation and adviser authorization.
        </p>

        {reviewSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-base">Plan Review Request Logged Successfully</p>
              <p className="text-xs mt-1 text-emerald-800">
                Katherine Sterling has received your request. An audit event was recorded in your account ledger. Your adviser will contact you within one business day.
              </p>
              <button
                type="button"
                onClick={() => setReviewSubmitted(false)}
                className="mt-3 text-xs font-bold underline hover:text-emerald-950"
              >
                Submit another request or note
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label htmlFor="review-notes-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Notes for Katherine Sterling (e.g., changes in cash needs, estate questions)
              </label>
              <textarea
                id="review-notes-input"
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="I would like to discuss the timing of the proposed 20% fixed income allocation..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Your request is audited and transmitted securely.
              </span>
              <button
                type="submit"
                disabled={reviewNotes.trim().length === 0}
                className="btn-touch px-5 py-2.5 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                <span>Submit Review Request</span>
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
}
