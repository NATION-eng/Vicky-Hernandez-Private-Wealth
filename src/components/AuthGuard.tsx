"use client";

import React, { useEffect, useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { usePathname, useRouter } from 'next/navigation';
import { Lock, ShieldCheck, ArrowRight, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, login, profile } = useClientData();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [emailInput, setEmailInput] = useState(profile.email);
  const [passwordInput, setPasswordInput] = useState("••••••••••••");
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Public informational routes that don't disclose financial figures
  const publicPaths = ['/privacy', '/security', '/accessibility', '/about', '/contact', '/forgot-password'];
  const isPublicPath = publicPaths.includes(pathname);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(emailInput, passwordInput);
    if (success) {
      if (pathname === '/sign-in' || pathname === '/') {
        router.push('/dashboard');
      }
    } else {
      setError(true);
    }
  };

  // Quick 1-click authentication helper
  const handleDirectAccess = () => {
    login(profile.email, "demo-secure-access");
    if (pathname === '/sign-in' || pathname === '/') {
      router.push('/dashboard');
    }
  };

  if (!mounted) {
    return null; // Prevent hydration flash
  }

  // If user is authenticated or on an informational public page, render children
  if (isAuthenticated || isPublicPath) {
    return <>{children}</>;
  }

  // If NOT authenticated, enforce the mandatory Private Wealth Login Gateway
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-8 md:p-10 relative overflow-hidden">
        
        {/* Visual Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-wealth-navy-950 via-wealth-gold-500 to-wealth-navy-950" />

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-wealth-navy-950 text-wealth-gold-400 mx-auto flex items-center justify-center mb-4 shadow-md border-2 border-wealth-gold-400/40">
            <Lock className="w-7 h-7" aria-hidden="true" />
          </div>
          
          <span className="text-[11px] uppercase tracking-[0.25em] text-wealth-gold-700 font-bold bg-wealth-gold-50 px-3 py-1 rounded-full border border-wealth-gold-200 inline-block mb-2">
            Private Client Gateway
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">
            Client Authentication
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Please authenticate to access the private portfolio and verified documents for <strong>Vicky Hernandez</strong>.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="auth-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Registered Client Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="auth-pass" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Security Password
              </label>
              <span className="text-xs text-slate-400">Account: •••• 8920</span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
              <input
                id="auth-pass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
              <span>Authentication failed. Please check your credentials.</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="btn-touch w-full justify-center px-5 py-3 bg-wealth-navy-950 text-white rounded-xl text-sm font-bold hover:bg-wealth-navy-900 transition-all shadow-md flex items-center gap-2"
            >
              <span>Sign In to Private Portal</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
            </button>
          </div>

          {/* Quick Access Helper */}
          <div className="pt-3">
            <button
              type="button"
              onClick={handleDirectAccess}
              className="w-full py-2.5 px-3 bg-wealth-sand-100 hover:bg-wealth-sand-200 text-wealth-navy-950 rounded-lg text-xs font-semibold border border-wealth-sand-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
              <span>Direct Sign-In as Vicky Hernandez</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Northern Trust Institutional Fiduciary Custody Connected</span>
          </p>
        </div>

      </div>
    </div>
  );
};
