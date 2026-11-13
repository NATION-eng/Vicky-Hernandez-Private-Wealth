import { ClientProfile, ProposedAllocationModel, FinancialGoal, VaultDocument, AccountActivity } from '@/types/wealth';

export const INITIAL_CLIENT_PROFILE: ClientProfile = {
  id: "client-vh-001",
  userId: "Vickyh1970",
  preferredName: "Vicky",
  fullName: "Vicky Hernandez",
  email: "", // Unconfigured until email address is provided by client
  phone: "", // Unconfigured
  accountNumberMasked: "•••• 8920",
  locale: "en-US",
  timezone: "America/Chicago (CST)",
  adviserName: "Katherine Sterling, CFP®",
  adviserPhone: "", // Custodian / representative contact details removed
  adviserEmail: "", // Custodian / representative contact details removed
  accessibilityPreferences: {
    textSize: 'standard',
    contrastMode: 'default',
    reducedMotion: false,
    audioDescriptions: false,
  }
};

export const INITIAL_PROPOSED_ALLOCATION: ProposedAllocationModel = {
  title: "Core Portfolio Objective — 300% Capital Growth Target",
  headlinePercentage: 300, // 300% target portfolio value (Triple Amount Invested)
  basisDescription: "Primary strategic objective: Triple the amount invested over time through gradual, progressive growth (200% net growth / 300% target portfolio valuation).",
  intendedDenominator: "Progress tracked directly toward the 300% target valuation upon capital deployment.",
  targetAssetClass: "Multi-Asset Fiduciary Allocation",
  fundingStatus: "PROPOSAL_ONLY",
  effectiveReviewDate: "Awaiting Fund Deployment",
  disclaimer: "Fiduciary mandate: Target 300% investment value (triple invested capital). All financial figures currently initialize at zero ($0.00 / 0.00%) pending client-provided investment timeframe and funding schedule."
};

export const INITIAL_PLAN_GOALS: FinancialGoal[] = [
  {
    id: "goal-1",
    title: "Capital Tripling Objective (300% Target Value)",
    targetHorizon: "Long-Term Growth Schedule",
    description: "Execute disciplined fiduciary growth strategy to expand portfolio to 300% of initial capital (200% accumulated profit).",
    currentStatus: "PROPOSED",
    assumptions: [
      "Initial investment capital = 100%",
      "Target investment value = 300% of initial capital (triple invested value)",
      "Progress calculated against 300% final value without fabricated progressive steps"
    ]
  },
  {
    id: "goal-2",
    title: "Target Execution Reliability (99.9% Stated Objective)",
    targetHorizon: "Continuous Fiduciary Standard",
    description: "Maintain institutional custody reconciliation accuracy and target execution reliability of 99.9% across all settlement channels.",
    currentStatus: "PROPOSED",
    assumptions: [
      "Target success rate: 99.9% (Platform-stated objective)",
      "Reconciled via institutional custody",
      "Statutory investor protections and disclosures strictly preserved"
    ]
  }
];

// Clean data state: zero placeholder documents
export const INITIAL_DOCUMENTS: VaultDocument[] = [];

// Clean data state: zero placeholder activities
export const INITIAL_ACTIVITIES: AccountActivity[] = [];
