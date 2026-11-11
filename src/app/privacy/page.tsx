"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, ArrowLeft, Lock } from 'lucide-react';
import { useClientData } from '@/context/ClientDataContext';

export default function PrivacyPage() {
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
          Client Privacy & Data Governance Notice
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Fiduciary confidentiality standards protecting Vicky Hernandez.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Fiduciary Principle of Client Confidentiality
          </h2>
          <p>
            Vicky Hernandez Private Wealth operates under strict fiduciary governance. We do not sell, rent, monetize, or disclose your financial records, planning horizons, or personal information to third-party advertising networks or commercial brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Information We Securely Maintain
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Client Identity:</strong> Preferred name, full registered legal name, email, and designated telephone number.</li>
            <li><strong>Custodian Feed Data:</strong> Synchronized holdings, quantities, valuations, and coupon histories sourced from authorized institutional custody channels.</li>
            <li><strong>Planning Records:</strong> Agreed risk profile, assumptions, and platform objectives (such as the 300% capital growth target).</li>
            <li><strong>Audit Logs:</strong> Timestamps of logins, profile modifications, and document downloads.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Data Subject Rights & Concierge Access
          </h2>
          <p className="text-xs text-slate-600">
            As a private client, you have the right to request a complete archive of your stored data, amend preferred information, or instruct permanent purging upon mandate termination. Requests can be submitted directly through your secure client portal.
          </p>
        </section>
      </div>
    </div>
  );
}
