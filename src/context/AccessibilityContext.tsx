"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings } from '@/types/wealth';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setTextSize: (size: AccessibilitySettings['textSize']) => void;
  setContrastMode: (mode: AccessibilitySettings['contrastMode']) => void;
  toggleReducedMotion: () => void;
  resetToDefaults: () => void;
}

const defaultSettings: AccessibilitySettings = {
  textSize: 'standard',
  contrastMode: 'default',
  reducedMotion: false,
  audioDescriptions: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vhpw_accessibility');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('vhpw_accessibility', JSON.stringify(settings));

    const root = document.documentElement;

    // Apply text size class
    root.classList.remove('text-size-standard', 'text-size-large', 'text-size-xlarge');
    if (settings.textSize === 'large') {
      root.classList.add('text-size-large');
    } else if (settings.textSize === 'extra-large') {
      root.classList.add('text-size-xlarge');
    } else {
      root.classList.add('text-size-standard');
    }

    // Apply contrast mode
    root.classList.remove('theme-high-contrast', 'theme-dark');
    if (settings.contrastMode === 'high-contrast') {
      root.classList.add('theme-high-contrast');
    } else if (settings.contrastMode === 'dark') {
      root.classList.add('theme-dark');
    }

    // Apply motion preference
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [settings]);

  const setTextSize = (size: AccessibilitySettings['textSize']) => {
    setSettings((prev) => ({ ...prev, textSize: size }));
  };

  const setContrastMode = (mode: AccessibilitySettings['contrastMode']) => {
    setSettings((prev) => ({ ...prev, contrastMode: mode }));
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setTextSize,
        setContrastMode,
        toggleReducedMotion,
        resetToDefaults,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
