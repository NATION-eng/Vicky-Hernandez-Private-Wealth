"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Landmark, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { useClientData } from '@/context/ClientDataContext';

export default function ContactPage() {
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
          Institutional Custody & Fiduciary Administration
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Official custody provenance and secure portal administration for Vicky Hernandez.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Custodian Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Institutional Custodian
            </span>
            <h2 className="text-2xl font-serif font-bold text-wealth-navy-950 mt-2">
              Northern Trust Global Custody
            </h2>
            <p className="text-xs text-slate-500">Global Custody & Asset Servicing Division</p>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-wealth-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Custodial Mandate</p>
                <p className="font-semibold text-wealth-navy-950">Segregated Private Client Custody</p>
                <p className="text-xs text-slate-500">Account: {profile.accountNumberMasked}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Settlement Verification</p>
                <p className="font-semibold text-wealth-navy-950">DTC & Federal Reserve Book-Entry</p>
                <p className="text-xs text-slate-500">Tier-1 Institutional Custody</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Custody Status</p>
                <p className="font-medium text-emerald-800">Verified & Active Fiduciary Link</p>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Concierge & Vault */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              Client Portal Concierge
            </span>
            <h2 className="text-2xl font-serif font-bold text-wealth-navy-950 mt-2">
              Digital Vault & Security
            </h2>
            <p className="text-xs text-slate-500">Protected Fiduciary Information Architecture</p>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-wealth-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Certified Vault</p>
                <Link href="/documents" className="font-semibold text-wealth-navy-950 hover:underline">
                  View Official Statements & Tax Records
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-wealth-navy-900 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Session Protection</p>
                <p className="font-semibold text-wealth-navy-950">2-Hour Automatic Session Timeout</p>
                <p className="text-xs text-slate-500">PBKDF2 Salted Encryption</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/help"
                className="btn-touch w-full py-2.5 px-4 bg-wealth-navy-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-wealth-navy-850 transition-colors shadow-xs"
              >
                <span>Access Support & Security Center</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
