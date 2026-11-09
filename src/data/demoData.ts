import { 
  AssetClassAllocation, 
  HoldingItem, 
  PerformanceDataPoint, 
  FinancialGoal, 
  AccountActivity, 
  VaultDocument, 
  ProposedAllocationModel 
} from '@/types/wealth';

export const DEMO_PROPOSED_ALLOCATION: ProposedAllocationModel = {
  title: "Proposed Initial Allocation — 20%",
  headlinePercentage: 20,
  basisDescription: "Simulated advisory allocation recommending an initial 20% placement into US Treasury inflation-protected securities (TIPS).",
  intendedDenominator: "Illustrative portfolio basis of $2,500,000 USD total liquid capital.",
  targetAssetClass: "Fixed Income (US Treasury & Investment-Grade Notes)",
  fundingStatus: "PROPOSAL_ONLY",
  effectiveReviewDate: "November 15, 2026",
  disclaimer: "DEMO SIMULATION: This allocation is strictly illustrative for visual walkthrough and narrative training. No real funds or accounts are involved."
};

export const DEMO_ASSET_ALLOCATIONS: AssetClassAllocation[] = [
  {
    assetClass: "Fixed Income (Government & Corporate Bonds)",
    targetPercentage: 45,
    actualPercentage: 45,
    actualAmount: 1125000,
    color: "#1F4270", // Navy
    pattern: "diagonal",
    description: "High-grade US Treasuries and AAA municipal bonds providing steady income.",
    riskCategory: "Low"
  },
  {
    assetClass: "Global Equities (Dividend-Focused)",
    targetPercentage: 30,
    actualPercentage: 28,
    actualAmount: 700000,
    color: "#B3873B", // Heritage Gold
    pattern: "dots",
    description: "Blue-chip multinational dividend payers with defensive cash flows.",
    riskCategory: "Medium"
  },
  {
    assetClass: "Cash & Liquid Treasury Bills",
    targetPercentage: 15,
    actualPercentage: 17,
    actualAmount: 425000,
    color: "#15803D", // Green
    pattern: "solid",
    description: "FDIC-insured sweep deposits and 3-month Treasury bills for emergency liquidity.",
    riskCategory: "Low"
  },
  {
    assetClass: "Alternative & Real Assets",
    targetPercentage: 10,
    actualPercentage: 10,
    actualAmount: 250000,
    color: "#6D28D9", // Purple
    pattern: "cross",
    description: "Physical real estate investment trusts and inflation-hedged commodities.",
    riskCategory: "Medium-High"
  }
];

export const DEMO_HOLDINGS: HoldingItem[] = [
  {
    id: "h-demo-1",
    instrumentName: "US Treasury Note 4.250% Due 11/2030",
    tickerOrIdentifier: "UST-4250-30",
    assetClass: "Fixed Income",
    quantity: 600,
    currentPrice: 101.40,
    totalValuation: 608400,
    currency: "USD",
    valuationTime: "2026-11-08T16:00:00-05:00",
    sourceProviderName: "Simulated Custody Feed",
    sourceRecordId: "SIM-CUST-9921",
    verificationStatus: "SIMULATED_DEMO",
    unrealizedGainLoss: 8400,
    unrealizedGainLossPercent: 1.40
  },
  {
    id: "h-demo-2",
    instrumentName: "Vanguard Total Bond Market Index Fund (VBTLX)",
    tickerOrIdentifier: "VBTLX",
    assetClass: "Fixed Income",
    quantity: 50000,
    currentPrice: 10.33,
    totalValuation: 516500,
    currency: "USD",
    valuationTime: "2026-11-08T16:00:00-05:00",
    sourceProviderName: "Simulated Custody Feed",
    sourceRecordId: "SIM-CUST-9922",
    verificationStatus: "SIMULATED_DEMO",
    unrealizedGainLoss: 14200,
    unrealizedGainLossPercent: 2.83
  },
  {
    id: "h-demo-3",
    instrumentName: "Schwab U.S. Dividend Equity ETF (SCHD)",
    tickerOrIdentifier: "SCHD",
    assetClass: "Global Equities",
    quantity: 8500,
    currentPrice: 82.35,
    totalValuation: 699975,
    currency: "USD",
    valuationTime: "2026-11-08T16:00:00-05:00",
    sourceProviderName: "Simulated Custody Feed",
    sourceRecordId: "SIM-CUST-9923",
    verificationStatus: "SIMULATED_DEMO",
    unrealizedGainLoss: 41200,
    unrealizedGainLossPercent: 6.25
  },
  {
    id: "h-demo-4",
    instrumentName: "Treasury 3-Month Cash Sweep",
    tickerOrIdentifier: "USD-CASH-SWEEP",
    assetClass: "Cash & Liquid",
    quantity: 425000,
    currentPrice: 1.00,
    totalValuation: 425000,
    currency: "USD",
    valuationTime: "2026-11-08T16:00:00-05:00",
    sourceProviderName: "Simulated Custody Feed",
    sourceRecordId: "SIM-CUST-9924",
    verificationStatus: "SIMULATED_DEMO",
    unrealizedGainLoss: 0,
    unrealizedGainLossPercent: 0
  },
  {
    id: "h-demo-5",
    instrumentName: "Prologis Real Estate Core Trust",
    tickerOrIdentifier: "PLD-CORE",
    assetClass: "Alternative & Real Assets",
    quantity: 2100,
    currentPrice: 119.05,
    totalValuation: 250005,
    currency: "USD",
    valuationTime: "2026-11-08T16:00:00-05:00",
    sourceProviderName: "Simulated Custody Feed",
    sourceRecordId: "SIM-CUST-9925",
    verificationStatus: "SIMULATED_DEMO",
    unrealizedGainLoss: 7800,
    unrealizedGainLossPercent: 3.22
  }
];

export const DEMO_PERFORMANCE_HISTORY: PerformanceDataPoint[] = [
  { date: "Nov 2025", portfolioValue: 2360000, benchmarkValue: 2360000, netReturnPercent: 0.0, benchmarkReturnPercent: 0.0 },
  { date: "Jan 2026", portfolioValue: 2390000, benchmarkValue: 2382000, netReturnPercent: 1.27, benchmarkReturnPercent: 0.93 },
  { date: "Mar 2026", portfolioValue: 2415000, benchmarkValue: 2401000, netReturnPercent: 2.33, benchmarkReturnPercent: 1.74 },
  { date: "May 2026", portfolioValue: 2440000, benchmarkValue: 2419000, netReturnPercent: 3.39, benchmarkReturnPercent: 2.50 },
  { date: "Jul 2026", portfolioValue: 2465000, benchmarkValue: 2445000, netReturnPercent: 4.45, benchmarkReturnPercent: 3.60 },
  { date: "Sep 2026", portfolioValue: 2480000, benchmarkValue: 2460000, netReturnPercent: 5.08, benchmarkReturnPercent: 4.24 },
  { date: "Nov 2026", portfolioValue: 2499880, benchmarkValue: 2478000, netReturnPercent: 5.93, benchmarkReturnPercent: 5.00 }
];

export const DEMO_ACTIVITIES: AccountActivity[] = [
  {
    id: "act-demo-1",
    date: "November 1, 2026",
    type: "INTEREST",
    plainLanguageTitle: "US Treasury Coupon Payment Received",
    amount: 12750.00,
    currency: "USD",
    status: "COMPLETED",
    sourceReference: "SIM-TX-2026-8801",
    custodianName: "Simulated Custody Service",
    details: "Semi-annual interest payment credited to liquid cash sweep account."
  },
  {
    id: "act-demo-2",
    date: "October 15, 2026",
    type: "DIVIDEND",
    plainLanguageTitle: "Dividend Payment — Schwab US Dividend ETF",
    amount: 5865.00,
    currency: "USD",
    status: "COMPLETED",
    sourceReference: "SIM-TX-2026-8412",
    custodianName: "Simulated Custody Service",
    details: "Quarterly dividend reinvestment processed per mandate."
  },
  {
    id: "act-demo-3",
    date: "September 30, 2026",
    type: "ADVISORY_FEE",
    plainLanguageTitle: "Quarterly Fiduciary Advisory Fee",
    amount: -3125.00,
    currency: "USD",
    status: "COMPLETED",
    sourceReference: "SIM-FEE-2026-Q3",
    custodianName: "Sterling Private Wealth Advisors",
    details: "Contractual advisory fee of 0.125% per quarter calculated on net assets."
  }
];

export const DEMO_DOCUMENTS: VaultDocument[] = [
  {
    id: "doc-demo-1",
    title: "Quarterly Statement (Q3 2026) — Illustrative Sample",
    documentType: "QUARTERLY_STATEMENT",
    issuer: "Simulated Custody Bank",
    documentDate: "September 30, 2026",
    verificationStatus: "SIMULATED_DEMO",
    fileSize: "1.8 MB",
    isSimulated: true,
    downloadFilename: "DEMO_SAMPLE_Quarterly_Statement_Q3_2026.pdf"
  },
  {
    id: "doc-demo-2",
    title: "Annual Tax Form 1099-DIV Summary — Illustrative Sample",
    documentType: "TAX_DOCUMENT",
    issuer: "Simulated Tax Reporting Agent",
    documentDate: "January 15, 2026",
    verificationStatus: "SIMULATED_DEMO",
    fileSize: "920 KB",
    isSimulated: true,
    downloadFilename: "DEMO_SAMPLE_1099_DIV_Summary.pdf"
  },
  {
    id: "doc-demo-3",
    title: "Asset Allocation & Rebalancing Summary Report",
    documentType: "PLANNING_REPORT",
    issuer: "Sterling Private Wealth Advisory Board",
    documentDate: "October 10, 2026",
    verificationStatus: "SIMULATED_DEMO",
    fileSize: "2.1 MB",
    isSimulated: true,
    downloadFilename: "DEMO_SAMPLE_Rebalancing_Review.pdf"
  }
];
