"use client";

import React, { useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { ShieldCheck, Lock, AlertCircle, X, KeyRound } from 'lucide-react';

interface StepUpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  actionTitle?: string;
}

export const StepUpVerificationModal: React.FC<StepUpVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  actionTitle = "Access Sensitive Security Settings",
}) => {
  const { verifyStepUp, profile } = useClientData();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyStepUp(passcode);
    if (success) {
      setError(false);
      setPasscode("");
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="step-up-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wealth-navy-950/70 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-md p-6 overflow-hidden">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-wealth-navy-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-wealth-navy-900" aria-hidden="true" />
            </div>
            <div>
              <h2 id="step-up-title" className="font-serif font-bold text-lg text-wealth-navy-950">
                Security Step-Up Verification
              </h2>
              <p className="text-xs text-slate-500">Protecting your private wealth records</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
            aria-label="Cancel verification"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="py-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            To proceed with <strong>{actionTitle}</strong>, please enter your 4-digit security code or the last 4 digits of your client account number (<span className="font-mono font-bold text-slate-900">8920</span>).
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="step-up-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Security Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
                <input
                  id="step-up-input"
                  type="password"
                  maxLength={6}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter 8920..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-lg font-mono tracking-widest text-slate-900 focus:bg-white focus:ring-2 focus:ring-wealth-gold-500 focus:border-wealth-gold-500"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Hint: For demonstration, enter 8920 or 123456.</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800" role="alert">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
                <span>Incorrect passcode. Please try again or contact your adviser.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-touch px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={passcode.trim().length === 0}
                className="btn-touch px-5 py-2 bg-wealth-navy-950 text-white rounded-lg text-xs font-semibold hover:bg-wealth-navy-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-wealth-gold-300" aria-hidden="true" />
                <span>Verify & Proceed</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
