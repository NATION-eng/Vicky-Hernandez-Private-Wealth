"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Accessibility, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HelpAccessibilitySubpage() {
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
          Accessibility & Viewing Assistance
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          How to configure the portal for maximum visual comfort and assistive technologies.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Vicky Hernandez Private Wealth has been designed from the ground up to meet <strong>WCAG 2.2 AA</strong> standards. Older adults, family members with low vision, and users relying on screen magnification or keyboard-only navigation can access all functions.
          </p>

          <div className="p-4 bg-wealth-sand-50 rounded-xl border border-wealth-sand-200 space-y-2">
            <h3 className="font-bold text-wealth-navy-950 font-serif">Quick Accessibility Stepper (Top of Screen)</h3>
            <p className="text-xs text-slate-600">
              You can adjust text magnification between 100%, 125%, and 150%, activate High Contrast (black on white), or toggle Night mode at any time using the persistent Viewing Assistance bar.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <Link
              href="/accessibility"
              className="btn-touch px-5 py-2.5 bg-wealth-navy-950 text-white rounded-xl text-xs font-semibold hover:bg-wealth-navy-800 flex items-center gap-2"
            >
              <span>Read Full Accessibility Statement</span>
              <ArrowRight className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
            </Link>

            <Link
              href="/settings"
              className="text-xs font-bold text-wealth-gold-700 hover:underline"
            >
              Go to Display Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
