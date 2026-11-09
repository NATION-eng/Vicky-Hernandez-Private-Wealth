"use client";

import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, KeyRound, Server, FileText, ArrowLeft } from 'lucide-react';

export default function SecurityPage() {
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
          Security, Encryption & Fiduciary Safeguards
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Architectural security controls engineered to protect high-net-worth client records.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Defense-in-Depth Architecture
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Every transaction, plan proposal, and document within Vicky Hernandez Private Wealth is protected using institutional-grade cryptography and least-privilege role isolation.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
              <Lock className="w-4 h-4 text-wealth-gold-600" aria-hidden="true" />
              <span>TLS 1.3 & AES-256 Storage</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All communications in transit are encrypted via TLS 1.3 with forward secrecy. Sourced custodian records and documents at rest are encrypted with AES-256 keys managed in secure hardware modules.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Step-Up Authentication (FR-11)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modifications to security preferences, trusted delegates, or exports of certified tax forms require re-authentication or explicit step-up verification.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
              <Server className="w-4 h-4 text-wealth-navy-800" aria-hidden="true" />
              <span>Isolated Demo Sandbox (FR-02)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Demonstration and narrative training fixtures are technically segmented at the API and database levels. Simulated data cannot pollute production client ledgers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-sm text-wealth-navy-950 mb-1">
              <FileText className="w-4 h-4 text-wealth-gold-600" aria-hidden="true" />
              <span>Immutable Audit Trail (Section 10)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All logins, profile changes, and document downloads generate immutable audit events recording actor, timestamp, and IP address for forensic compliance.
            </p>
          </div>
        </div>

        <section className="pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
          <p>
            <strong>Zero Direct Trading Exposure (PRD Non-Goal):</strong> Because this release does not process electronic fund transfers or open market executions, your custodian accounts remain insulated from unauthorized money movements.
          </p>
        </section>
      </div>
    </div>
  );
}
