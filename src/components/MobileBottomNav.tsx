"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Target, 
  FileText, 
  HelpCircle 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { isAuthenticated } = useClientData();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      isActive: pathname === '/dashboard',
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
      icon: Briefcase,
      isActive: pathname.startsWith('/portfolio'),
    },
    {
      href: '/plan',
      label: 'Plan',
      icon: Target,
      isActive: pathname.startsWith('/plan'),
    },
    {
      href: '/documents',
      label: 'Vault',
      icon: FileText,
      isActive: pathname.startsWith('/documents'),
    },
    {
      href: '/help',
      label: 'Concierge',
      icon: HelpCircle,
      isActive: pathname.startsWith('/help'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-wealth-navy-950/95 backdrop-blur-md border-t border-wealth-gold-500/20 shadow-2xl transition-all"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0.5rem), 0.5rem)' }}
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1 px-1 transition-all relative ${
                item.isActive
                  ? 'text-wealth-gold-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {item.isActive && (
                <span 
                  className="absolute top-0 w-8 h-0.5 bg-gradient-to-r from-wealth-gold-400 to-wealth-gold-500 rounded-full shadow-[0_0_8px_rgba(230,202,133,0.8)]"
                  aria-hidden="true"
                />
              )}
              
              <div className="relative mt-1">
                <Icon 
                  className={`w-5 h-5 transition-transform ${
                    item.isActive ? 'scale-110 text-wealth-gold-400' : 'text-slate-400'
                  }`} 
                  aria-hidden="true" 
                />
              </div>

              <span className={`text-[10px] tracking-wide mt-1 uppercase ${
                item.isActive ? 'text-wealth-gold-200' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
