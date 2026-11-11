"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { DashboardView } from '@/components/DashboardView';
import { 
  User, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function RootEntryPage() {
  const searchParams = useSearchParams();
  const { profile, isAuthenticated, login, sessionExpired } = useClientData();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isExpired = searchParams?.get('expired') === 'true' || sessionExpired;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(username.trim(), password);
      if (success) {
        // If a specific inner page was requested (e.g., /documents), navigate there
        const redirectPath = searchParams?.get('redirect');
        if (redirectPath && redirectPath !== '/' && redirectPath !== '/dashboard') {
          window.location.href = redirectPath;
          return;
        }
        // Otherwise, isAuthenticated is now true, instantly rendering DashboardView in-place!
        setIsLoading(false);
      } else {
        setErrorMessage("Invalid credentials. Please verify your username and password.");
        setIsLoading(false);
      }
    } catch {
      setErrorMessage("An unexpected network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // If authenticated, instantly render private dashboard in-place (no redirect lag, no loading freeze)
  if (isAuthenticated) {
    return <DashboardView />;
  }

  // Otherwise, render the secure Sign-In view
  return (
    <div className="max-w-md mx-auto my-6 sm:my-12 px-3 sm:px-0 animate-in fade-in-50 duration-200">
      <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/90 p-6 sm:p-10 relative overflow-hidden">
        {/* Luxury Gold Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wealth-navy-950 via-wealth-gold-500 to-wealth-navy-950" />
        
        {/* Crest & Client Identification */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-wealth-navy-900 to-wealth-navy-950 border-2 border-wealth-gold-400/80 shadow-luxury mx-auto flex items-center justify-center mb-3.5 relative overflow-hidden">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={profile.avatarUrl} 
                alt="Vicky Hernandez" 
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

          <span className="text-[10px] uppercase tracking-[0.28em] text-wealth-gold-800 font-bold bg-wealth-gold-50 px-3 py-1 rounded-full border border-wealth-gold-200 inline-block mb-2">
            Private Client Gateway
          </span>

          <h1 className="text-2xl font-bold font-display tracking-wider text-wealth-navy-950 uppercase">
            Client Sign-In
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
            Personalized Fiduciary Access for <strong>{profile.fullName}</strong>
          </p>
        </div>

        {/* Session Expired Notice */}
        {isExpired && (
          <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Your session has expired due to inactivity. Please sign in again.</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-900 font-medium">
            <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Secure Credentials Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="auth-username" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" aria-hidden="true" />
              <input
                id="auth-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500 transition-all placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" aria-hidden="true" />
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500 transition-all placeholder:text-slate-400 placeholder:font-normal"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 p-0.5"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Primary Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-touch w-full justify-center px-5 py-3.5 bg-wealth-navy-950 hover:bg-wealth-navy-850 active:scale-[0.99] text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2 border border-wealth-navy-900 disabled:opacity-60"
            >
              <span>{isLoading ? "Authenticating..." : "Sign In to Portfolio"}</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
            </button>
          </div>
        </form>

        {/* Institutional Trust Security Footnote */}
        <div className="mt-8 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>Institutional Global Custody • 256-Bit SSL Encrypted</span>
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Protected Institutional Fiduciary Session
          </p>
        </div>

      </div>
    </div>
  );
}
