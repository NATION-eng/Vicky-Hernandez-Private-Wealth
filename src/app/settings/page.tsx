"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import { StepUpVerificationModal } from '@/components/StepUpVerificationModal';
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Sliders, 
  Bell, 
  Lock, 
  Eye, 
  History, 
  CheckCircle2, 
  Check, 
  ZapOff,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';

export default function SettingsPage() {
  const { profile, updateProfileName, auditLog, isStepUpVerified, requestStepUpReset } = useClientData();
  const { settings, setTextSize, setContrastMode, toggleReducedMotion } = useAccessibility();

  const [activeTab, setActiveTab] = useState<'profile' | 'display' | 'security' | 'audit'>('profile');
  const [preferredNameInput, setPreferredNameInput] = useState(profile.preferredName);
  const [isNameSaved, setIsNameSaved] = useState(false);

  // Step-up verification state
  const [isStepUpOpen, setIsStepUpOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<string>("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (preferredNameInput.trim().length > 0) {
      updateProfileName(preferredNameInput);
      setIsNameSaved(true);
      setTimeout(() => setIsNameSaved(false), 3000);
    }
  };

  const triggerSensitiveAction = (actionName: string) => {
    if (!isStepUpVerified) {
      setPendingAction(actionName);
      setIsStepUpOpen(true);
    } else {
      alert(`Verified: ${actionName} unlocked.`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Settings Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-wealth-gold-600 bg-wealth-gold-50 px-2.5 py-0.5 rounded-full border border-wealth-gold-200">
                Client Control Center
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Preferences & Security Safeguards
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-wealth-navy-950">
              Account Preferences & Security
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Manage how your information is displayed, configure age-inclusive readability settings, and review immutable session audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {isStepUpVerified ? (
              <span className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Step-Up Authenticated</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPendingAction("Full Security Unlock");
                  setIsStepUpOpen(true);
                }}
                className="btn-touch px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold flex items-center gap-1.5 border border-slate-200"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                <span>Step-Up Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 overflow-x-auto" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            className={`btn-touch px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'profile' ? 'bg-wealth-navy-950 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Profile & Greeting</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'display'}
            onClick={() => setActiveTab('display')}
            className={`btn-touch px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'display' ? 'bg-wealth-navy-950 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Viewing & Accessibility</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
            className={`btn-touch px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'security' ? 'bg-wealth-navy-950 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Security & Authentication</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'audit'}
            onClick={() => setActiveTab('audit')}
            className={`btn-touch px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'audit' ? 'bg-wealth-navy-950 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <History className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Audit Trail Ledger</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Profile & Greeting */}
      {activeTab === 'profile' && (
        <section aria-labelledby="profile-settings-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 id="profile-settings-title" className="text-xl font-serif font-bold text-wealth-navy-950 mb-1">
            Personal Details & Salutation
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Configure how our platform addresses you across headers and reports.
          </p>

          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
            <div>
              <label htmlFor="preferred-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Preferred Name (Used in Portal Greeting)
              </label>
              <input
                id="preferred-name"
                type="text"
                value={preferredNameInput}
                onChange={(e) => setPreferredNameInput(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Legal Registered Name
              </label>
              <input
                type="text"
                disabled
                value={profile.fullName}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-1">Changes to legal identity require certified custodian documentation.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Client Account Masked Identifier
              </label>
              <input
                type="text"
                disabled
                value={profile.accountNumberMasked}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono cursor-not-allowed"
              />
            </div>

            {isNameSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Preferred name updated successfully and recorded in audit log.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-touch px-5 py-2.5 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 transition-colors"
            >
              Save Preferred Name
            </button>
          </form>
        </section>
      )}

      {/* Tab 2: Viewing & Accessibility Settings */}
      {activeTab === 'display' && (
        <section aria-labelledby="display-settings-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
          <div>
            <h2 id="display-settings-title" className="text-xl font-serif font-bold text-wealth-navy-950 mb-1">
              Visual Ergonomics & Reading Comfort (WCAG 2.2 AA)
            </h2>
            <p className="text-xs text-slate-500">
              Customize text magnification, high-contrast themes, and motion controls.
            </p>
          </div>

          {/* Text Size Stepper */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-serif font-bold text-base text-wealth-navy-950 mb-1">
              Text Scaling & Sizing
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              All dashboard cards, reports, and tables scale seamlessly without layout clipping up to 200%.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setTextSize('standard')}
                aria-pressed={settings.textSize === 'standard'}
                className={`p-4 rounded-lg border text-left transition-all ${
                  settings.textSize === 'standard'
                    ? 'bg-white border-wealth-gold-500 shadow-sm ring-2 ring-wealth-gold-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-bold text-sm text-wealth-navy-950">Standard (18px)</p>
                <p className="text-xs text-slate-500 mt-1">Default comfortable reading size.</p>
              </button>

              <button
                type="button"
                onClick={() => setTextSize('large')}
                aria-pressed={settings.textSize === 'large'}
                className={`p-4 rounded-lg border text-left transition-all ${
                  settings.textSize === 'large'
                    ? 'bg-white border-wealth-gold-500 shadow-sm ring-2 ring-wealth-gold-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-bold text-base text-wealth-navy-950">Large (21px)</p>
                <p className="text-xs text-slate-500 mt-1">125% magnification for ease.</p>
              </button>

              <button
                type="button"
                onClick={() => setTextSize('extra-large')}
                aria-pressed={settings.textSize === 'extra-large'}
                className={`p-4 rounded-lg border text-left transition-all ${
                  settings.textSize === 'extra-large'
                    ? 'bg-white border-wealth-gold-500 shadow-sm ring-2 ring-wealth-gold-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-bold text-lg text-wealth-navy-950">Extra Large (24px)</p>
                <p className="text-xs text-slate-500 mt-1">150% maximum readability.</p>
              </button>
            </div>
          </div>

          {/* Contrast Mode Selector */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-serif font-bold text-base text-wealth-navy-950 mb-1">
              Color Contrast & Glare Reduction
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Select the palette that provides the highest visual comfort for your eyes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setContrastMode('default')}
                aria-pressed={settings.contrastMode === 'default'}
                className={`p-4 rounded-lg border text-left transition-all ${
                  settings.contrastMode === 'default'
                    ? 'bg-white border-wealth-gold-500 shadow-sm ring-2 ring-wealth-gold-400'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-wealth-gold-600" aria-hidden="true" />
                  <p className="font-bold text-sm text-wealth-navy-950">Warm Paper (Default)</p>
                </div>
                <p className="text-xs text-slate-500">Low-glare warm alabaster background.</p>
              </button>

              <button
                type="button"
                onClick={() => setContrastMode('high-contrast')}
                aria-pressed={settings.contrastMode === 'high-contrast'}
                className={`p-4 rounded-lg border text-left transition-all ${
                  settings.contrastMode === 'high-contrast'
                    ? 'bg-white border-black shadow-sm ring-2 ring-black'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-black" aria-hidden="true" />
                  <p className="font-bold text-sm text-black">High Contrast (B&W)</p>
                </div>
                <p className="text-xs text-slate-600">Pure black-on-white with 7:1+ contrast.</p>
              </button>

              <button
                type="button"
                onClick={() => setContrastMode('dark')}
                aria-pressed={settings.contrastMode === 'dark'}
                className={`p-4 rounded-lg border text-left transition-all ${
                  settings.contrastMode === 'dark'
                    ? 'bg-wealth-navy-900 text-white border-wealth-gold-400 shadow-sm ring-2 ring-wealth-gold-400'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="w-4 h-4 text-wealth-gold-400" aria-hidden="true" />
                  <p className="font-bold text-sm">Calm Dark</p>
                </div>
                <p className="text-xs text-slate-400">Deep midnight navy for night reading.</p>
              </button>
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-wealth-navy-950">
                Reduced Motion & Animation Suppression
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Disables all non-essential page animations, graph transitions, and hover motion.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleReducedMotion}
              aria-pressed={settings.reducedMotion}
              className={`btn-touch px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${
                settings.reducedMotion
                  ? 'bg-wealth-gold-500 text-wealth-navy-950 border-wealth-gold-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <ZapOff className="w-4 h-4" aria-hidden="true" />
              <span>{settings.reducedMotion ? 'Reduced Motion Active' : 'Enable Reduced Motion'}</span>
            </button>
          </div>
        </section>
      )}

      {/* Tab 3: Security & Step-Up Verification */}
      {activeTab === 'security' && (
        <section aria-labelledby="security-settings-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
          <div>
            <h2 id="security-settings-title" className="text-xl font-serif font-bold text-wealth-navy-950 mb-1">
              Security Gateways & Step-Up Protection
            </h2>
            <p className="text-xs text-slate-500">
              PRD FR-11: Sensitive profile changes and exports require step-up authentication.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-wealth-navy-950">Multi-Factor Authentication (MFA)</p>
                <p className="text-xs text-slate-600">Enforced for all logins and new browser sessions.</p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Enabled (SMS & Security App)
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-wealth-navy-950">Change Account Security Passcode</p>
                <p className="text-xs text-slate-600">Update your 4-digit security code for portal authorizations.</p>
              </div>
              <button
                type="button"
                onClick={() => triggerSensitiveAction("Change Security Passcode")}
                className="btn-touch px-4 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800"
              >
                Request Passcode Change
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-wealth-navy-950">Trusted Recovery Contact</p>
                <p className="text-xs text-slate-600">Designated family or legal representative for account recovery.</p>
              </div>
              <button
                type="button"
                onClick={() => triggerSensitiveAction("Update Recovery Delegate")}
                className="btn-touch px-4 py-2 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold"
              >
                Manage Delegates
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tab 4: Immutable Audit Trail */}
      {activeTab === 'audit' && (
        <section aria-labelledby="audit-trail-title" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 id="audit-trail-title" className="text-xl font-serif font-bold text-wealth-navy-950">
                Immutable Access & Action Audit Trail
              </h2>
              <p className="text-xs text-slate-500">Every session, preference update, and document view is audited.</p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {auditLog.length} Events Logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse" aria-label="Security Audit Log">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50 text-xs font-bold uppercase text-wealth-navy-950">
                  <th scope="col" className="py-2.5 px-3">Timestamp (ISO)</th>
                  <th scope="col" className="py-2.5 px-3">Action</th>
                  <th scope="col" className="py-2.5 px-3">Target</th>
                  <th scope="col" className="py-2.5 px-3">Outcome</th>
                  <th scope="col" className="py-2.5 px-3 text-right">IP (Masked)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-xs">
                {auditLog.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">{ev.timestamp}</td>
                    <td className="py-3 px-3 font-bold text-wealth-navy-950">{ev.action}</td>
                    <td className="py-3 px-3 text-slate-600">{ev.target}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        ev.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {ev.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-500">{ev.ipAddressMasked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Step-Up Verification Modal */}
      <StepUpVerificationModal
        isOpen={isStepUpOpen}
        onClose={() => setIsStepUpOpen(false)}
        onSuccess={() => {
          setIsStepUpOpen(false);
          alert(`Step-up authentication verified successfully.`);
        }}
        actionTitle={pendingAction}
      />

    </div>
  );
}
