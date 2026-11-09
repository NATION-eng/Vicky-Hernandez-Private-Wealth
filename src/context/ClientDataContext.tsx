"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DataMode, 
  ClientProfile, 
  ProposedAllocationModel, 
  AssetClassAllocation, 
  HoldingItem, 
  PerformanceDataPoint, 
  FinancialGoal, 
  AccountActivity, 
  VaultDocument, 
  AuditEventRecord 
} from '@/types/wealth';

import { 
  INITIAL_CLIENT_PROFILE, 
  INITIAL_PROPOSED_ALLOCATION, 
  INITIAL_PLAN_GOALS, 
  INITIAL_DOCUMENTS, 
  INITIAL_ACTIVITIES 
} from '@/data/initialPlanningState';

import { 
  DEMO_PROPOSED_ALLOCATION, 
  DEMO_ASSET_ALLOCATIONS, 
  DEMO_HOLDINGS, 
  DEMO_PERFORMANCE_HISTORY, 
  DEMO_ACTIVITIES, 
  DEMO_DOCUMENTS 
} from '@/data/demoData';

import { 
  VERIFIED_PROPOSED_ALLOCATION, 
  VERIFIED_ASSET_ALLOCATIONS, 
  VERIFIED_HOLDINGS, 
  VERIFIED_PERFORMANCE_HISTORY, 
  VERIFIED_ACTIVITIES, 
  VERIFIED_DOCUMENTS 
} from '@/data/verifiedClientData';

interface ClientDataContextType {
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
  profile: ClientProfile;
  updateProfileName: (preferredName: string) => void;
  proposedAllocation: ProposedAllocationModel;
  assetAllocations: AssetClassAllocation[];
  holdings: HoldingItem[];
  performanceHistory: PerformanceDataPoint[];
  goals: FinancialGoal[];
  activities: AccountActivity[];
  documents: VaultDocument[];
  auditLog: AuditEventRecord[];
  isStepUpVerified: boolean;
  verifyStepUp: (code: string) => boolean;
  requestStepUpReset: () => void;
  requestPlanReview: (notes: string) => void;
  recordAudit: (action: string, target: string, status?: AuditEventRecord['status']) => void;
}

const ClientDataContext = createContext<ClientDataContextType | undefined>(undefined);

export const ClientDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataMode, setDataModeState] = useState<DataMode>('PROPOSED_PLANNING');
  const [profile, setProfile] = useState<ClientProfile>(INITIAL_CLIENT_PROFILE);
  const [isStepUpVerified, setIsStepUpVerified] = useState<boolean>(false);
  const [auditLog, setAuditLog] = useState<AuditEventRecord[]>([
    {
      id: "audit-1",
      actor: "Vicky Hernandez",
      action: "AUTHENTICATED_SESSION_START",
      target: "PORTAL_DASHBOARD",
      timestamp: "2026-11-09T08:30:12-05:00",
      status: "SUCCESS",
      ipAddressMasked: "192.168.1.xxx"
    }
  ]);

  // Read saved data mode if any
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('vhpw_datamode') as DataMode | null;
      if (savedMode && ['PROPOSED_PLANNING', 'LIVE_VERIFIED', 'DEMO_SIMULATED'].includes(savedMode)) {
        setDataModeState(savedMode);
      }
    }
  }, []);

  const setDataMode = (mode: DataMode) => {
    setDataModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vhpw_datamode', mode);
    }
    recordAudit(`SWITCH_DATA_MODE_TO_${mode}`, 'SYSTEM_DATA_FEED', 'SUCCESS');
  };

  const recordAudit = (action: string, target: string, status: AuditEventRecord['status'] = 'SUCCESS') => {
    const newRecord: AuditEventRecord = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      actor: profile.preferredName || "Client",
      action,
      target,
      timestamp: new Date().toISOString(),
      status,
      ipAddressMasked: "192.168.1.xxx"
    };
    setAuditLog((prev) => [newRecord, ...prev]);
  };

  const updateProfileName = (preferredName: string) => {
    setProfile((prev) => ({ ...prev, preferredName }));
    recordAudit("UPDATE_PREFERRED_NAME", `NEW_VALUE: ${preferredName}`, "SUCCESS");
  };

  const verifyStepUp = (code: string): boolean => {
    // Fiduciary simulation code: accepts "8920" (client account tail) or "123456"
    if (code === "8920" || code === "123456") {
      setIsStepUpVerified(true);
      recordAudit("STEP_UP_VERIFICATION_APPROVED", "SECURITY_GATEWAY", "SUCCESS");
      return true;
    }
    recordAudit("STEP_UP_VERIFICATION_FAILED", "SECURITY_GATEWAY", "DENIED");
    return false;
  };

  const requestStepUpReset = () => {
    setIsStepUpVerified(false);
  };

  const requestPlanReview = (notes: string) => {
    recordAudit("REQUEST_ADVISER_PLAN_REVIEW", `Notes: ${notes.substring(0, 40)}...`, "SUCCESS");
  };

  // Derive active dataset according to dataMode
  let proposedAllocation = INITIAL_PROPOSED_ALLOCATION;
  let assetAllocations: AssetClassAllocation[] = [];
  let holdings: HoldingItem[] = [];
  let performanceHistory: PerformanceDataPoint[] = [];
  let goals: FinancialGoal[] = INITIAL_PLAN_GOALS;
  let activities: AccountActivity[] = INITIAL_ACTIVITIES;
  let documents: VaultDocument[] = INITIAL_DOCUMENTS;

  if (dataMode === 'LIVE_VERIFIED') {
    proposedAllocation = VERIFIED_PROPOSED_ALLOCATION;
    assetAllocations = VERIFIED_ASSET_ALLOCATIONS;
    holdings = VERIFIED_HOLDINGS;
    performanceHistory = VERIFIED_PERFORMANCE_HISTORY;
    goals = INITIAL_PLAN_GOALS;
    activities = VERIFIED_ACTIVITIES;
    documents = VERIFIED_DOCUMENTS;
  } else if (dataMode === 'DEMO_SIMULATED') {
    proposedAllocation = DEMO_PROPOSED_ALLOCATION;
    assetAllocations = DEMO_ASSET_ALLOCATIONS;
    holdings = DEMO_HOLDINGS;
    performanceHistory = DEMO_PERFORMANCE_HISTORY;
    goals = INITIAL_PLAN_GOALS;
    activities = DEMO_ACTIVITIES;
    documents = DEMO_DOCUMENTS;
  }

  return (
    <ClientDataContext.Provider
      value={{
        dataMode,
        setDataMode,
        profile,
        updateProfileName,
        proposedAllocation,
        assetAllocations,
        holdings,
        performanceHistory,
        goals,
        activities,
        documents,
        auditLog,
        isStepUpVerified,
        verifyStepUp,
        requestStepUpReset,
        requestPlanReview,
        recordAudit,
      }}
    >
      {children}
    </ClientDataContext.Provider>
  );
};

export const useClientData = () => {
  const context = useContext(ClientDataContext);
  if (!context) {
    throw new Error('useClientData must be used within a ClientDataProvider');
  }
  return context;
};
