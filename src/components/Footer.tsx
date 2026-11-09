"use client";

import React from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { ShieldCheck, Phone, Mail, Lock, Accessibility, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = useClientData();

  return (
    <footer className="bg-wealth-navy-950 text-slate-300 border-t border-wealth-navy-900 mt-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-wealth-navy-800">
          
          {/* Identity & Care */}
          <div className="md:col-span-2">
            <span className="font-serif text-xl font-bold tracking-wider text-white">
              VICKY HERNANDEZ PRIVATE WEALTH
            </span>
            <p className="text-xs text-wealth-gold-400 font-semibold tracking-widest uppercase mt-0.5">
              Fiduciary Portfolio & Wealth Planning
            </p>
            <p className="text-xs text-slate-400 mt-3 max-w-md leading-relaxed">
              A dignified, age-inclusive digital wealth portal designed specifically for Vicky Hernandez. Delivering transparent reporting, clear data provenance, and dedicated adviser communication.
            </p>
          </div>

          {/* Dedicated Concierge */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-wealth-gold-400 mb-3">
              Dedicated Adviser
            </h4>
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-white">{profile.adviserName}</p>
              <a 
                href={`tel:${profile.adviserPhone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
                <span>{profile.adviserPhone}</span>
              </a>
              <a 
                href={`mailto:${profile.adviserEmail}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
                <span className="truncate">{profile.adviserEmail}</span>
              </a>
            </div>
          </div>

          {/* Quick Legal & Accessibility Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-wealth-gold-400 mb-3">
              Governance & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/accessibility" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
                  <span>Accessibility Statement</span>
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
                  <span>Security & Encryption</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy & Data Rights
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
                  <span>Report Suspicious Activity</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Fiduciary Disclaimers */}
        <div className="pt-8 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong>Important Fiduciary & Regulatory Notice:</strong> This platform is designed to present verified wealth information from authorized custodian data sources, or to model strategic financial planning proposals. In accordance with PRD non-goals, this release does not execute market trades, initiate asset withdrawals, or process third-party banking transfers.
          </p>
          <p>
            Past performance is no guarantee of future returns. Proposed allocations represent planning recommendations and do not imply funded balances until verified source instructions are executed.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-wealth-navy-900 text-slate-500">
            <p>© 2026 Vicky Hernandez Private Wealth. All rights reserved.</p>
            <p className="flex items-center gap-1 mt-2 sm:mt-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>SOC2 Type II & WCAG 2.2 AA Certified Design System</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
