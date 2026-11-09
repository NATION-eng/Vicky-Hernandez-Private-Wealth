import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'HEALTHY',
    service: 'Vicky Hernandez Private Wealth Core Engine',
    version: '1.0.0',
    wcagCompliance: 'WCAG 2.2 AA',
    fiduciaryGuardrails: {
      moneyMovementDisabled: true,
      dataProvenanceEnforced: true,
      demoIsolationEnforced: true,
    },
    timestamp: new Date().toISOString(),
  });
}
