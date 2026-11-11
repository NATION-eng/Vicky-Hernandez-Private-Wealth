"use client";

import React from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { ChevronLeft, ShieldCheck, Landmark, Lock, FileText, ArrowRight } from 'lucide-react';

export default function HelpContactSubpage() {
  const { profile } = useClientData();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link
          href="/help"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Help Hub</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
          Institutional Custody & Fiduciary Administration
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Segregated custody and administration directory for Vicky Hernandez.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center">
            <Landmark className="w-6 h-6 text-emerald-700" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-wealth-navy-950">Institutional Global Custody</h2>
            <p className="text-xs text-slate-500">Tier-1 Institutional Custodian to Vicky Hernandez</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Custodial Account</p>
              <p className="text-base font-bold text-wealth-navy-950 mt-0.5">{profile.accountNumberMasked}</p>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full">
              Status: Active
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Custodial Statements</p>
              <p className="text-sm text-slate-600 mt-0.5">Access official statements directly in your secure vault.</p>
            </div>
            <Link
              href="/documents"
              className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-bold hover:bg-wealth-navy-800 flex items-center gap-1.5"
            >
              <span>View Vault</span>
              <ArrowRight className="w-3.5 h-3.5 text-wealth-gold-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
