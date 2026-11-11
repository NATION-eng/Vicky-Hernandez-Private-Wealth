"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { 
  HelpCircle, 
  ShieldAlert, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ExternalLink,
  Lock
} from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Accounts' | 'Security' | 'Advisory';
}

const FAQS: FAQItem[] = [
  {
    question: "What is the primary objective of the portfolio platform?",
    answer: "The platform's primary investment objective is to triple the amount invested over time through gradual, progressive growth (100% initial capital -> 300% final portfolio valuation / 200% target profit). All financial figures currently initialize at zero ($0.00 / 0.00%) pending client-provided investment timeframe and funding schedule.",
    category: "Advisory"
  },
  {
    question: "What does the 99.9% target rate represent?",
    answer: "The 99.9% figure is a platform-stated operational and custody reconciliation reliability objective. In accordance with strict fiduciary presentation standards, it is not presented as an independently verified historical return.",
    category: "Security"
  },
  {
    question: "Why are financial figures currently showing zero ($0.00 / 0.00%)?",
    answer: "Per our strict fiduciary standards, we never fabricate or simulate account balances or investment returns. All figures initialize at a clean zero baseline until capital deployment instructions and investment timeframes are formally executed.",
    category: "Accounts"
  },
  {
    question: "How do I report suspicious account activity or unrecognized log-ins?",
    answer: "You can use our 'Report Suspicious Activity' tool on this page to immediately alert our fiduciary operations desk. Our team can terminate active sessions and verify recent login events instantly.",
    category: "Security"
  },
  {
    question: "Can trades or money transfers be executed directly from this portal?",
    answer: "No. In accordance with fiduciary security architecture, this portal operates solely as a protected wealth information, plan review, and document vault platform. No unauthorized withdrawals, trades, or fund transfers can be executed through this interface.",
    category: "Security"
  },
  {
    question: "How do I adjust the text size or switch to High Contrast mode?",
    answer: "Use the Viewing Assistance toolbar at the very top of your screen. You can select '125%' or '150%' text size, or switch to 'High Contrast' mode with a single click at any time.",
    category: "Accounts"
  }
];

export default function HelpPage() {
  const { profile, recordAudit } = useClientData();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);
  const [suspiciousReported, setSuspiciousReported] = useState(false);
  const [suspiciousNotes, setSuspiciousNotes] = useState("");

  const filteredFAQs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReportSuspicious = (e: React.FormEvent) => {
    e.preventDefault();
    if (suspiciousNotes.trim().length > 0) {
      recordAudit("REPORT_SUSPICIOUS_ACTIVITY", suspiciousNotes, "SUCCESS");
      setSuspiciousReported(true);
      setSuspiciousNotes("");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Help & Concierge Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-wealth-gold-600 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200">
                Client Support & Security
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Institutional Custody
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
              Platform Support & Security Guidance
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Transparent fiduciary information, plain-language guidance, and direct security reporting for Vicky Hernandez.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/documents"
              className="btn-touch px-5 py-3 bg-wealth-navy-950 text-white rounded-xl text-sm font-bold hover:bg-wealth-navy-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Lock className="w-4 h-4 text-wealth-gold-300" aria-hidden="true" />
              <span>Access Custody Vault</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Support & Fiduciary Structure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Institutional Custody */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Institutional Custody</span>
            <h3 className="text-lg font-serif font-bold text-wealth-navy-950 mt-1">Institutional Custodian</h3>
            <p className="text-xs text-slate-600 mt-1">Global Custody & Asset Servicing. Regulated institutional reconciliation under Federal Reserve book-entry.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Custodian Status: Active</span>
          </div>
        </div>

        {/* 24/7 Security & Fraud Protection */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-wealth-sand-100 border border-wealth-sand-300 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5 text-wealth-navy-950" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Session Protection</span>
            <h3 className="text-lg font-serif font-bold text-wealth-navy-950 mt-1">Enterprise Security</h3>
            <p className="text-xs text-slate-600 mt-1">PBKDF2 salted credential encryption, HTTP-only secure cookies, and 2-hour automatic session expiration.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-wealth-navy-950">
            <span>Session Timeout: 120 Minutes</span>
          </div>
        </div>

        {/* Accessibility Support */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-wealth-navy-100 border border-wealth-navy-300 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-wealth-navy-900" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Inclusive Design</span>
            <h3 className="text-lg font-serif font-bold text-wealth-navy-950 mt-1">Accessibility Support</h3>
            <p className="text-xs text-slate-600 mt-1">Built to WCAG 2.2 AA standards with full keyboard navigation, high contrast options, and screen reader readiness.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <Link href="/accessibility" className="font-bold text-wealth-gold-700 hover:underline flex items-center gap-1">
              <span>Read Full Accessibility Statement</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>

      {/* Report Suspicious Activity Form (PRD Section 8 & 9.8) */}
      <section aria-labelledby="suspicious-heading" className="bg-white rounded-xl shadow-sm border-2 border-red-200 p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 id="suspicious-heading" className="text-xl font-serif font-bold text-wealth-navy-950">
              Report Suspicious Activity or Security Concerns
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Notice an unfamiliar login, incorrect device notice, or strange email claiming to be from your adviser? Report it here immediately.
            </p>
          </div>
        </div>

        {suspiciousReported ? (
          <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-950 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-base">Alert Transmitted to Fiduciary Security Team</p>
              <p className="text-xs mt-1 text-red-800">
                A high-priority incident has been registered in the security audit ledger. Our fraud desk has locked sensitive changes pending verbal confirmation with Vicky Hernandez.
              </p>
              <button
                type="button"
                onClick={() => setSuspiciousReported(false)}
                className="mt-3 text-xs font-bold underline hover:text-red-900"
              >
                Submit another report or note
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReportSuspicious} className="space-y-4">
            <div>
              <label htmlFor="suspicious-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Describe the incident or concern
              </label>
              <textarea
                id="suspicious-notes"
                rows={3}
                value={suspiciousNotes}
                onChange={(e) => setSuspiciousNotes(e.target.value)}
                placeholder="I received a suspicious text message about a wire transfer..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                This triggers an immediate high-priority audit record.
              </span>
              <button
                type="submit"
                disabled={suspiciousNotes.trim().length === 0}
                className="btn-touch px-5 py-2.5 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-red-200" aria-hidden="true" />
                <span>Submit Security Alert</span>
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Frequently Asked Questions (Accordion) */}
      <section aria-labelledby="faq-heading" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 id="faq-heading" className="text-xl font-serif font-bold text-wealth-navy-950">
              Frequently Asked Questions & Plain-Language Help
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Quick answers regarding your portal and financial plan</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left font-serif font-bold text-base text-wealth-navy-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-wealth-gold-600 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-700 bg-slate-50/50 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Topic: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
