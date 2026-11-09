"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  Sparkles, 
  Phone, 
  AlertCircle 
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { profile, isAuthenticated, login } = useClientData();
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // If already authenticated, redirect directly to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const success = login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  const handleOneTouchAccess = () => {
    setIsLoading(true);
    login(profile.email, "demo-secure-access");
    router.push('/dashboard');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <div className="w-5 h-5 border-2 border-wealth-gold-500 border-t-transparent rounded-full animate-spin" />
          <span>Opening private dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-6 sm:my-10 px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden">
        {/* Luxury Gold Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wealth-navy-950 via-wealth-gold-500 to-wealth-navy-950" />
        
        {/* Crest & Client Identification */}
        <div className="text-center mb-7">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-wealth-navy-900 to-wealth-navy-950 border-2 border-wealth-gold-400/80 shadow-luxury mx-auto flex items-center justify-center mb-3.5 relative overflow-hidden">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={profile.avatarUrl} 
                alt={profile.preferredName} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-12 h-12 rounded-full border border-wealth-gold-500/40 flex items-center justify-center">
                <span className="font-serif text-lg font-bold tracking-tight text-wealth-gold-300">
                  VH
                </span>
              </div>
            )}
          </div>

          <span className="text-[10px] uppercase tracking-[0.28em] text-wealth-gold-700 font-bold bg-wealth-gold-50 px-3 py-1 rounded-full border border-wealth-gold-200 inline-block mb-2">
            Private Client Gateway
          </span>

          <h1 className="text-xl sm:text-2xl font-display font-semibold tracking-wider text-wealth-navy-950 uppercase">
            Client Sign-In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Personalized Fiduciary Access for <strong>{profile.fullName}</strong>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Authentication failed. Please verify credentials or contact your adviser.</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="signin-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Registered Client Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
              <input
                id="signin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="signin-pass" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password or Passkey
              </label>
              <Link href="/forgot-password" className="text-xs font-semibold text-wealth-gold-700 hover:underline">
                Forgot passkey?
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
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 font-mono transition-all"
              />
            </div>
          </div>

          {/* Primary Sign In Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-touch w-full justify-center px-5 py-3 bg-wealth-navy-950 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-wealth-navy-850 active:scale-[0.99] transition-all shadow-sm flex items-center gap-2 border border-wealth-navy-900"
            >
              <span>{isLoading ? "Authenticating..." : "Access Private Dashboard"}</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
            </button>
          </div>

          {/* Quick One-Touch Fiduciary Fast-Track */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleOneTouchAccess}
              className="btn-touch w-full py-2.5 px-3 bg-gradient-to-r from-wealth-gold-500/20 via-wealth-gold-500/10 to-wealth-gold-500/20 hover:from-wealth-gold-500/30 hover:to-wealth-gold-500/30 text-wealth-navy-950 rounded-xl text-xs font-bold border border-wealth-gold-400/50 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-wealth-gold-700" aria-hidden="true" />
              <span>One-Touch Access as Vicky Hernandez</span>
            </button>
          </div>
        </form>

        {/* Lead Adviser Direct Hotline */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="text-[11px] text-slate-400">Need assistance?</span>
          <a
            href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
            className="font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
            <span>Call Adviser Hotline</span>
          </a>
        </div>

        {/* Institutional Trust Security Footnote */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>Northern Trust Global Custody • 256-Bit SSL Encrypted</span>
          </p>
        </div>

      </div>
    </div>
  );
}
