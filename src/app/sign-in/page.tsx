"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { profile, login } = useClientData();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("••••••••••••");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    router.push('/dashboard');
  };

  const handleQuickLogin = () => {
    login(profile.email, "demo-secure-access");
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wealth-navy-950 via-wealth-gold-500 to-wealth-navy-950" />
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wealth-navy-900 to-wealth-navy-950 border-2 border-wealth-gold-400/80 shadow-luxury mx-auto flex items-center justify-center mb-4 relative">
            <div className="w-12 h-12 rounded-full border border-wealth-gold-500/40 flex items-center justify-center">
              <span className="font-serif text-lg font-bold tracking-tight text-wealth-gold-300">
                VH
              </span>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-wealth-gold-700 font-bold bg-wealth-gold-50 px-3 py-1 rounded-full border border-wealth-gold-200 inline-block mb-2">
            Private Client Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-semibold tracking-wider text-wealth-navy-950 uppercase">
            Client Sign-In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Secure private wealth access for <strong>Vicky Hernandez</strong>
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

          {/* Quick One-Click Login */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2.5 px-3 bg-wealth-sand-100 hover:bg-wealth-sand-200 text-wealth-navy-950 rounded-lg text-xs font-semibold border border-wealth-sand-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
              <span>One-Click Sign-In as Vicky Hernandez</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>256-bit TLS encrypted session • Northern Trust Sourced</span>
          </p>
        </div>

      </div>
    </div>
  );
}
