"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { ShieldCheck, Phone, Clock, ArrowRight } from 'lucide-react';

export const DataStatusBanner: React.FC = () => {
  const { profile } = useClientData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-6 md:p-8 transition-colors relative overflow-hidden">
      {/* Subtle gold top hairline */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wealth-navy-950 via-wealth-gold-500 to-wealth-navy-950" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left: Salutation & Identity */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-wealth-gold-700 bg-wealth-gold-50 px-2.5 py-0.5 rounded border border-wealth-gold-200">
              Verified Private Portfolio
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Account: {profile.accountNumberMasked}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-wealth-navy-950">
            {getGreeting()}, <span className="font-semibold italic text-wealth-navy-950">{profile.preferredName}.</span>
          </h1>

          <p className="text-slate-500 text-sm mt-1 max-w-xl font-sans leading-relaxed">
            Personalized wealth preservation overview, verified against institutional custodian records.
          </p>
        </div>

        {/* Right: Data Provenance Card & Direct Helpline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 flex items-start gap-3 max-w-sm">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Northern Trust Custody
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Reconciled as of today, 04:30 PM EST. Real-time pricing confirmed.
              </p>
            </div>
          </div>

          {/* Quick Direct Link to Dedicated Adviser */}
          <a
            href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
            className="btn-touch px-4 py-2.5 bg-wealth-navy-950 text-white rounded-xl text-xs font-semibold hover:bg-wealth-navy-850 transition-all flex items-center gap-2 border border-wealth-navy-900 shadow-sm whitespace-nowrap"
            aria-label={`Call adviser ${profile.adviserName}`}
          >
            <Phone className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
            <span>Call Katherine Sterling</span>
          </a>

        </div>

      </div>
    </div>
  );
};
