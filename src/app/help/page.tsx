"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  ShieldAlert, 
  Search, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Headphones
} from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Accounts' | 'Security' | 'Advisory';
}

const FAQS: FAQItem[] = [
  {
    question: "What is the meaning of the 'Proposed Initial Allocation — 20%' on my screen?",
    answer: "This is an advisory proposal suggesting an initial 20% placement into capital-preservation instruments (such as US Treasury notes). It is not an active holding, deposit, or trade. It represents a recommendation for discussion during your planning consultation.",
    category: "Advisory"
  },
  {
    question: "Why does my dashboard state 'Value Not Connected' in Proposed Plan mode?",
    answer: "Per our strict fiduciary standards, we never fabricate or simulate account balances on your client portal. Until your institutional custodian (such as Northern Trust or BNY Mellon) is connected via secure feed, real values remain unavailable to prevent any misleading presentation.",
    category: "Accounts"
  },
  {
    question: "How do I report suspicious account activity or unrecognized log-ins?",
    answer: "You can use our 'Report Suspicious Activity' tool on this page, or immediately call Katherine Sterling at +1 (555) 430-8800. Our security team can freeze portal access and verify recent IP sessions instantly.",
    category: "Security"
  },
  {
    question: "Can trades or money transfers be executed directly from this portal?",
    answer: "No. In accordance with PRD non-goals (FR-12), this release operates solely as a wealth information, plan review, and document reporting platform. No withdrawals, trades, or fund movements can be initiated from this portal.",
    category: "Security"
  },
  {
    question: "How do I adjust the text size or switch to High Contrast mode?",
    answer: "Use the Viewing Assistance toolbar at the very top of your screen. You can select '125%' or '150%' text size, or switch to 'High Contrast' black-and-white mode with a single click at any time.",
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
                Direct Client Support
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Senior & Elderly-First Accessibility Guaranteed
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
              Help, Concierge & Advisory Contacts
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              We believe older clients and family office members should never be trapped in automated chat loops. You have direct phone and email access to your dedicated private wealth team.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
              className="btn-touch px-5 py-3 bg-wealth-navy-950 text-white rounded-xl text-sm font-semibold hover:bg-wealth-navy-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-wealth-gold-300" aria-hidden="true" />
              <span>Call Adviser Directly</span>
            </a>
          </div>
        </div>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Dedicated Adviser */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-wealth-gold-100 border border-wealth-gold-300 flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5 text-wealth-gold-700" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dedicated Wealth Lead</span>
            <h3 className="text-lg font-serif font-bold text-wealth-navy-950 mt-1">{profile.adviserName}</h3>
            <p className="text-xs text-slate-600 mt-1">Available Mon–Fri, 8:00 AM – 6:00 PM EST for portfolio consultations.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <a href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`} className="font-semibold text-wealth-navy-950 flex items-center gap-1.5 hover:underline">
              <Phone className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
              <span>{profile.adviserPhone}</span>
            </a>
            <a href={`mailto:${profile.adviserEmail}`} className="text-slate-600 flex items-center gap-1.5 hover:underline">
              <Mail className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span className="truncate">{profile.adviserEmail}</span>
            </a>
          </div>
        </div>

        {/* 24/7 Security & Fraud Concierge */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-red-100 border border-red-300 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5 text-red-700" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-800">24/7 Fraud & Safety Hotline</span>
            <h3 className="text-lg font-serif font-bold text-wealth-navy-950 mt-1">Emergency Security Desk</h3>
            <p className="text-xs text-slate-600 mt-1">Direct line for identity verification, suspected fraud, or lost devices.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <a href="tel:+18005550199" className="font-semibold text-red-700 flex items-center gap-1.5 hover:underline">
              <Phone className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
              <span>+1 (800) 555-0199 (Toll-Free 24/7)</span>
            </a>
            <p className="text-slate-500">fraud-alerts@sterlingprivatewealth.com</p>
          </div>
        </div>

        {/* Accessibility & Tech Help Desk */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-wealth-navy-100 border border-wealth-navy-300 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-wealth-navy-900" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Device & Screen Reader Help</span>
            <h3 className="text-lg font-serif font-bold text-wealth-navy-950 mt-1">Accessibility Support</h3>
            <p className="text-xs text-slate-600 mt-1">Assistance configuring browser zoom, JAWS/NVDA screen readers, or iPad tablets.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <Link href="/accessibility" className="font-semibold text-wealth-gold-700 hover:underline flex items-center gap-1">
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
