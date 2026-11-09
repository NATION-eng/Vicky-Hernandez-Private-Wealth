export type DataMode = 'LIVE_VERIFIED' | 'PROPOSED_PLANNING' | 'DEMO_SIMULATED';

export type VerificationStatus = 
  | 'VERIFIED'
  | 'PENDING_VERIFICATION'
  | 'PROPOSED'
  | 'UNAVAILABLE'
  | 'SIMULATED_DEMO';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface AccessibilitySettings {
  textSize: 'standard' | 'large' | 'extra-large'; // 18px, 21px, 24px
  contrastMode: 'default' | 'high-contrast' | 'dark';
  reducedMotion: boolean;
  audioDescriptions: boolean;
}

export interface ClientProfile {
  id: string;
  userId: string;
  preferredName: string;
  fullName: string;
  email: string;
  phone: string;
  accountNumberMasked: string;
  locale: string;
  timezone: string;
  adviserName: string;
  adviserPhone: string;
  adviserEmail: string;
  avatarUrl?: string;
  accessibilityPreferences: AccessibilitySettings;
}

export interface AssetClassAllocation {
  assetClass: string;
  targetPercentage: number;
  actualPercentage: number;
  actualAmount: number;
  color: string;
  pattern: 'dots' | 'diagonal' | 'cross' | 'solid' | 'stripes';
  description: string;
  riskCategory: 'Low' | 'Medium' | 'Medium-High' | 'High';
}

export interface HoldingItem {
  id: string;
  instrumentName: string;
  tickerOrIdentifier: string;
  assetClass: string;
  quantity: number;
  currentPrice: number;
  totalValuation: number;
  currency: CurrencyCode;
  valuationTime: string;
  sourceProviderName: string;
  sourceRecordId: string;
  verificationStatus: VerificationStatus;
  unrealizedGainLoss: number;
  unrealizedGainLossPercent: number;
}

export interface ProposedAllocationModel {
  title: string;
  headlinePercentage: number; // 20%
  basisDescription: string;
  intendedDenominator: string;
  targetAssetClass: string;
  fundingStatus: 'PROPOSAL_ONLY' | 'PENDING_CLIENT_APPROVAL' | 'SUBMITTED_TO_ADVISER';
  effectiveReviewDate: string;
  disclaimer: string;
}

export interface PerformanceDataPoint {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
  netReturnPercent: number;
  benchmarkReturnPercent: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetHorizon: string;
  description: string;
  targetAmount?: number;
  currentStatus: 'ON_TRACK' | 'ATTENTION_NEEDED' | 'IN_REVIEW' | 'PROPOSED';
  assumptions: string[];
}

export interface AccountActivity {
  id: string;
  date: string;
  type: 'DIVIDEND' | 'INTEREST' | 'ADVISORY_FEE' | 'DEPOSIT_PROCESSED' | 'PLAN_REVIEW' | 'DOCUMENT_UPLOADED';
  plainLanguageTitle: string;
  amount: number | null;
  currency: CurrencyCode;
  status: 'COMPLETED' | 'PENDING' | 'REVERSED';
  sourceReference: string;
  custodianName: string;
  details: string;
}

export interface VaultDocument {
  id: string;
  title: string;
  documentType: 'QUARTERLY_STATEMENT' | 'PLANNING_REPORT' | 'TAX_DOCUMENT' | 'DEMO_SAMPLE';
  issuer: string;
  documentDate: string;
  verificationStatus: VerificationStatus;
  fileSize: string;
  isSimulated: boolean;
  downloadFilename: string;
}

export interface AuditEventRecord {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  status: 'SUCCESS' | 'STEP_UP_REQUIRED' | 'DENIED';
  ipAddressMasked: string;
}
