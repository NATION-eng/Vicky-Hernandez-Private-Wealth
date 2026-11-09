"use client";

import React from 'react';
import Link from 'next/link';
import { Accessibility, CheckCircle2, ShieldCheck, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useClientData } from '@/context/ClientDataContext';

export default function AccessibilityStatementPage() {
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
          Digital Accessibility Statement
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Conformance Target: <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong>
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Our Fiduciary Commitment to Universal Access
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Vicky Hernandez Private Wealth is committed to ensuring digital wealth management is calm, dignified, and accessible to older adults, individuals with low vision, motor tremors, and those using assistive technologies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Technical Standards & Ergonomic Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Text Scalability up to 200%</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The entire interface can be enlarged up to 200% zoom using browser controls or our header stepper without any loss of content, clipped tables, or horizontal scrolling.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Minimum 48×48px Touch Targets</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All buttons, links, and form fields provide generous physical dimensions and whitespace to accommodate arthritis, tremors, or touch screen tablets.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Colorblind-Safe Financial Visualizations</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Color is never the sole conveyor of information. All donut and performance charts are accompanied by direct numeric labels, textured SVG fills, and synchronized HTML data tables.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Zero Icon-Only Controls</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every navigation link and actionable button features an explicit plain-English text description alongside any supporting visual iconography.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Assistance & Accommodation Coordinator
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            If you encounter any difficulty navigating or accessing documents, please contact your dedicated adviser or our accessibility coordinator:
          </p>
          <div className="bg-wealth-sand-50 p-4 rounded-xl border border-wealth-sand-200 text-xs space-y-1">
            <p className="font-bold text-wealth-navy-950">Concierge Desk for Vicky Hernandez</p>
            <p className="text-slate-700">Telephone: {profile.adviserPhone}</p>
            <p className="text-slate-500 mt-1">Available Mon–Fri 8:00 AM – 5:00 PM CST (Texas Time) with dedicated concierge support.</p>
          </div>
        </section>
      </div>

    </div>
  );
}
