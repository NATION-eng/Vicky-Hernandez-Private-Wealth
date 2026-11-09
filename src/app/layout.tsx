import type { Metadata } from 'next';
import './globals.css';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { ClientDataProvider } from '@/context/ClientDataContext';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { AccessibleHeader } from '@/components/AccessibleHeader';
import { AppNavigation } from '@/components/AppNavigation';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { AuthGuard } from '@/components/AuthGuard';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://vicky-hernandez-private-wealth.vercel.app'),
  title: {
    default: 'Vicky Hernandez Private Wealth | Personalized Fiduciary Portfolio',
    template: '%s | Vicky Hernandez Private Wealth',
  },
  description: 'Private Wealth Management & Personalized Fiduciary Portfolio for Vicky Hernandez. Direct institutional custody reporting via Northern Trust Global Custody, verified holdings, and strategic wealth planning with Sterling Private Wealth Advisors.',
  applicationName: 'Vicky Hernandez Private Wealth Portal',
  authors: [{ name: 'Sterling Private Wealth Advisors LLC' }, { name: 'Vicky Hernandez' }],
  creator: 'Vicky Hernandez Private Wealth',
  publisher: 'Sterling Private Wealth Advisors',
  keywords: [
    'Vicky Hernandez',
    'Vicky Hernandez Private Wealth',
    'Vicky Hernandez Portfolio',
    'Northern Trust Global Custody',
    'Katherine Sterling CFP',
    'Private Wealth Management',
    'Fiduciary Portfolio',
    'Trust Portfolio',
    'Personalized Wealth Portal'
  ],
  openGraph: {
    title: 'Vicky Hernandez Private Wealth | Personalized Fiduciary Portfolio',
    description: 'Private Wealth Management & Personalized Fiduciary Portfolio for Vicky Hernandez. Direct institutional custody reporting via Northern Trust Global Custody, verified holdings, and personalized wealth preservation planning.',
    url: 'https://vicky-hernandez-private-wealth.vercel.app',
    siteName: 'Vicky Hernandez Private Wealth',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vicky Hernandez Private Wealth | Personalized Fiduciary Portfolio',
    description: 'Private Wealth Management & Personalized Fiduciary Portfolio for Vicky Hernandez. Direct institutional custody reporting via Northern Trust Global Custody, verified holdings, and dedicated wealth planning.',
    creator: '@SterlingWealth',
  },
  robots: {
    index: true,
    follow: true,
  },
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

            {/* Main Application Header with Live Status & Sign Out */}
            <AccessibleHeader />

            {/* Primary Desktop Navigation Menu */}
            <AppNavigation />

            {/* Main Page Body with Mandatory Auth Guard & Mobile Safe Padding */}
            <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-28 md:pb-12">
              <AuthGuard>
                {children}
              </AuthGuard>
            </main>

            {/* Sticky Mobile Bottom Navigation Bar (Hidden on desktop) */}
            <MobileBottomNav />

            {/* Footer */}
            <Footer />
          </ClientDataProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
