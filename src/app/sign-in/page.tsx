"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { profile, recordAudit } = useClientData();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("••••••••••••");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    recordAudit("AUTHENTICATED_LOGIN_SUCCESS", "PORTAL_AUTHENTICATION", "SUCCESS");
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-wealth-navy-950 text-wealth-gold-400 mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-wealth-navy-950">
            Client Portal Sign-In
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Secure private wealth access for Vicky Hernandez
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="signin-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
              <input
                id="signin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="signin-pass" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password or Passkey
              </label>
              <Link href="/forgot-password" className="text-xs font-semibold text-wealth-gold-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
              <input
                id="signin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn-touch w-full justify-center px-5 py-3 bg-wealth-navy-950 text-white rounded-xl text-sm font-bold hover:bg-wealth-navy-800 transition-colors shadow-sm flex items-center gap-2"
            >
              <span>Access Private Dashboard</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>256-bit TLS encrypted session • Biometrics supported</span>
          </p>
        </div>

      </div>
    </div>
  );
}
