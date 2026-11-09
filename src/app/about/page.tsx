"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { useClientData } from '@/context/ClientDataContext';

export default function AboutPage() {
  const { profile } = useClientData();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-wealth-navy-950">
          About Vicky Hernandez Private Wealth
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          A personalized, dignified private banking and wealth-information experience.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Our Purpose & Vision
          </h2>
          <p>
            Vicky Hernandez Private Wealth is built around a single named primary client to provide clarity, calm, and total control over financial plans and portfolio allocations. 
          </p>
          <p>
            Rather than overwhelming users with frantic market tickers and confusing jargon, we prioritize transparent data provenance, age-inclusive typography, and direct, uninterrupted access to dedicated human advisers.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <Award className="w-6 h-6 text-wealth-gold-600 mb-2" aria-hidden="true" />
            <h3 className="font-bold text-wealth-navy-950 font-serif">Fiduciary Care</h3>
            <p className="text-xs text-slate-600 mt-1">Every recommendation is aligned strictly with your stated legacy and capital preservation goals.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <Eye className="w-6 h-6 text-wealth-navy-950 mb-2" aria-hidden="true" />
            <h3 className="font-bold text-wealth-navy-950 font-serif">Radical Transparency</h3>
            <p className="text-xs text-slate-600 mt-1">Clear distinction between proposed plans, pending custodian feeds, and verified settled balances.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <HeartHandshake className="w-6 h-6 text-emerald-700 mb-2" aria-hidden="true" />
            <h3 className="font-bold text-wealth-navy-950 font-serif">Senior Ergonomics</h3>
            <p className="text-xs text-slate-600 mt-1">Engineered to WCAG 2.2 AA standards with generous touch areas and low cognitive strain.</p>
          </div>
        </div>

        <section className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          <p>
            Dedicated Adviser: <strong>{profile.adviserName}</strong> • Sterling Private Wealth Advisors
          </p>
        </section>
      </div>
    </div>
  );
}
