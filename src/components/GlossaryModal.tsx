"use client";

import React, { useState } from 'react';
import { FINANCIAL_GLOSSARY, GlossaryTerm } from '@/data/glossary';
import { BookOpen, Search, X, CheckCircle, HelpCircle } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTerm?: string;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTerm = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  if (!isOpen) return null;

  const categories = ["ALL", "Allocation", "Performance", "Safety & Fiduciary", "General"];

  const filteredTerms = FINANCIAL_GLOSSARY.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="glossary-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wealth-navy-950/70 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-wealth-navy-900 text-white flex items-center justify-between border-b border-wealth-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-wealth-gold-500/20 border border-wealth-gold-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-wealth-gold-400" aria-hidden="true" />
            </div>
            <div>
              <h2 id="glossary-dialog-title" className="text-xl font-serif font-bold tracking-tight">
                Plain-English Financial Glossary
              </h2>
              <p className="text-xs text-slate-300">
                Clear definitions and everyday examples for private wealth terms.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-wealth-navy-800 transition-colors"
            aria-label="Close financial glossary"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a term (e.g., allocation, bond, fees)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter terms by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-wealth-navy-900 text-white' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-6 overflow-y-auto divide-y divide-slate-100 space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-400 mb-2" aria-hidden="true" />
              <p className="font-semibold text-base">No definitions found for &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Try another search term or browse all categories.</p>
            </div>
          ) : (
            filteredTerms.map((term, idx) => (
              <div key={idx} className="pt-4 first:pt-0">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-lg font-bold text-wealth-navy-950 font-serif">
                    {term.term}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-wealth-gold-700 bg-wealth-gold-50 px-2 py-0.5 rounded border border-wealth-gold-200">
                    {term.category}
                  </span>
                </div>
                
                <p className="text-sm text-slate-800 leading-relaxed font-sans">
                  {term.definition}
                </p>

                <div className="mt-2 bg-slate-50 border-l-4 border-wealth-gold-500 p-2.5 rounded-r text-xs text-slate-700">
                  <strong className="text-wealth-gold-900">Everyday Example:</strong> {term.seniorExample}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Need more details? You can always contact Katherine Sterling directly.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="btn-touch px-5 py-2 bg-wealth-navy-900 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800"
          >
            Close Dictionary
          </button>
        </div>

      </div>
    </div>
  );
};
