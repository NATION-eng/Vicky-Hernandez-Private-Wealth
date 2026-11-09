import { ClientProfile, ProposedAllocationModel, FinancialGoal, VaultDocument, AccountActivity } from '@/types/wealth';

export const INITIAL_CLIENT_PROFILE: ClientProfile = {
  id: "client-vh-001",
  userId: "user-vicky-hernandez",
  preferredName: "Vicky",
  fullName: "Vicky Hernandez",
  email: "vicky.hernandez@client-private.com",
  phone: "+1 (555) 782-9014",
  accountNumberMasked: "•••• 8920",
  locale: "en-US",
  timezone: "America/New_York (EST)",
  adviserName: "Katherine Sterling, CFP®",
  adviserPhone: "+1 (555) 430-8800",
  adviserEmail: "katherine.sterling@sterlingprivatewealth.com",
  accessibilityPreferences: {
    textSize: 'standard',
    contrastMode: 'default',
    reducedMotion: false,
    audioDescriptions: false,
  }
};

export const INITIAL_PROPOSED_ALLOCATION: ProposedAllocationModel = {
  title: "Proposed Initial Allocation — 20%",
  headlinePercentage: 20,
  basisDescription: "Recommended first-tranche placement into High-Grade Short-Duration Treasury & Fixed Income notes.",
  intendedDenominator: "Calculated against total liquid reserves intended for conservative income generation.",
  targetAssetClass: "Fixed Income (US Treasury & Investment-Grade Notes)",
  fundingStatus: "PROPOSAL_ONLY",
  effectiveReviewDate: "November 15, 2026",
  disclaimer: "This is a strategic advisory proposal prepared for Vicky Hernandez. It does NOT represent a funded balance, executed transaction, or current holding until verified custodian instructions are executed."
};

export const INITIAL_PLAN_GOALS: FinancialGoal[] = [
  {
    id: "goal-1",
    title: "Capital Preservation & Estate Legacy",
    targetHorizon: "10+ Years",
    description: "Ensure multi-generational preservation of wealth with low exposure to equity market volatility.",
    currentStatus: "PROPOSED",
    assumptions: [
      "Inflation assumed at 2.8% annualized",
      "Priority placed on principal protection over aggressive capital gains",
      "Liquidity buffer of 24 months living expenses kept in risk-free cash equivalents"
    ]
  },
  {
    id: "goal-2",
    title: "Predictable Quarterly Income Generation",
    targetHorizon: "Ongoing (Retirement Phase)",
    description: "Generate consistent, tax-efficient quarterly cash flow from coupon-bearing instruments without touching principal.",
    currentStatus: "PROPOSED",
    assumptions: [
      "Target yields between 4.2% - 4.8% on fixed income allocation",
      "Semi-annual distribution review with tax counsel"
    ]
  }
];

export const INITIAL_DOCUMENTS: VaultDocument[] = [
  {
    id: "doc-init-1",
    title: "Comprehensive Wealth Advisory Proposal & Risk Profile",
    documentType: "PLANNING_REPORT",
    issuer: "Sterling Private Wealth Advisors",
    documentDate: "November 8, 2026",
    verificationStatus: "PROPOSED",
    fileSize: "2.4 MB",
    isSimulated: false,
    downloadFilename: "Vicky_Hernandez_Wealth_Proposal_2026.pdf"
  },
  {
    id: "doc-init-2",
    title: "Investment Policy Statement (Draft for Client Review)",
    documentType: "PLANNING_REPORT",
    issuer: "Sterling Private Wealth Advisory Board",
    documentDate: "November 5, 2026",
    verificationStatus: "PROPOSED",
    fileSize: "1.1 MB",
    downloadFilename: "Vicky_Hernandez_IPS_Draft.pdf",
    isSimulated: false
  }
];

export const INITIAL_ACTIVITIES: AccountActivity[] = [
  {
    id: "act-init-1",
    date: "November 8, 2026",
    type: "PLAN_REVIEW",
    plainLanguageTitle: "Annual Wealth Strategy Proposal Prepared",
    amount: null,
    currency: "USD",
    status: "COMPLETED",
    sourceReference: "PLAN-PROP-2026-11",
    custodianName: "Advisory Office",
    details: "Katherine Sterling generated the 2026 personalized wealth strategy proposal for client review."
  }
];
