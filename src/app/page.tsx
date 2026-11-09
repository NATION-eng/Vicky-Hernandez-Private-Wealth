"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Eye, 
  Phone, 
  FileText, 
  Sparkles, 
  BookOpen,
  Award
} from 'lucide-react';

export default function PublicLandingPage() {
  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="bg-wealth-navy-950 text-white rounded-2xl p-8 md:p-14 shadow-lg border border-wealth-navy-800 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-wealth-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-wealth-navy-900 border border-wealth-navy-700 px-3 py-1 rounded-full text-xs font-semibold text-wealth-gold-300 mb-6">
            <Award className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
            <span>Fiduciary Private Wealth Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            VICKY HERNANDEZ
            <span className="block text-2xl sm:text-3xl text-wealth-gold-400 font-sans font-normal mt-1">
              Private Wealth Management Portal
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed">
            A calm, dignified digital experience designed specifically for reviewing personalized financial plans, tracking verified portfolio allocations, and accessing official reports with absolute transparency.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="btn-touch px-6 py-3.5 bg-wealth-gold-500 text-wealth-navy-950 rounded-xl text-sm font-bold hover:bg-wealth-gold-400 transition-all flex items-center gap-2 shadow-md"
            >
              <span>Enter Vicky&apos;s Portal</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              href="/demo"
              className="btn-touch px-6 py-3.5 bg-wealth-navy-900 text-white border border-wealth-navy-700 rounded-xl text-sm font-semibold hover:bg-wealth-navy-800 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
              <span>Explore Demo Sandbox</span>
            </Link>

            <Link
              href="/sign-in"
              className="btn-touch px-5 py-3.5 text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Client Sign-In
            </Link>
          </div>
        </div>
      </section>

      {/* Fiduciary Pillars Grid */}
      <section aria-labelledby="pillars-heading" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-wealth-navy-50 border border-wealth-navy-200 flex items-center justify-center mb-4">
            <Eye className="w-6 h-6 text-wealth-navy-950" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-serif font-bold text-wealth-navy-950">
            Senior-First Accessibility
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Engineered natively to WCAG 2.2 AA standards. Comfortable 18–24px text scaling, generous 48px touch targets, high contrast, and zero confusing financial clutter.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-700" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-serif font-bold text-wealth-navy-950">
            Fiduciary Provenance
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Every balance and security is verified against official custodian records with exact timestamps. Proposed allocations (such as the initial 20% plan) are never conflated with cash.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-wealth-gold-50 border border-wealth-gold-200 flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-wealth-gold-700" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-serif font-bold text-wealth-navy-950">
            Dedicated Human Concierge
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            No chatbot barriers. Direct telephone and private email connectivity to Katherine Sterling, CFP® and 24/7 fraud response specialists.
          </p>
        </div>

      </section>

      {/* Regulatory & PRD Boundary Disclosure */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-xs text-slate-600 leading-relaxed">
        <p className="font-bold text-slate-900 mb-1">Product Boundary Disclosures (PRD Compliance):</p>
        <p>
          This portal supports personalized financial planning and wealth information for Vicky Hernandez. It does not execute market trades, accept external money deposits, or initiate asset transfers in MVP release. All data reflects verified custodian feeds or clearly marked advisory proposals.
        </p>
      </section>

    </div>
  );
}
