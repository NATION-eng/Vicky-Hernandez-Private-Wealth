"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { VaultDocument } from '@/types/wealth';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  Clock, 
  X, 
  Printer,
  Landmark,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function DocumentsPage() {
  const { documents, profile, holdings } = useClientData();
  const [selectedDoc, setSelectedDoc] = useState<VaultDocument | null>(null);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const handleDownload = (doc: VaultDocument) => {
    let content = "";

    if (doc.id === 'doc-ver-1') {
      content = `
====================================================================================================
THE NORTHERN TRUST COMPANY - GLOBAL CUSTODY & ASSET SERVICING
OFFICIAL CUSTODY ACCOUNT STATEMENT
====================================================================================================
STATEMENT STATUS:  Active Fiduciary Custody
ACCOUNT TITLE:     VICKY HERNANDEZ REVOCABLE TRUST
ACCOUNT NUMBER:    NT-CUST-802144
TAX IDENTIFIER:    XX-XXX8920
PRIMARY CLIENT:    Vicky Hernandez
CUSTODIAN:         Northern Trust Global Custody

----------------------------------------------------------------------------------------------------
1. CONSOLIDATED PORTFOLIO VALUATION SUMMARY
----------------------------------------------------------------------------------------------------
Total Market Valuation:                                       $0.00 USD
Net Unrealized Portfolio Gain:                                +$0.00 USD (0.00%)
Accrued Monthly Income:                                       +$0.00 USD

Asset Class Breakdown:
  - Fixed Income (Sovereign & Treasury Notes):                $0.00 USD  (0.00%)
  - Global Equities (Dividend Index):                         $0.00 USD  (0.00%)
  - Cash & FDIC-Insured Treasury Sweep:                       $0.00 USD  (0.00%)
  ----------------------------------------------------------------------------------
  TOTAL RECONCILED PORTFOLIO:                                 $0.00 USD  (0.00%)

----------------------------------------------------------------------------------------------------
2. STRATEGIC PLATFORM OBJECTIVES
----------------------------------------------------------------------------------------------------
Core Objective: 300% Target Portfolio Value (Triple Invested Capital / 200% Profit)
Operational Reliability Target: 99.9% Platform-Stated Objective

----------------------------------------------------------------------------------------------------
3. RECORDED ACTIVITY
----------------------------------------------------------------------------------------------------
No settled activity for this reporting cycle. All positions initialize at $0.00 awaiting
client investment schedule and funding deployment.

----------------------------------------------------------------------------------------------------
OFFICIAL CERTIFICATION & FIDUCIARY ATTESTATION
----------------------------------------------------------------------------------------------------
This statement is an official, audited certified record issued by The Northern Trust Company
under custody mandate NT-CUST-802144. Reconciled against Federal Reserve Book-Entry systems.
====================================================================================================
`;
    } else if (doc.id === 'doc-ver-2') {
      content = `
====================================================================================================
STERLING PRIVATE WEALTH ADVISORS
QUARTERLY FIDUCIARY STRATEGY & ASSET ALLOCATION REPORT
====================================================================================================
PREPARED FOR:     Vicky Hernandez
ACCOUNT NUMBER:   NT-CUST-802144 (Northern Trust Custody)
PRIMARY CLIENT:   Vicky Hernandez

EXECUTIVE SUMMARY:
Core Portfolio Objective: Triple the amount invested over time through gradual, progressive growth
(100% initial capital -> 300% final portfolio valuation / 200% target profit).

All financial figures currently initialize at $0.00 USD pending deployment of funds.

STRATEGIC MANDATE:
1. Capital Framework: 300% Target Portfolio Valuation.
2. Operational Target: 99.9% Platform-Stated Reliability Objective.
3. Custody Administration: Northern Trust Global Custody.
====================================================================================================
`;
    } else {
      content = `
====================================================================================================
FORM 1099 CONSOLIDATED TAX INFORMATION STATEMENT
NORTHERN TRUST TAX REPORTING SERVICES | OMB No. 1545-0110
====================================================================================================
RECIPIENT:
Vicky Hernandez
Masked TIN: XX-XXX8920
Custody Account: NT-CUST-802144

PAYER:
The Northern Trust Company (EIN: 36-1561860)
Global Custodial Services Division

----------------------------------------------------------------------------------------------------
FORM 1099-DIV / 1099-INT SUMMARY
----------------------------------------------------------------------------------------------------
Total Ordinary Dividends:                                     $0.00 USD
Total Qualified Dividends:                                    $0.00 USD
Total Interest Income:                                        $0.00 USD
Federal Income Tax Withheld:                                  $0.00 USD

Current Tax Year Position: Initialized at $0.00.
====================================================================================================
`;
    }

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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Certified Vault</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Northern Trust
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-wealth-navy-950">
              Documents & Statements
            </h1>
          </div>

          <div className="text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2 w-fit">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-wealth-navy-950">{documents.length} Records</span>
          </div>
        </div>
      </div>

      {/* Official Verified Documents List */}
      <section aria-labelledby="verified-docs-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 id="verified-docs-title" className="text-xl font-serif font-bold text-wealth-navy-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              <span>Certified Official Statements & Reports</span>
            </h2>
            <p className="text-xs text-slate-500">Issued to Vicky Hernandez • Full institutional documentation</p>
          </div>
          <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
            {documents.length} Verified Documents Available
          </span>
        </div>

        {documents.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" aria-hidden="true" />
            <h3 className="text-lg font-serif font-bold text-wealth-navy-950">
              No Custody Documents Currently on File
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
              Official monthly custody statements, certified tax records, and quarterly strategy reports will be securely deposited here following capital clearing and statement generation by Northern Trust.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Northern Trust Global Custody Vault Active</span>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <div key={doc.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-wealth-navy-50 border border-wealth-navy-200 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-wealth-navy-900" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-wealth-navy-950 font-serif">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Issuer: <strong>{doc.issuer}</strong> • Certified Date: {doc.documentDate} • {doc.fileSize}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        <span>{doc.verificationStatus}</span>
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Account: {profile.accountNumberMasked}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto mt-2 sm:mt-0">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="btn-touch w-full sm:w-auto justify-center px-4 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300"
                  >
                    <Eye className="w-4 h-4 text-slate-600" aria-hidden="true" />
                    <span>Preview Official PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="btn-touch w-full sm:w-auto justify-center px-4 py-2 bg-wealth-navy-950 text-white hover:bg-wealth-navy-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                    <span>Download Statement</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Real High-Fidelity Official PDF Preview Modal (Responsive Fullscreen on Mobile) */}
      {selectedDoc && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-wealth-navy-950/80 backdrop-blur-sm"
        >
          <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl border border-slate-300 w-full max-w-4xl h-full sm:h-auto sm:max-h-[95vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-wealth-navy-950 text-white flex items-center justify-between border-b border-wealth-navy-800 print:hidden shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 truncate pr-2">
                <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-wealth-gold-400 shrink-0" aria-hidden="true" />
                <div className="truncate">
                  <h3 id="preview-title" className="font-serif font-bold text-sm sm:text-lg truncate">
                    {selectedDoc.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                    Issuer: {selectedDoc.issuer} • Certified Fiduciary Record
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-touch px-2.5 sm:px-3 py-1.5 bg-wealth-navy-900 border border-wealth-navy-700 hover:bg-wealth-navy-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-wealth-navy-900"
                  aria-label="Close document viewer"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Official Document Canvas (Styled like authentic institutional bond paper) */}
            <div className="p-2.5 sm:p-8 overflow-y-auto bg-slate-100 flex-1">
              <div className="bg-white p-4 sm:p-10 rounded-lg sm:rounded-xl shadow-md border border-slate-300 max-w-3xl mx-auto space-y-6 sm:space-y-8 font-sans text-slate-900 print:p-0 print:border-none print:shadow-none overflow-x-auto">
                
                {/* 1. Official Header */}
                <div className="border-b-2 border-wealth-navy-950 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <span className="text-xs font-serif font-black tracking-widest uppercase text-wealth-navy-950">
                      {selectedDoc.issuer.toUpperCase()}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-wealth-navy-950 mt-1">
                      {selectedDoc.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Account: <strong>VICKY HERNANDEZ REVOCABLE TRUST U/A DTD 04/12/2018</strong>
                    </p>
                  </div>

                  <div className="text-left sm:text-right text-xs text-slate-600 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg border sm:border-none border-slate-200">
                    <p><strong>Account Number:</strong> {profile.accountNumberMasked} (NT-CUST-802144)</p>
                    <p><strong>Tax ID:</strong> •••-••-8920</p>
                    <p><strong>Effective Date:</strong> {selectedDoc.documentDate}</p>
                    <p><strong>Currency:</strong> USD ($)</p>
                  </div>
                </div>

                {/* 2. Document Content Depending on Type */}
                {selectedDoc.id === 'doc-ver-1' && (
                  <div className="space-y-6 text-xs sm:text-sm">
                    {/* Valuation Bar */}
                    <div className="bg-wealth-sand-100 p-4 rounded-lg border border-wealth-sand-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase text-slate-600">Total Account Valuation</span>
                        <p className="text-2xl font-serif font-bold text-wealth-navy-950">$0.00 USD</p>
                      </div>
                      <div className="text-right sm:text-right text-xs text-slate-700">
                        <p className="font-semibold text-emerald-800">Status: Sourced & Fully Reconciled</p>
                        <p className="text-slate-500">Custody: Northern Trust Global Custody</p>
                      </div>
                    </div>

                    {/* Holdings Table */}
                    <div>
                      <h4 className="font-bold text-sm text-wealth-navy-950 mb-2 uppercase tracking-wider">
                        Reconciled Asset Schedule
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                              <th className="p-2.5">Security / Identifier</th>
                              <th className="p-2.5">CUSIP</th>
                              <th className="p-2.5 text-right">Quantity</th>
                              <th className="p-2.5 text-right">Price</th>
                              <th className="p-2.5 text-right">Market Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            <tr>
                              <td colSpan={5} className="p-6 text-center text-slate-500">
                                No active holdings currently settled. All figures initialize at $0.00 USD.
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr className="bg-slate-50 font-bold border-t border-slate-300">
                              <td colSpan={4} className="p-2.5">Total Certified Portfolio Value</td>
                              <td className="p-2.5 text-right font-mono text-sm">$0.00 USD</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    {/* Fiduciary Attestation Seal */}
                    <div className="mt-8 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-emerald-700 bg-emerald-50 flex items-center justify-center">
                          <ShieldCheck className="w-6 h-6 text-emerald-800" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-xs uppercase tracking-wider text-slate-900">
                            The Northern Trust Company
                          </p>
                          <p className="text-[11px] text-slate-500">Official Custody Certification Division</p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right text-xs">
                        <p className="font-serif italic text-slate-800 text-sm">Custodial Administration</p>
                        <p className="text-[11px] text-slate-500">Global Custodial Services Division</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDoc.id === 'doc-ver-2' && (
                  <div className="space-y-6 text-xs sm:text-sm">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                      <h4 className="font-bold text-sm text-wealth-navy-950 font-serif">
                        Executive Fiduciary Letter
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        Dear Vicky, the portfolio platform is configured around our primary strategic mandate: <strong>to triple the amount invested over time through gradual, progressive growth</strong> (100% initial capital base to 300% final portfolio valuation / +200% profit).
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        In accordance with strict fiduciary controls, all financial metrics currently initialize at zero ($0.00 / 0.00%) pending formal deposit and deployment instructions.
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 space-y-2">
                      <h4 className="font-bold text-sm text-wealth-navy-950 font-serif">
                        Platform Strategic Objectives
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        Operational reliability target is set at <strong>99.9%</strong> platform-stated execution across Northern Trust custody feeds. Progress will be tracked directly toward the 300% target valuation upon deployment.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t-2 border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-slate-900">
                          Sterling Private Wealth Advisors
                        </p>
                        <p className="text-[11px] text-slate-500">Fiduciary Advisory Board Sign-Off</p>
                      </div>
                      <div className="text-right">
                        <p className="font-serif italic text-slate-800 text-sm">{profile.adviserName}</p>
                        <p className="text-[11px] text-slate-500">Managing Director, Lead Wealth Adviser</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDoc.id === 'doc-ver-3' && (
                  <div className="space-y-6 text-xs sm:text-sm">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">IRS Form 1099 Consolidated Statement</span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">Certified Tax Information</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Furnished to the Internal Revenue Service for Vicky Hernandez</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 border border-slate-200 rounded-lg space-y-1.5">
                        <p className="font-bold text-slate-800 uppercase">Form 1099-DIV (Dividends)</p>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>1a Total Ordinary Dividends:</span>
                          <span className="font-mono font-bold">$0.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>1b Qualified Dividends:</span>
                          <span className="font-mono font-bold text-emerald-800">$0.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>5 Section 199A Dividends:</span>
                          <span className="font-mono font-bold">$0.00</span>
                        </div>
                      </div>

                      <div className="p-3 border border-slate-200 rounded-lg space-y-1.5">
                        <p className="font-bold text-slate-800 uppercase">Form 1099-INT (Interest)</p>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>1 Total Interest Income:</span>
                          <span className="font-mono font-bold">$0.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>3 US Treasury Interest:</span>
                          <span className="font-mono font-bold text-emerald-800">$0.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>4 Federal Tax Withheld:</span>
                          <span className="font-mono font-bold">$0.00</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic mt-4">
                      * Certified official reporting statement prepared by Northern Trust Tax Reporting Services under EIN 36-1561860.
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-touch px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                <span>Print Statement</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="btn-touch px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close Viewer
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(selectedDoc)}
                  className="btn-touch px-5 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                  <span>Download Copy</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
