"use client";

import React from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { AccessibleDonutChart } from '@/components/AccessibleDonutChart';
import { AccessiblePerformanceChart } from '@/components/AccessiblePerformanceChart';
import { 
  AlertTriangle, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  Download, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function DemoPage() {
  const { dataMode, setDataMode, assetAllocations, performanceHistory, holdings } = useClientData();

  return (
    <div className="space-y-8">
      
      {/* Demo Explanatory Hero Card */}
      <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 border border-red-300 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-700" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-extrabold tracking-widest text-red-900 bg-red-200 px-2.5 py-0.5 rounded border border-red-300">
                SANDBOX SIMULATION
              </span>
              <span className="text-xs text-red-800 font-semibold">
                PRD Section 7 Technical Isolation Mandate
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-red-950">
              Interactive Fictional Demonstration Sandbox
            </h1>

            <p className="text-sm text-red-900 mt-2 max-w-3xl leading-relaxed">
              This sandbox is provided for visual walkthroughs, executive evaluation, and digital training. All figures, securities, and performance lines shown here are strictly synthetic and watermarked. They do not connect to real financial institutions or client bank accounts.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {dataMode !== 'DEMO_SIMULATED' ? (
                <button
                  type="button"
                  onClick={() => setDataMode('DEMO_SIMULATED')}
                  className="btn-touch px-5 py-2.5 bg-red-800 text-white rounded-lg text-xs font-bold hover:bg-red-900 transition-colors shadow flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" aria-hidden="true" />
                  <span>Activate Demo Simulation Dataset</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-red-200 text-red-950 text-xs font-extrabold border border-red-400">
                    Active: Simulated Dataset
                  </span>
                  <button
                    type="button"
                    onClick={() => setDataMode('PROPOSED_PLANNING')}
                    className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Return to Client Baseline Mode</span>
                  </button>
                </div>
              )}

              <Link
                href="/dashboard"
                className="btn-touch px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <span>Go to Main Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Visual Components Showcase */}
      {dataMode === 'DEMO_SIMULATED' ? (
        <div className="space-y-8">
          <AccessibleDonutChart 
            allocations={assetAllocations} 
            title="Simulated Asset Class Model (Demo)"
            isSimulated={true}
          />

          <AccessiblePerformanceChart 
            performanceHistory={performanceHistory}
            isSimulated={true}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" aria-hidden="true" />
          <h2 className="text-xl font-serif font-bold text-wealth-navy-950">
            Sandbox Currently Inactive
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            Click <strong>"Activate Demo Simulation Dataset"</strong> above to preview how the portfolio, performance curves, and asset classes render when populated with synthetic data.
          </p>
        </div>
      )}

      {/* Demo Export Watermark Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-xs text-slate-600 space-y-2">
        <h3 className="font-bold text-slate-900 text-sm">Regulatory Notice Regarding Demonstrations:</h3>
        <p>
          Per PRD Section 7, all exports, printouts, and snapshots generated in this mode carry an immutable watermark: <code>SAMPLE — NOT A FINANCIAL STATEMENT</code>. The system enforces technical isolation between simulated fixtures and production accounts.
        </p>
      </div>

    </div>
  );
}
