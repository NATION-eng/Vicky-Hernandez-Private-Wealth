"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClientData } from '@/context/ClientDataContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Target, 
  History, 
  FileText, 
  HelpCircle, 
  Settings,
  PieChart
} from 'lucide-react';

export const AppNavigation: React.FC = () => {
  const { isAuthenticated } = useClientData();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return null;
  }

  const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/portfolio', label: 'My Portfolio', icon: Briefcase },
    { href: '/portfolio/allocation', label: 'Allocation', icon: PieChart },
    { href: '/plan', label: 'My Plan', icon: Target },
    { href: '/activity', label: 'Activity', icon: History },
    { href: '/documents', label: 'Documents', icon: FileText },
    { href: '/help', label: 'Help & Concierge', icon: HelpCircle },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav 
      aria-label="Main Portfolio Navigation"
      className="hidden md:block bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-20 z-30 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-2.5 no-scrollbar">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href) && (link.href !== '/portfolio' || pathname === '/portfolio'));

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`btn-touch px-3.5 py-2 rounded-lg text-xs tracking-wider uppercase font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-wealth-navy-950 text-white border-wealth-navy-900 shadow-sm'
                    : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100/80 hover:text-wealth-navy-950'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-wealth-gold-400' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
