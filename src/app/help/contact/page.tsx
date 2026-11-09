"use client";

import React from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { ChevronLeft, Phone, Mail, Clock, MapPin, Headphones } from 'lucide-react';

export default function HelpContactSubpage() {
  const { profile } = useClientData();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link
          href="/help"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Help Hub</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
          Direct Advisory & Support Directory
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Always reach a qualified private wealth professional without chatbot friction.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-wealth-gold-100 flex items-center justify-center">
            <Headphones className="w-6 h-6 text-wealth-gold-700" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-wealth-navy-950">{profile.adviserName}</h2>
            <p className="text-xs text-slate-500">Dedicated Wealth Advisor to Vicky Hernandez</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Direct Telephone</p>
              <p className="text-base font-bold text-wealth-navy-950 mt-0.5">{profile.adviserPhone}</p>
            </div>
            <a
              href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
              className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800"
            >
              Call Now
            </a>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Encrypted Email</p>
              <p className="text-base font-bold text-wealth-navy-950 mt-0.5">{profile.adviserEmail}</p>
            </div>
            <a
              href={`mailto:${profile.adviserEmail}`}
              className="btn-touch px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
