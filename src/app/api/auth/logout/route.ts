import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: 'Signed out successfully.'
  });

  // Expire and delete the session cookie
  response.cookies.delete('vhpw_session');
  response.cookies.set({
    name: 'vhpw_session',
    value: '',
    path: '/',
    expires: new Date(0)
  });

  return response;
}
