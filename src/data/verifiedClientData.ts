import { 
  AssetClassAllocation, 
  HoldingItem, 
  PerformanceDataPoint, 
  FinancialGoal, 
  AccountActivity, 
  VaultDocument, 
  ProposedAllocationModel 
} from '@/types/wealth';

/**
 * Platform Core Investment Objective:
 * Triple the amount invested over time through gradual, progressive growth.
 * Mathematical Framework:
 * - Initial investment = 100%
 * - Target investment value = 300% of initial investment
 * - Total target growth = 200% profit
 */
export const VERIFIED_PROPOSED_ALLOCATION: ProposedAllocationModel = {
  title: "Core Investment Objective: 300% Target Value",
  headlinePercentage: 300, // 300% Target Portfolio Value (3x Initial Capital)
  basisDescription: "Primary strategic objective: Triple the amount invested over time through gradual, progressive growth (200% profit / 300% target valuation).",
  intendedDenominator: "Progress tracked directly toward the 300% final portfolio value upon initial funding.",
  targetAssetClass: "Multi-Asset Fiduciary Allocation",
  fundingStatus: "PENDING_CLIENT_APPROVAL",
  effectiveReviewDate: "Awaiting Fund Deployment",
  disclaimer: "Fiduciary objective: 300% target portfolio value (triple invested capital). All financial figures initialize at zero ($0.00 / 0.00%) pending the client-provided investment timeframe and actual performance figures."
};

/**
 * Clean data state: zero sample asset allocations
 * Financial figures initialize at 0.00 until funded by client.
 */
export const VERIFIED_ASSET_ALLOCATIONS: AssetClassAllocation[] = [];

/**
 * Clean data state: zero placeholder holding items
 * No sample holdings; positions will populate upon actual custodian reconciliation.
 */
export const VERIFIED_HOLDINGS: HoldingItem[] = [];

/**
 * Clean data state: zero fabricated performance records
 * Chart and reports initialize clean until investment schedule begins.
 */
export const VERIFIED_PERFORMANCE_HISTORY: PerformanceDataPoint[] = [];

/**
 * Clean data state: zero dummy transactions
 * Ledger starts clean with zero sample entries.
 */
export const VERIFIED_ACTIVITIES: AccountActivity[] = [];

/**
 * Clean data state: zero placeholder documents
 * Certified custodian statements will appear here upon issuance.
 */
export const VERIFIED_DOCUMENTS: VaultDocument[] = [];
