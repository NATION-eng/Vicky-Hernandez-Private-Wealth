"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { ShieldCheck, FileText, Lock, User, Clock } from 'lucide-react';
import Link from 'next/link';

import { getTexasGreeting } from '@/lib/texasTime';

export const DataStatusBanner: React.FC = () => {
  const { profile } = useClientData();
  const greeting = getTexasGreeting();

  return (
    <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-4 sm:p-6 transition-all relative overflow-hidden">
      {/* Subtle gold top hairline */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wealth-navy-950 via-wealth-gold-500 to-wealth-navy-950" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Avatar + Greeting + Status Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            href="/settings"
            className="group relative shrink-0" 
            title="Manage Profile Photo & Settings"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-wealth-gold-400/80 bg-wealth-navy-950 flex items-center justify-center shadow-luxury group-hover:border-wealth-gold-300 transition-all">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.preferredName} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="font-serif text-base sm:text-xl font-bold text-wealth-gold-300">
                  VH
                </span>
              )}
            </div>
          </Link>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950 tracking-tight leading-snug">
              {greeting}, <span className="font-semibold text-wealth-navy-950">{profile.preferredName}</span>
            </h1>

            {/* Icon Badges (replacing verbose paragraphs) */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>Custody Verified</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                <Lock className="w-3 h-3 text-slate-400" aria-hidden="true" />
                <span>{profile.accountNumberMasked}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200 hidden sm:inline-flex" title="Central Time (Texas)">
                <Clock className="w-3 h-3 text-slate-400" aria-hidden="true" />
                <span>Close: 3:30 PM CST</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls (symmetric 2-column grid on mobile) */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2.5 w-full sm:w-auto mt-1 sm:mt-0">
          <Link
            href="/documents"
            className="btn-touch px-3 sm:px-4 py-2.5 bg-wealth-navy-950 text-white rounded-xl text-xs font-bold hover:bg-wealth-navy-850 transition-all flex items-center justify-center gap-1.5 shadow-xs border border-wealth-navy-900"
            title="Access Official Documents & Custody Statements"
          >
            <FileText className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
            <span>Vault Documents</span>
          </Link>

          <Link
            href="/settings"
            className="btn-touch px-3 sm:px-4 py-2.5 bg-slate-100 text-slate-800 hover:text-slate-950 hover:bg-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-300 shadow-xs"
            title="Profile & Security Settings"
          >
            <User className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
            <span>Profile & Security</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
