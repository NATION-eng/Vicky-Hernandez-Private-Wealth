"use client";

import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Sun, Moon, Eye, ZapOff, Sparkles } from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const { settings, setTextSize, setContrastMode, toggleReducedMotion } = useAccessibility();

  return (
    <aside aria-label="Accessibility display controls" className="relative z-50">
      {/* Persistent Quick Controls Bar */}
      <div className="bg-wealth-navy-950 text-white px-3 sm:px-4 py-1.5 sm:py-2 border-b border-wealth-navy-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-semibold text-wealth-gold-300 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-wealth-gold-400" aria-hidden="true" />
              <span className="hidden xs:inline">Viewing:</span>
            </span>
            <span className="text-[11px] text-slate-300 hidden md:inline">WCAG 2.2 AA</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Text Size Stepper */}
            <div className="flex items-center bg-wealth-navy-900 rounded-md p-0.5 border border-wealth-navy-700" role="group" aria-label="Text Size Options">
              <span className="px-1.5 text-[11px] text-slate-300 font-medium hidden sm:inline">Text:</span>
              <button
                type="button"
                onClick={() => setTextSize('standard')}
                aria-pressed={settings.textSize === 'standard'}
                className={`px-2 py-0.5 text-[11px] sm:text-xs rounded transition-all ${
                  settings.textSize === 'standard' 
                    ? 'bg-wealth-gold-500 text-wealth-navy-950 font-bold' 
                    : 'text-slate-200 hover:bg-wealth-navy-800'
                }`}
                title="100% Standard Text Size"
              >
                100%
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                aria-pressed={settings.textSize === 'large'}
                className={`px-2 py-0.5 text-[11px] sm:text-xs rounded transition-all ${
                  settings.textSize === 'large' 
                    ? 'bg-wealth-gold-500 text-wealth-navy-950 font-bold' 
                    : 'text-slate-200 hover:bg-wealth-navy-800'
                }`}
                title="125% Large Text Size"
              >
                125%
              </button>
              <button
                type="button"
                onClick={() => setTextSize('extra-large')}
                aria-pressed={settings.textSize === 'extra-large'}
                className={`px-2 py-0.5 text-[11px] sm:text-xs rounded transition-all ${
                  settings.textSize === 'extra-large' 
                    ? 'bg-wealth-gold-500 text-wealth-navy-950 font-bold' 
                    : 'text-slate-200 hover:bg-wealth-navy-800'
                }`}
                title="150% Extra Large Text Size"
              >
                150%
              </button>
            </div>

            {/* Quick Contrast Controls */}
            <div className="flex items-center bg-wealth-navy-900 rounded-md p-0.5 border border-wealth-navy-700" role="group" aria-label="Contrast Modes">
              <button
                type="button"
                onClick={() => setContrastMode('default')}
                aria-pressed={settings.contrastMode === 'default'}
                className={`px-2 py-0.5 text-[11px] sm:text-xs rounded flex items-center gap-1 ${
                  settings.contrastMode === 'default'
                    ? 'bg-wealth-gold-500 text-wealth-navy-950 font-bold'
                    : 'text-slate-200 hover:bg-wealth-navy-800'
                }`}
                title="Warm Paper (Default)"
              >
                <Sun className="w-3 h-3" aria-hidden="true" />
                <span className="hidden sm:inline">Warm</span>
              </button>
              <button
                type="button"
                onClick={() => setContrastMode('high-contrast')}
                aria-pressed={settings.contrastMode === 'high-contrast'}
                className={`px-2 py-0.5 text-[11px] sm:text-xs rounded flex items-center gap-1 ${
                  settings.contrastMode === 'high-contrast'
                    ? 'bg-white text-black font-bold'
                    : 'text-slate-200 hover:bg-wealth-navy-800'
                }`}
                title="High Contrast (Black on White)"
              >
                <Eye className="w-3 h-3" aria-hidden="true" />
                <span className="hidden sm:inline">Contrast</span>
              </button>
              <button
                type="button"
                onClick={() => setContrastMode('dark')}
                aria-pressed={settings.contrastMode === 'dark'}
                className={`px-2 py-0.5 text-[11px] sm:text-xs rounded flex items-center gap-1 ${
                  settings.contrastMode === 'dark'
                    ? 'bg-wealth-gold-500 text-wealth-navy-950 font-bold'
                    : 'text-slate-200 hover:bg-wealth-navy-800'
                }`}
                title="Calm Night Dark"
              >
                <Moon className="w-3 h-3" aria-hidden="true" />
                <span className="hidden sm:inline">Night</span>
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <button
              type="button"
              onClick={toggleReducedMotion}
              aria-pressed={settings.reducedMotion}
              className={`px-2 py-0.5 text-[11px] sm:text-xs rounded border flex items-center gap-1 ${
                settings.reducedMotion
                  ? 'bg-wealth-gold-500 text-wealth-navy-950 border-wealth-gold-400 font-bold'
                  : 'bg-wealth-navy-900 text-slate-200 border-wealth-navy-700 hover:bg-wealth-navy-800'
              }`}
              title="Pause animations and motion"
            >
              <ZapOff className="w-3 h-3" aria-hidden="true" />
              <span className="hidden sm:inline">{settings.reducedMotion ? 'Motion Off' : 'Motion On'}</span>
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
