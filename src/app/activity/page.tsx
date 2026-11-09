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
  FileCheck
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
    <div className="space-y-8">
      
      {/* Activity Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-wealth-gold-600 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200">
                Audited Ledger
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Immutable Source Records
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
              Account Activity & Ledger
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Every activity entry is traceable to an institutional custodian identifier, timestamp, and plain-language explanation.
            </p>
          </div>

          <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
            <p className="font-bold text-wealth-navy-950">Fiduciary Guarantee:</p>
            <p>No invented transaction IDs or unverified entries.</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
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

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0" role="group" aria-label="Filter activity by type">
          {(['ALL', 'INTEREST', 'DIVIDEND', 'ADVISORY_FEE', 'PLAN_REVIEW'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              aria-pressed={filterType === type}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
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

      {/* Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Clock className="w-12 h-12 mx-auto text-slate-300 mb-2" aria-hidden="true" />
            <p className="font-semibold text-base">No account activity records found</p>
            <p className="text-xs text-slate-400 mt-1">
              {dataMode === 'PROPOSED_PLANNING' 
                ? 'Your account currently displays initial planning documents. Sourced activity will stream once live feeds synchronize.'
                : 'No activities matching your search criteria.'}
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

      {/* Activity Details Slide-Over / Modal */}
      {selectedActivity && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="activity-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wealth-navy-950/70 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-lg p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-wealth-gold-600" aria-hidden="true" />
                <h2 id="activity-modal-title" className="font-serif font-bold text-lg text-wealth-navy-950">
                  Activity Detail View
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="text-slate-400 hover:text-slate-700"
                aria-label="Close activity detail"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm text-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Transaction Title</span>
                <p className="text-lg font-bold font-serif text-wealth-navy-950">{selectedActivity.plainLanguageTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold uppercase">Date</span>
                  <p className="font-semibold text-slate-900 mt-0.5">{selectedActivity.date}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Status</span>
                  <p className="font-semibold text-emerald-800 mt-0.5">{selectedActivity.status}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Amount</span>
                  <p className="font-mono font-bold text-slate-900 mt-0.5">
                    {selectedActivity.amount !== null 
                      ? `${selectedActivity.amount >= 0 ? '+' : ''}$${Math.abs(selectedActivity.amount).toFixed(2)} ${selectedActivity.currency}` 
                      : 'Non-Monetary Event'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Source Custodian</span>
                  <p className="font-semibold text-slate-900 mt-0.5">{selectedActivity.custodianName}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Description</span>
                <p className="text-slate-700 leading-relaxed mt-1">{selectedActivity.details}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Source Identifier</span>
                <p className="font-mono text-xs text-slate-800 bg-slate-100 p-2 rounded border border-slate-200 mt-1">
                  {selectedActivity.sourceReference}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="btn-touch px-5 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800"
              >
                Close Detail
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
