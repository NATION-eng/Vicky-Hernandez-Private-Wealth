"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { KeyRound, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { profile } = useClientData();
  const [email, setEmail] = useState(profile.email);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-wealth-gold-100 text-wealth-gold-800 mx-auto flex items-center justify-center mb-3">
            <KeyRound className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-wealth-navy-950">
            Account Recovery
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Secure password reset for Vicky Hernandez
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-sm">Recovery Link Transmitted</p>
                <p className="text-xs text-emerald-800 mt-1">
                  We sent an encrypted recovery instruction to <strong>{email}</strong>. Please follow the instructions to restore portal access.
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/sign-in"
                className="btn-touch px-5 py-2.5 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Return to Sign-In</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your registered client email address. We will verify your identity and send a secure, one-time recovery link.
            </p>

            <div>
              <label htmlFor="recovery-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Client Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                <input
                  id="recovery-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-touch w-full justify-center px-5 py-3 bg-wealth-navy-950 text-white rounded-xl text-sm font-bold hover:bg-wealth-navy-800 transition-colors shadow-sm"
              >
                Send Recovery Link
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link href="/sign-in" className="font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Sign-In</span>
              </Link>

              <span className="text-slate-400 font-semibold">Institutional Custody</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
