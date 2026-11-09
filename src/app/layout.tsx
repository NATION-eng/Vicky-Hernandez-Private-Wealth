import type { Metadata } from 'next';
import './globals.css';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { ClientDataProvider } from '@/context/ClientDataContext';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { DemoWatermarkBanner } from '@/components/DemoWatermarkBanner';
import { AccessibleHeader } from '@/components/AccessibleHeader';
import { AppNavigation } from '@/components/AppNavigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vicky Hernandez Private Wealth | Personalized Fiduciary Portfolio Portal',
  description: 'A dignified, age-inclusive digital wealth portal designed for Vicky Hernandez. Delivering transparent reporting, verified holdings, and dedicated advisory planning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-size-standard">
      <body className="min-h-screen flex flex-col bg-wealth-sand-50 text-slate-900 selection:bg-wealth-gold-200">
        <AccessibilityProvider>
          <ClientDataProvider>
            {/* Top Accessibility Bar */}
            <AccessibilityToolbar />

            {/* Persistent Demo Watermark Warning Banner (Active only in Demo Mode) */}
            <DemoWatermarkBanner />

            {/* Main Application Header */}
            <AccessibleHeader />

            {/* Primary Navigation Menu */}
            <AppNavigation />

            {/* Main Page Body */}
            <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </ClientDataProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
