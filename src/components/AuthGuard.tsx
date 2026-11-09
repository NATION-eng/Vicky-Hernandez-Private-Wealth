"use client";

import React, { useEffect, useState } from 'react';
import { useClientData } from '@/context/ClientDataContext';
import { usePathname, useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

// Routes that can be viewed without signing in
const PUBLIC_PATHS = [
  '/',
  '/sign-in',
  '/privacy',
  '/security',
  '/accessibility',
  '/about',
  '/forgot-password'
];

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useClientData();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (mounted && !isAuthenticated && !isPublicPath) {
      // Direct access bypass prevented — redirect to login entry point immediately
      router.replace(`/?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, isAuthenticated, isPublicPath, pathname, router]);

  if (!mounted) {
    return null; // Prevent hydration flash
  }

  // If user is authenticated or on an allowed public page, render children
  if (isAuthenticated || isPublicPath) {
    return <>{children}</>;
  }

  // While redirecting unauthorized access
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
        <div className="w-5 h-5 border-2 border-wealth-gold-500 border-t-transparent rounded-full animate-spin" />
        <span>Verifying institutional session...</span>
      </div>
    </div>
  );
};
