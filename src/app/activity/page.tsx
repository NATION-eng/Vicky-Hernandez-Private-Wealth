"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { AccountActivity } from '@/types/wealth';
import { 
  History, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowDownRight, 
  ArrowUpRight, 
  Landmark,
  FileCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function ActivityPage() {
  const { dataMode, activities } = useClientData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedActivity, setSelectedActivity] = useState<AccountActivity | null>(null);

  const filteredActivities = activities.filter((act) => {
    const matchesSearch = act.plainLanguageTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          act.sourceReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          act.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "ALL" || act.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Activity Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-wealth-gold-700 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200 flex items-center gap-1">
                <History className="w-3 h-3 text-wealth-gold-600" />
                <span>Audited Ledger</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Immutable Source Records
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">
              Account Activity
            </h1>
          </div>

          <div className="text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-emerald-800 font-semibold flex items-center gap-1.5 w-fit">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Custodian Sourced</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity by title or reference ID..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar" role="group" aria-label="Filter activity by type">
          {(['ALL', 'INTEREST', 'DIVIDEND', 'ADVISORY_FEE', 'PLAN_REVIEW'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              aria-pressed={filterType === type}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                filterType === type
                  ? 'bg-wealth-navy-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Activity Card View (Visible on < md) */}
      <div className="block md:hidden space-y-3.5">
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500">
            <Clock className="w-10 h-10 mx-auto text-slate-300 mb-2" aria-hidden="true" />
            <p className="font-semibold text-sm">No activity records on file</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchQuery ? 'No activities matching your search criteria.' : 'Clean data state initialized. Settled transactions will appear upon capital deployment.'}
            </p>
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              onClick={() => setSelectedActivity(act)}
              className="bg-white rounded-xl shadow-luxury border border-slate-200/90 p-4 transition-all hover:border-wealth-gold-400/50 cursor-pointer active:bg-slate-50"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedActivity(act);
                }
              }}
              aria-label={`View details for ${act.plainLanguageTitle}`}
            >
              {/* Header: Date + Status Badge */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <span className="font-semibold text-slate-500">{act.date}</span>
                <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded-full ${
                  act.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                  act.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {act.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />}
                  <span>{act.status}</span>
                </span>
              </div>

              {/* Title & Amount */}
              <div className="py-2.5 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-base text-wealth-navy-950 leading-snug">
                    {act.plainLanguageTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {act.details}
                  </p>
                </div>
                {act.amount !== null && (
                  <div className="text-right shrink-0">
                    <span className={`font-mono font-bold text-base tabular-nums ${
                      act.amount >= 0 ? 'text-emerald-700' : 'text-slate-800'
                    }`}>
                      {act.amount >= 0 ? '+' : ''}${Math.abs(act.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">USD</span>
                  </div>
                )}
              </div>

              {/* Bottom Reference & Tap Prompt */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600">
                  Ref: {act.sourceReference}
                </span>
                <span className="text-wealth-gold-700 font-bold flex items-center gap-0.5">
                  <span>View Audit Proof</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Activity Table (Hidden on mobile, visible on md+) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Clock className="w-12 h-12 mx-auto text-slate-300 mb-2" aria-hidden="true" />
            <p className="font-semibold text-base">No account activity records on file</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchQuery 
                ? 'No activities matching your search criteria.' 
                : 'All financial activity initializes at a clean baseline ($0.00). Sourced custodial records will appear following capital deployment.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse" aria-label="Account Activity List">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50 text-xs font-bold uppercase text-wealth-navy-950">
                  <th scope="col" className="py-3 px-4">Date</th>
                  <th scope="col" className="py-3 px-4">Activity Description</th>
                  <th scope="col" className="py-3 px-3">Type</th>
                  <th scope="col" className="py-3 px-3">Status</th>
                  <th scope="col" className="py-3 px-4 text-right">Amount</th>
                  <th scope="col" className="py-3 px-4 text-right">Source Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredActivities.map((act) => (
                  <tr 
                    key={act.id} 
                    onClick={() => setSelectedActivity(act)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedActivity(act);
                      }
                    }}
                    aria-label={`View details for ${act.plainLanguageTitle}`}
                  >
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-600 whitespace-nowrap">
                      {act.date}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-wealth-navy-950 group-hover:text-wealth-gold-700 transition-colors">
                      <p>{act.plainLanguageTitle}</p>
                      <p className="text-xs font-normal text-slate-500 line-clamp-1">{act.details}</p>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[11px]">
                        {act.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-xs">
                      <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${
                        act.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                        act.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {act.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />}
                        {act.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">
                      {act.amount !== null ? (
                        <span className={act.amount >= 0 ? 'text-emerald-700' : 'text-slate-800'}>
                          {act.amount >= 0 ? '+' : ''}${Math.abs(act.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} {act.currency}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs font-mono text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {act.sourceReference}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Activity Details Modal / Slide-Over */}
      {selectedActivity && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="activity-modal-title"
          className="fixed inset-0 z-50 flex items-center sm:items-center justify-center p-3 sm:p-4 bg-wealth-navy-950/70 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-wealth-gold-600" aria-hidden="true" />
                <h2 id="activity-modal-title" className="font-serif font-bold text-lg text-wealth-navy-950">
                  Activity Detail & Provenance
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                aria-label="Close activity detail"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Activity Title</span>
                <h3 className="text-xl font-serif font-bold text-wealth-navy-950 mt-0.5">
                  {selectedActivity.plainLanguageTitle}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500">Execution Date:</span>
                  <p className="font-bold text-wealth-navy-950 mt-1">{selectedActivity.date}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500">Status:</span>
                  <p className="font-bold text-emerald-800 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedActivity.status}</span>
                  </p>
                </div>
              </div>

              {selectedActivity.amount !== null && (
                <div className="bg-wealth-navy-950 text-white p-4 rounded-xl">
                  <span className="text-xs font-semibold text-wealth-gold-400 uppercase tracking-wider">
                    Recorded Cash Settlement
                  </span>
                  <p className="text-2xl font-serif font-bold mt-1">
                    {selectedActivity.amount >= 0 ? '+' : ''}${Math.abs(selectedActivity.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} {selectedActivity.currency}
                  </p>
                </div>
              )}

              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Details & Explanation</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  {selectedActivity.details}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p><strong>Institution Custodian:</strong> Institutional Global Custody</p>
                <p><strong>Ledger Audit ID:</strong> <span className="font-mono text-slate-700">{selectedActivity.sourceReference}</span></p>
                <p><strong>Compliance Status:</strong> Verified DTC/Federal Reserve Settled Record</p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="btn-touch w-full py-2.5 px-4 bg-wealth-navy-950 text-white rounded-xl text-xs font-bold hover:bg-wealth-navy-800 transition-colors justify-center"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
