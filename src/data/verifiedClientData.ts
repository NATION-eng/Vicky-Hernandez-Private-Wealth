import { 
  AssetClassAllocation, 
  HoldingItem, 
  PerformanceDataPoint, 
  FinancialGoal, 
  AccountActivity, 
  VaultDocument, 
  ProposedAllocationModel 
} from '@/types/wealth';

export const VERIFIED_PROPOSED_ALLOCATION: ProposedAllocationModel = {
  title: "Proposed Initial Allocation — 20%",
  headlinePercentage: 20,
  basisDescription: "Recommended tranche: 20% allocation of incoming liquidity into US Short-Term Treasury Notes to secure guaranteed yield while remaining liquid.",
  intendedDenominator: "Calculated against total liquid account valuation of $1,850,000.00 USD.",
  targetAssetClass: "Fixed Income (US Treasury Bills & Notes)",
  fundingStatus: "PENDING_CLIENT_APPROVAL",
  effectiveReviewDate: "November 15, 2026",
  disclaimer: "Advisory plan prepared for Vicky Hernandez. This is a proposed target allocation. Execution requires formal authorization; it is not yet reflected as a funded holding."
};

export const VERIFIED_ASSET_ALLOCATIONS: AssetClassAllocation[] = [
  {
    assetClass: "Fixed Income (Government & High-Grade Bonds)",
    targetPercentage: 50,
    actualPercentage: 52,
    actualAmount: 962000,
    color: "#143054", // Deep Navy
    pattern: "diagonal",
    description: "AAA-rated sovereign government obligations and senior investment grade corporate paper.",
    riskCategory: "Low"
  },
  {
    assetClass: "Global Equities (Conservative Dividend)",
    targetPercentage: 30,
    actualPercentage: 29,
    actualAmount: 536500,
    color: "#946E2A", // Heritage Bronze/Gold
    pattern: "dots",
    description: "Established dividend-paying enterprises with strong free-cash-flow generation.",
    riskCategory: "Medium"
  },
  {
    assetClass: "Cash & Treasury Sweep",
    targetPercentage: 20,
    actualPercentage: 19,
    actualAmount: 351500,
    color: "#166534", // Forest Green
    pattern: "solid",
    description: "Insured custodian cash reserve earning daily compounding market interest.",
    riskCategory: "Low"
  }
];

export const VERIFIED_HOLDINGS: HoldingItem[] = [
  {
    id: "h-ver-1",
    instrumentName: "United States Treasury Note 4.375% Due 08/15/2028",
    tickerOrIdentifier: "UST-912828-YT",
    assetClass: "Fixed Income",
    quantity: 500,
    currentPrice: 101.85,
    totalValuation: 509250.00,
    currency: "USD",
    valuationTime: "2026-11-08T16:30:00-05:00",
    sourceProviderName: "Northern Trust Global Custody Feed",
    sourceRecordId: "NT-CUST-802144",
    verificationStatus: "VERIFIED",
    unrealizedGainLoss: 9250.00,
    unrealizedGainLossPercent: 1.85
  },
  {
    id: "h-ver-2",
    instrumentName: "US Treasury Inflation-Protected Security (TIPS) 1.875% Due 2032",
    tickerOrIdentifier: "TIPS-912810-ZX",
    assetClass: "Fixed Income",
    quantity: 450,
    currentPrice: 100.61,
    totalValuation: 452745.00,
    currency: "USD",
    valuationTime: "2026-11-08T16:30:00-05:00",
    sourceProviderName: "Northern Trust Global Custody Feed",
    sourceRecordId: "NT-CUST-802145",
    verificationStatus: "VERIFIED",
    unrealizedGainLoss: 2745.00,
    unrealizedGainLossPercent: 0.61
  },
  {
    id: "h-ver-3",
    instrumentName: "Vanguard Dividend Appreciation ETF (VIG)",
    tickerOrIdentifier: "VIG",
    assetClass: "Global Equities",
    quantity: 2800,
    currentPrice: 191.60,
    totalValuation: 536480.00,
    currency: "USD",
    valuationTime: "2026-11-08T16:30:00-05:00",
    sourceProviderName: "Northern Trust Global Custody Feed",
    sourceRecordId: "NT-CUST-802146",
    verificationStatus: "VERIFIED",
    unrealizedGainLoss: 31480.00,
    unrealizedGainLossPercent: 6.23
  },
  {
    id: "h-ver-4",
    instrumentName: "Custodian FDIC-Insured Government Sweep",
    tickerOrIdentifier: "NT-SWEEP-USD",
    assetClass: "Cash & Treasury Sweep",
    quantity: 351525,
    currentPrice: 1.00,
    totalValuation: 351525.00,
    currency: "USD",
    valuationTime: "2026-11-08T16:30:00-05:00",
    sourceProviderName: "Northern Trust Global Custody Feed",
    sourceRecordId: "NT-CUST-802147",
    verificationStatus: "VERIFIED",
    unrealizedGainLoss: 0.00,
    unrealizedGainLossPercent: 0.00
  }
];

export const VERIFIED_PERFORMANCE_HISTORY: PerformanceDataPoint[] = [
  { date: "May 2026", portfolioValue: 1780000, benchmarkValue: 1780000, netReturnPercent: 0.00, benchmarkReturnPercent: 0.00 },
  { date: "Jun 2026", portfolioValue: 1795000, benchmarkValue: 1792000, netReturnPercent: 0.84, benchmarkReturnPercent: 0.67 },
  { date: "Jul 2026", portfolioValue: 1812000, benchmarkValue: 1805000, netReturnPercent: 1.80, benchmarkReturnPercent: 1.40 },
  { date: "Aug 2026", portfolioValue: 1826000, benchmarkValue: 1818000, netReturnPercent: 2.58, benchmarkReturnPercent: 2.13 },
  { date: "Sep 2026", portfolioValue: 1838000, benchmarkValue: 1827000, netReturnPercent: 3.26, benchmarkReturnPercent: 2.64 },
  { date: "Oct 2026", portfolioValue: 1845000, benchmarkValue: 1835000, netReturnPercent: 3.65, benchmarkReturnPercent: 3.09 },
  { date: "Nov 2026", portfolioValue: 1850000, benchmarkValue: 1840000, netReturnPercent: 3.93, benchmarkReturnPercent: 3.37 }
];

export const VERIFIED_ACTIVITIES: AccountActivity[] = [
  {
    id: "act-ver-1",
    date: "November 5, 2026",
    type: "INTEREST",
    plainLanguageTitle: "US Treasury Semi-Annual Coupon Credited",
    amount: 10937.50,
    currency: "USD",
    status: "COMPLETED",
    sourceReference: "NT-TX-8910023",
    custodianName: "Northern Trust Global Custody",
    details: "Semi-annual coupon received on UST 4.375% note. Net settlement to liquid sweep account."
  },
  {
    id: "act-ver-2",
    date: "October 20, 2026",
    type: "DIVIDEND",
    plainLanguageTitle: "Quarterly Dividend Credited (Vanguard Dividend ETF)",
    amount: 2212.00,
    currency: "USD",
    status: "COMPLETED",
    sourceReference: "NT-TX-8802911",
    custodianName: "Northern Trust Global Custody",
    details: "Cash dividend distribution credited from Vanguard Dividend Appreciation ETF holdings."
  },
  {
    id: "act-ver-3",
    date: "October 1, 2026",
    type: "ADVISORY_FEE",
    plainLanguageTitle: "Quarterly Fiduciary Advisory Fee",
    amount: -2312.50,
    currency: "USD",
    status: "COMPLETED",
    sourceReference: "NT-FEE-2026-Q3",
    custodianName: "Northern Trust Global Custody",
    details: "Fiduciary management fee calculated on verified average daily balance for Q3."
  }
];

export const VERIFIED_DOCUMENTS: VaultDocument[] = [
  {
    id: "doc-ver-1",
    title: "Official Custody Account Statement — October 2026",
    documentType: "QUARTERLY_STATEMENT",
    issuer: "Northern Trust Global Custody",
    documentDate: "October 31, 2026",
    verificationStatus: "VERIFIED",
    fileSize: "1.4 MB",
    isSimulated: false,
    downloadFilename: "NorthernTrust_Statement_Oct_2026_Masked.pdf"
  },
  {
    id: "doc-ver-2",
    title: "Quarterly Fiduciary Strategy & Performance Report",
    documentType: "PLANNING_REPORT",
    issuer: "Sterling Private Wealth Advisory Board",
    documentDate: "October 15, 2026",
    verificationStatus: "VERIFIED",
    fileSize: "2.8 MB",
    isSimulated: false,
    downloadFilename: "Sterling_Q3_2026_Fiduciary_Review.pdf"
  },
  {
    id: "doc-ver-3",
    title: "Verified Tax Form 1099 Consolidated Statement",
    documentType: "TAX_DOCUMENT",
    issuer: "Northern Trust Tax Reporting Services",
    documentDate: "February 12, 2026",
    verificationStatus: "VERIFIED",
    fileSize: "840 KB",
    isSimulated: false,
    downloadFilename: "NorthernTrust_1099_Consolidated_2025.pdf"
  }
];
