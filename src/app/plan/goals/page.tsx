"use client";

import React from 'react';
import Link from 'next/link';
import { useClientData } from '@/context/ClientDataContext';
import { Target, ChevronLeft, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function PlanGoalsPage() {
  const { goals } = useClientData();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/plan"
          className="text-xs font-semibold text-wealth-navy-950 hover:text-wealth-gold-700 flex items-center gap-1 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to My Plan</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
          Stated Wealth Goals & Objectives
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Detailed long-term objectives formulated for Vicky Hernandez.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => (
          <div key={g.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-wealth-gold-700 bg-wealth-gold-100 px-2.5 py-0.5 rounded border border-wealth-gold-300">
                  Horizon: {g.targetHorizon}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  {g.currentStatus.replace('_', ' ')}
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-wealth-navy-950">{g.title}</h2>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{g.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Detailed Assumptions:</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {g.assumptions.map((ass, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{ass}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
