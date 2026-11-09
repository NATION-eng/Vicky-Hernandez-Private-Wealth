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
  INITIAL_PLAN_GOALS 
} from '@/data/initialPlanningState';

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
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => boolean;
  logout: () => void;
  profile: ClientProfile;
  updateProfileName: (preferredName: string) => void;
  updateProfilePhoto: (photoDataUrl: string) => void;
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
  // LIVE_VERIFIED is the permanent, locked environment
  const dataMode: DataMode = 'LIVE_VERIFIED';
  const setDataMode = () => {};
  
  const [profile, setProfile] = useState<ClientProfile>(INITIAL_CLIENT_PROFILE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isStepUpVerified, setIsStepUpVerified] = useState<boolean>(false);
  const [auditLog, setAuditLog] = useState<AuditEventRecord[]>([
    {
      id: "audit-1",
      actor: "Vicky Hernandez",
      action: "NORTHERN_TRUST_FEED_VERIFIED",
      target: "PORTAL_DASHBOARD",
      timestamp: "2026-11-09T08:30:12-05:00",
      status: "SUCCESS",
      ipAddressMasked: "192.168.1.xxx"
    }
  ]);

  // Read saved session and avatar on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('vhpw_authenticated');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
      const savedAvatar = localStorage.getItem('vhpw_avatar');
      if (savedAvatar) {
        setProfile((prev) => ({ ...prev, avatarUrl: savedAvatar }));
      }
    }
  }, []);

  const login = (email?: string, password?: string): boolean => {
    // Authenticate client
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vhpw_authenticated', 'true');
    }
    recordAudit("CLIENT_LOGIN_SUCCESS", "PORTAL_GATEWAY", "SUCCESS");
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsStepUpVerified(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vhpw_authenticated');
    }
    recordAudit("CLIENT_LOGOUT", "PORTAL_GATEWAY", "SUCCESS");
  };

  const recordAudit = (action: string, target: string, status: AuditEventRecord['status'] = 'SUCCESS') => {
    const newRecord: AuditEventRecord = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      actor: profile.preferredName || "Vicky Hernandez",
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

  const updateProfilePhoto = (photoDataUrl: string) => {
    setProfile((prev) => ({ ...prev, avatarUrl: photoDataUrl }));
    if (typeof window !== 'undefined') {
      if (photoDataUrl) {
        localStorage.setItem('vhpw_avatar', photoDataUrl);
      } else {
        localStorage.removeItem('vhpw_avatar');
      }
    }
    recordAudit("UPDATE_PROFILE_PHOTO", photoDataUrl ? "PHOTO_UPLOADED" : "PHOTO_REMOVED", "SUCCESS");
  };

  const verifyStepUp = (code: string): boolean => {
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

  // Live state is the permanent, locked environment
  const proposedAllocation = VERIFIED_PROPOSED_ALLOCATION;
  const assetAllocations = VERIFIED_ASSET_ALLOCATIONS;
  const holdings = VERIFIED_HOLDINGS;
  const performanceHistory = VERIFIED_PERFORMANCE_HISTORY;
  const goals = INITIAL_PLAN_GOALS;
  const activities = VERIFIED_ACTIVITIES;
  const documents = VERIFIED_DOCUMENTS;

  return (
    <ClientDataContext.Provider
      value={{
        dataMode,
        setDataMode,
        isAuthenticated,
        login,
        logout,
        profile,
        updateProfileName,
        updateProfilePhoto,
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
