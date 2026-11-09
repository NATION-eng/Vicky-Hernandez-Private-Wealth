"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { ShieldCheck, Clock, AlertCircle, Phone, Calendar, Info } from 'lucide-react';

export const DataStatusBanner: React.FC = () => {
  const { dataMode, profile } = useClientData();

  // Compute greeting based on local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Client Identity & Respectful Greeting */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-widest text-wealth-gold-600 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200">
              Private Client Portal
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Account: {profile.accountNumberMasked}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
            {getGreeting()}, {profile.preferredName}.
          </h1>
          <p className="text-slate-600 text-sm mt-0.5">
            Your personalized wealth planning overview and verified portfolio records.
          </p>
        </div>

        {/* Right: Data Provenance & Verification Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          
          {dataMode === 'LIVE_VERIFIED' && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 text-emerald-900 flex items-start gap-2.5 max-w-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Verified Custodian Feed
                </p>
                <p className="text-xs font-medium text-emerald-700">
                  Data reconciled as of today, 04:30 PM EST via Northern Trust Global Custody.
                </p>
              </div>
            </div>
          )}

          {dataMode === 'PROPOSED_PLANNING' && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-amber-900 flex items-start gap-2.5 max-w-sm">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Advisory Plan Status
                </p>
                <p className="text-xs font-medium text-amber-700">
                  Displaying approved planning framework. Custodian records not yet synchronized.
                </p>
              </div>
            </div>
          )}

          {dataMode === 'DEMO_SIMULATED' && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-900 flex items-start gap-2.5 max-w-sm">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-800">
                  Simulated Model Dataset
                </p>
                <p className="text-xs font-medium text-red-700">
                  Synthetic holdings for demonstration and training only.
                </p>
              </div>
            </div>
          )}

          {/* Quick Direct Link to Dedicated Adviser */}
          <a
            href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
            className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 transition-colors flex items-center gap-2 border border-wealth-navy-900 whitespace-nowrap shadow-sm"
            aria-label={`Call adviser ${profile.adviserName}`}
          >
            <Phone className="w-4 h-4 text-wealth-gold-300" aria-hidden="true" />
            <span>Call {profile.adviserName.split(',')[0]}</span>
          </a>

        </div>

      </div>
    </div>
  );
};
