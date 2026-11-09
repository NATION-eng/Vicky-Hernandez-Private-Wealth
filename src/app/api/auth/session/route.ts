import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/serverAuth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('vhpw_session')?.value;
    const session = verifySessionToken(sessionCookie);

    if (!session.valid) {
      // Clear invalid/expired cookie
      const response = NextResponse.json({
        authenticated: false,
        error: 'Session expired or invalid.'
      });
      response.cookies.delete('vhpw_session');
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        username: session.username,
        displayName: 'Vicky Hernandez',
        email: null
      },
      expiresAt: session.expiresAt
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: 'Session check failed.' },
      { status: 500 }
    );
  }
}
