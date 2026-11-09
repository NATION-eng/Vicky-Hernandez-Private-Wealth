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
50 South La Salle Street, Chicago, Illinois 60603
OFFICIAL MONTHLY CUSTODY ACCOUNT STATEMENT
====================================================================================================
STATEMENT PERIOD: October 1, 2026 through October 31, 2026
ACCOUNT TITLE:    VICKY HERNANDEZ REVOCABLE TRUST U/A DTD 04/12/2018
ACCOUNT NUMBER:   NT-CUST-802144
TAX IDENTIFIER:   XX-XXX8920
PRIMARY CLIENT:   Vicky Hernandez
LEAD ADVISER:     Katherine Sterling, CFP® (Sterling Private Wealth Advisors)

----------------------------------------------------------------------------------------------------
1. CONSOLIDATED PORTFOLIO VALUATION SUMMARY
----------------------------------------------------------------------------------------------------
Total Market Valuation as of Oct 31, 2026, 4:30 PM EST:   $1,850,000.00 USD
Net Unrealized Portfolio Gain:                            +$43,475.00 USD (+2.40%)
Accrued Monthly Income:                                   +$14,571.80 USD

Asset Class Breakdown:
  - Fixed Income (US Treasury & Sovereign Notes):        $962,000.00 USD  (52.00%)
  - Global Equities (Conservative Dividend Index):        $536,480.00 USD  (29.00%)
  - Cash & FDIC-Insured Treasury Sweep:                   $351,520.00 USD  (19.00%)
  ----------------------------------------------------------------------------------
  TOTAL RECONCILED PORTFOLIO:                            $1,850,000.00 USD (100.00%)

----------------------------------------------------------------------------------------------------
2. SCHEDULE OF ITEMIZED CUSTODIAN HOLDINGS
----------------------------------------------------------------------------------------------------
Security Name: United States Treasury Note 4.375% Due 08/15/2028
  CUSIP: 912828-YT | Quantity: 500 | Market Price: $101.850
  Total Value: $509,250.00 USD | Est. Annual Income: $21,875.00 USD

Security Name: US Treasury Inflation-Protected Security (TIPS) 1.875% Due 2032
  CUSIP: 912810-ZX | Quantity: 450 | Market Price: $100.610
  Total Value: $452,745.00 USD | Est. Annual Income: $8,488.97 USD

Security Name: Vanguard Dividend Appreciation ETF (VIG)
  CUSIP: 921908-844 | Ticker: VIG | Quantity: 2,800 | Market Price: $191.600
  Total Value: $536,480.00 USD | Est. Annual Income: $10,136.00 USD

Security Name: Northern Trust Government Cash Sweep (FDIC-Insured)
  Symbol: NT-SWEEP-USD | Quantity: 351,525 | Market Price: $1.000
  Total Value: $351,525.00 USD | 7-Day Current Yield: 4.85%

----------------------------------------------------------------------------------------------------
3. RECORDED ACTIVITY FOR OCTOBER 2026
----------------------------------------------------------------------------------------------------
10/01/2026 | Quarterly Advisory Fee (Q3)                  -$2,312.50 USD [Ref: NT-FEE-2026-Q3]
10/20/2026 | Cash Dividend Distribution - Vanguard VIG    +$2,212.00 USD [Ref: NT-TX-8802911]
10/31/2026 | Treasury Note Coupon Accrual & Sweep Yield   +$1,422.30 USD [Ref: NT-TX-8803140]

----------------------------------------------------------------------------------------------------
OFFICIAL CERTIFICATION & FIDUCIARY ATTESTATION
----------------------------------------------------------------------------------------------------
This statement is an official, audited certified record issued by The Northern Trust Company
under custody mandate NT-CUST-802144. All positions are reconciled against DTC and Federal Reserve Book-Entry systems.

Authorized Signatory:
Arthur Pendelton, Senior Vice President
Global Custodial Services Division | The Northern Trust Company
====================================================================================================
`;
    } else if (doc.id === 'doc-ver-2') {
      content = `
====================================================================================================
STERLING PRIVATE WEALTH ADVISORS LLC
590 Madison Avenue, 32nd Floor, New York, NY 10022
QUARTERLY FIDUCIARY STRATEGY & ASSET ALLOCATION REPORT
====================================================================================================
REPORTING PERIOD: Third Quarter 2026 (Ending September 30, 2026)
PREPARED FOR:     Vicky Hernandez
ACCOUNT NUMBER:   NT-CUST-802144 (Northern Trust Custody)
LEAD ADVISER:     Katherine Sterling, CFP® | Managing Director

EXECUTIVE SUMMARY:
Dear Vicky,
During the third quarter of 2026, your portfolio delivered a net time-weighted return of +3.65%
(after all advisory and custodian expenses), outperforming your benchmark (70% Bloomberg Aggregate /
30% Dividend Equity Index) by +0.56%.

STRATEGIC MANDATE & PLANNING REVIEW:
1. Capital Preservation: 71% of total capital remains positioned in sovereign US Treasuries and
   guaranteed cash equivalents, protecting purchasing power against market drawdowns.
2. The Proposed Initial 20% Allocation:
   We continue to monitor the proposed 20% initial allocation tranche into Short-Duration
   Treasury Notes to capture high nominal yields without duration risk. Execution remains on hold
   pending your scheduled annual consultation on November 15, 2026.

PORTFOLIO PERFORMANCE SUMMARY:
  - Vicky Hernandez Portfolio (Net of Fees):  +3.65% QTD | +3.93% YTD
  - Conservative Benchmark Composite:         +3.09% QTD | +3.37% YTD
  - Net Value Added (Alpha):                  +0.56% QTD | +0.56% YTD

Signed,
Katherine Sterling, CFP®
Sterling Private Wealth Advisors LLC
====================================================================================================
`;
    } else {
      content = `
====================================================================================================
FORM 1099 CONSOLIDATED TAX INFORMATION STATEMENT (TAX YEAR 2025)
NORTHERN TRUST TAX REPORTING SERVICES | OMB No. 1545-0110
====================================================================================================
RECIPIENT:
Vicky Hernandez
Masked TIN: XX-XXX8920
Custody Account: NT-CUST-802144

PAYER:
The Northern Trust Company (EIN: 36-1561860)
50 South La Salle Street, Chicago, IL 60603

----------------------------------------------------------------------------------------------------
FORM 1099-DIV: DIVIDENDS AND DISTRIBUTIONS
----------------------------------------------------------------------------------------------------
Box 1a  Total Ordinary Dividends:                 $18,450.00 USD
Box 1b  Qualified Dividends:                      $16,210.00 USD
Box 2a  Total Capital Gain Distributions:         $0.00 USD
Box 3   Nondividend Distributions:                $0.00 USD
Box 5   Section 199A Dividends:                   $2,240.00 USD
Box 4   Federal Income Tax Withheld:              $0.00 USD

----------------------------------------------------------------------------------------------------
FORM 1099-INT: INTEREST INCOME
----------------------------------------------------------------------------------------------------
Box 1   Interest Income:                          $32,812.50 USD
Box 3   Interest on U.S. Savings Bonds & Treas:   $32,812.50 USD (State-Tax Exempt)
Box 8   Tax-Exempt Interest:                      $0.00 USD
Box 4   Federal Income Tax Withheld:              $0.00 USD

This information is being furnished to the Internal Revenue Service.
Certified copy for client tax preparation archives.
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
                        <p className="text-2xl font-serif font-bold text-wealth-navy-950">$1,850,000.00 USD</p>
                      </div>
                      <div className="text-right sm:text-right text-xs text-slate-700">
                        <p className="font-semibold text-emerald-800">Status: Sourced & Fully Reconciled</p>
                        <p className="text-slate-500">Valuation Date: October 31, 2026</p>
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
                              <td className="p-2.5 font-medium">United States Treasury Note 4.375% Due 08/15/2028</td>
                              <td className="p-2.5 font-mono text-slate-500">912828-YT</td>
                              <td className="p-2.5 text-right font-mono">500</td>
                              <td className="p-2.5 text-right font-mono">$101.850</td>
                              <td className="p-2.5 text-right font-mono font-bold">$509,250.00</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-medium">US Treasury Inflation-Protected Security (TIPS) 1.875% Due 2032</td>
                              <td className="p-2.5 font-mono text-slate-500">912810-ZX</td>
                              <td className="p-2.5 text-right font-mono">450</td>
                              <td className="p-2.5 text-right font-mono">$100.610</td>
                              <td className="p-2.5 text-right font-mono font-bold">$452,745.00</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-medium">Vanguard Dividend Appreciation ETF (VIG)</td>
                              <td className="p-2.5 font-mono text-slate-500">921908-844</td>
                              <td className="p-2.5 text-right font-mono">2,800</td>
                              <td className="p-2.5 text-right font-mono">$191.600</td>
                              <td className="p-2.5 text-right font-mono font-bold">$536,480.00</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-medium">Northern Trust Government Cash Sweep (FDIC-Insured)</td>
                              <td className="p-2.5 font-mono text-slate-500">NT-SWEEP</td>
                              <td className="p-2.5 text-right font-mono">351,525</td>
                              <td className="p-2.5 text-right font-mono">$1.000</td>
                              <td className="p-2.5 text-right font-mono font-bold">$351,525.00</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr className="bg-slate-50 font-bold border-t border-slate-300">
                              <td colSpan={4} className="p-2.5">Total Certified Portfolio Value</td>
                              <td className="p-2.5 text-right font-mono text-sm">$1,850,000.00 USD</td>
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
                        <p className="font-serif italic text-slate-800 text-sm">Arthur Pendelton</p>
                        <p className="text-[11px] text-slate-500">Arthur Pendelton, Senior Vice President</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDoc.id === 'doc-ver-2' && (
                  <div className="space-y-6 text-xs sm:text-sm">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                      <h4 className="font-bold text-sm text-wealth-navy-950 font-serif">
                        Executive Fiduciary Letter — Q3 2026
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        Dear Vicky, during the third quarter of 2026, your conservative wealth preservation portfolio delivered a net return of <strong>+3.65%</strong>, exceeding your blended benchmark (+3.09%) by +0.56% after all advisory and custody expenses.
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        Your liquid capital remains sheltered in US Treasury notes and high-interest cash sweeps, fully insulating your lifestyle distributions against equity market volatility.
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4 space-y-2">
                      <h4 className="font-bold text-sm text-wealth-navy-950 font-serif">
                        The Proposed Initial 20% Allocation Review
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        We continue to preserve the recommended <strong>Proposed Initial Allocation — 20%</strong> into short-term sovereign notes. This remains a strategic planning recommendation and will be formally reviewed during our annual consultation on November 15, 2026.
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
                      <h4 className="text-base font-bold text-slate-900 mt-1">Tax Year 2025 Filing Information</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Furnished to the Internal Revenue Service for Vicky Hernandez</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 border border-slate-200 rounded-lg space-y-1.5">
                        <p className="font-bold text-slate-800 uppercase">Form 1099-DIV (Dividends)</p>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>1a Total Ordinary Dividends:</span>
                          <span className="font-mono font-bold">$18,450.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>1b Qualified Dividends:</span>
                          <span className="font-mono font-bold text-emerald-800">$16,210.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>5 Section 199A Dividends:</span>
                          <span className="font-mono font-bold">$2,240.00</span>
                        </div>
                      </div>

                      <div className="p-3 border border-slate-200 rounded-lg space-y-1.5">
                        <p className="font-bold text-slate-800 uppercase">Form 1099-INT (Interest)</p>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>1 Total Interest Income:</span>
                          <span className="font-mono font-bold">$32,812.50</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>3 US Treasury Interest (State Exempt):</span>
                          <span className="font-mono font-bold text-emerald-800">$32,812.50</span>
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
