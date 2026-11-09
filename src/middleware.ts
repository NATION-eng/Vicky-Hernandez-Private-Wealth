import { NextRequest, NextResponse } from 'next/server';

// Routes that require active authentication
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/portfolio',
  '/plan',
  '/activity',
  '/documents',
  '/settings',
  '/help',
  '/contact',
  '/demo',
  '/verify'
];

/**
 * Universal base64url decode that works reliably across Edge Runtime, Node.js, and Browsers
 */
function decodeJwtPayload(tokenPart: string): { u?: string; exp?: number } | null {
  try {
    let base64 = tokenPart.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected) {
    const sessionCookie = request.cookies.get('vhpw_session')?.value;

    if (!sessionCookie) {
      // Direct access bypass prevented — redirect to login entry point
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token structure
    const parts = sessionCookie.split('.');
    if (parts.length !== 2) {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJwtPayload(parts[0]);

    if (!payload || !payload.exp || Date.now() > payload.exp) {
      // Expired or invalid session
      const loginUrl = new URL('/', request.url);
      if (payload && payload.exp && Date.now() > payload.exp) {
        loginUrl.searchParams.set('expired', 'true');
      }
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('vhpw_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)'
  ]
};
