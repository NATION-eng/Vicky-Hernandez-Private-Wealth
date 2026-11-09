"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { ShieldCheck, Lock, AlertCircle, KeyRound, ArrowRight } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const { verifyStepUp, isStepUpVerified } = useClientData();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyStepUp(passcode);
    if (success) {
      router.push('/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-wealth-navy-100 text-wealth-navy-950 mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-wealth-navy-950">
            Step-Up Identity Verification
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Extra layer of protection for sensitive private wealth actions
          </p>
        </div>

        {isStepUpVerified ? (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" aria-hidden="true" />
              <p className="font-bold text-base">Identity Verified</p>
              <p className="text-xs text-emerald-800 mt-1">Your session is authenticated for sensitive operations.</p>
            </div>
            <Link
              href="/dashboard"
              className="btn-touch px-5 py-2.5 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 inline-flex items-center gap-2"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Please enter your 4-digit security code or the last 4 digits of your client account number (<strong className="font-mono text-slate-900">8920</strong>).
            </p>

            <div>
              <label htmlFor="verify-code" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Passcode (8920)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                <input
                  id="verify-code"
                  type="password"
                  maxLength={6}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="8920"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-base font-mono tracking-widest text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
                <span>Incorrect passcode. Please enter 8920 or contact support.</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={passcode.trim().length === 0}
                className="btn-touch w-full justify-center px-5 py-3 bg-wealth-navy-950 text-white rounded-xl text-sm font-bold hover:bg-wealth-navy-800 transition-colors shadow-sm disabled:opacity-50"
              >
                Authenticate Session
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
