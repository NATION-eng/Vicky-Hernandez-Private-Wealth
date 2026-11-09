"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { VaultDocument } from '@/types/wealth';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  X, 
  FileDown, 
  Printer,
  Sparkles
} from 'lucide-react';

export default function DocumentsPage() {
  const { dataMode, documents, profile } = useClientData();
  const [selectedDoc, setSelectedDoc] = useState<VaultDocument | null>(null);

  const verifiedDocs = documents.filter((d) => !d.isSimulated);
  const demoDocs = documents.filter((d) => d.isSimulated);

  const handleDownload = (doc: VaultDocument) => {
    // Generate clean text/HTML downloadable statement simulation
    const watermarkText = doc.isSimulated 
      ? "DEMO SAMPLE — NOT AN OFFICIAL FINANCIAL STATEMENT" 
      : "VERIFIED CUSTODIAN RECORD — NORTHERN TRUST GLOBAL CUSTODY";

    const content = `
================================================================================
VICKY HERNANDEZ PRIVATE WEALTH | DOCUMENT VAULT
${watermarkText}
================================================================================
Document Title: ${doc.title}
Issuer / Custodian: ${doc.issuer}
Document Date: ${doc.documentDate}
Verification Status: ${doc.verificationStatus}
Account Client: ${profile.fullName} (${profile.accountNumberMasked})
Dedicated Fiduciary Adviser: ${profile.adviserName}
Generated: ${new Date().toISOString()}

STATEMENT SUMMARY:
This document certifies the asset valuation, allocations, and fiduciary 
records recorded in the client ledger for Vicky Hernandez.
================================================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      
      {/* Documents Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-wealth-gold-600 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200">
                Secure Document Vault
              </span>
              <span className="text-xs text-slate-500 font-medium">
                End-to-End Encrypted Storage
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
              Statements, Tax & Advisory Documents
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Access official custodian statements, tax forms, and advisory proposals. All simulated items are explicitly watermarked.
            </p>
          </div>

          <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
            <p className="font-bold text-wealth-navy-950">Retention Policy:</p>
            <p>Institutional 7-year audit archival guarantee.</p>
          </div>
        </div>
      </div>

      {/* Verified Official Documents Section */}
      <section aria-labelledby="verified-docs-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 id="verified-docs-title" className="text-xl font-serif font-bold text-wealth-navy-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              <span>Official Custodian & Planning Documents</span>
            </h2>
            <p className="text-xs text-slate-500">Official reports issued to Vicky Hernandez</p>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
            {verifiedDocs.length} Documents Available
          </span>
        </div>

        {verifiedDocs.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Clock className="w-10 h-10 mx-auto text-slate-300 mb-2" aria-hidden="true" />
            <p className="font-semibold text-sm">No verified custodian statements uploaded yet</p>
            <p className="text-xs text-slate-400 mt-1">First monthly statement will generate on month-end close.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {verifiedDocs.map((doc) => (
              <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-wealth-navy-50 border border-wealth-navy-200 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-wealth-navy-900" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-wealth-navy-950 font-serif">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Issued by <strong>{doc.issuer}</strong> • {doc.documentDate} • {doc.fileSize}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Status: {doc.verificationStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="btn-touch px-3 py-1.5 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="btn-touch px-3 py-1.5 bg-wealth-navy-950 text-white hover:bg-wealth-navy-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Simulated Demonstration Samples (PRD 7 & 9.7: Strict Separation) */}
      {demoDocs.length > 0 && (
        <section aria-labelledby="demo-docs-title" className="bg-red-50/50 rounded-xl shadow-sm border-2 border-red-200 p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-red-200">
            <div>
              <h2 id="demo-docs-title" className="text-xl font-serif font-bold text-red-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" aria-hidden="true" />
                <span>Simulated Training & Demo Documents</span>
              </h2>
              <p className="text-xs text-red-700">Strictly fictional templates for walkthrough training</p>
            </div>
            <span className="text-xs font-bold bg-red-200 text-red-900 px-2.5 py-1 rounded-full uppercase">
              Watermarked Samples
            </span>
          </div>

          <div className="divide-y divide-red-100">
            {demoDocs.map((doc) => (
              <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-800" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-red-950 font-serif">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-red-800 mt-0.5">
                      Sample Issuer: {doc.issuer} • {doc.documentDate} • {doc.fileSize}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-bold text-red-900 bg-red-200 px-2 py-0.5 rounded border border-red-300 uppercase">
                      SAMPLE — NOT A FINANCIAL STATEMENT
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="btn-touch px-3 py-1.5 bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="btn-touch px-3 py-1.5 bg-red-800 text-white hover:bg-red-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-red-200" aria-hidden="true" />
                    <span>Download Sample</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Document Previewer Modal */}
      {selectedDoc && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wealth-navy-950/80 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-wealth-navy-900 text-white flex items-center justify-between border-b border-wealth-navy-800">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-wealth-gold-400" aria-hidden="true" />
                <div>
                  <h3 id="preview-title" className="font-serif font-bold text-base">
                    Document Viewer
                  </h3>
                  <p className="text-xs text-slate-300">{selectedDoc.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white"
                aria-label="Close document preview"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Document Preview Content Canvas */}
            <div className="p-8 overflow-y-auto bg-slate-100 flex-1 relative font-serif text-slate-900">
              {/* Watermark Banner if Simulated */}
              {selectedDoc.isSimulated && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 rotate-[-30deg]">
                  <p className="text-6xl font-sans font-black text-red-600 uppercase tracking-widest text-center border-8 border-red-600 p-6">
                    SAMPLE — NOT A FINANCIAL STATEMENT
                  </p>
                </div>
              )}

              <div className="bg-white p-8 rounded-lg shadow border border-slate-300 max-w-xl mx-auto space-y-6">
                <div className="border-b-2 border-wealth-navy-950 pb-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-wealth-navy-950">VICKY HERNANDEZ</h2>
                    <p className="text-xs uppercase font-sans tracking-widest text-wealth-gold-700">Private Wealth Portfolio Statement</p>
                  </div>
                  <div className="text-right text-xs font-sans text-slate-500">
                    <p>Date: {selectedDoc.documentDate}</p>
                    <p>Account: {profile.accountNumberMasked}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm font-sans">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Issuer / Custodian:</span>
                    <span className="font-semibold text-slate-900">{selectedDoc.issuer}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Verification Status:</span>
                    <span className="font-semibold text-emerald-800">{selectedDoc.verificationStatus}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Certified Client Name:</span>
                    <span className="font-semibold text-slate-900">{profile.fullName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Adviser Oversight:</span>
                    <span className="font-semibold text-slate-900">{profile.adviserName}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs font-sans text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-900 mb-1">Fiduciary Endorsement Notice:</p>
                  <p>
                    This statement confirms recorded asset valuations, transaction histories, and advisory fees. For full certified archives, contact your representative.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-touch px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Print Document</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="btn-touch px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(selectedDoc)}
                  className="btn-touch px-5 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
                  <span>Download Secure Copy</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
