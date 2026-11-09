"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useClientData } from '@/context/ClientDataContext';

export default function ContactPage() {
  const { profile } = useClientData();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-wealth-navy-950">
          Contact Advisory & Concierge
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Direct human contact channels for Vicky Hernandez and authorized delegates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Adviser Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-wealth-gold-600 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200">
              Primary Wealth Adviser
            </span>
            <h2 className="text-2xl font-serif font-bold text-wealth-navy-950 mt-2">
              {profile.adviserName}
            </h2>
            <p className="text-xs text-slate-500">Managing Director • Sterling Private Wealth</p>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-wealth-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Telephone</p>
                <a href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`} className="font-semibold text-wealth-navy-950 hover:underline">
                  {profile.adviserPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-wealth-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Secure Client Email</p>
                <a href={`mailto:${profile.adviserEmail}`} className="font-semibold text-wealth-navy-950 hover:underline">
                  {profile.adviserEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-wealth-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Consultation Hours</p>
                <p className="font-medium text-slate-800">Monday – Friday: 8:00 AM – 6:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Office & Concierge Desk */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              Private Office
            </span>
            <h2 className="text-2xl font-serif font-bold text-wealth-navy-950 mt-2">
              Advisory Headquarters
            </h2>
            <p className="text-xs text-slate-500">Sterling Private Wealth Advisors LLC</p>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Office Location</p>
                <p className="font-medium text-slate-800 leading-relaxed">
                  590 Madison Avenue, 32nd Floor<br />
                  New York, NY 10022<br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">24/7 Security Emergency</p>
                <a href="tel:+18005550199" className="font-bold text-red-700 hover:underline">
                  +1 (800) 555-0199 (Toll-Free)
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
