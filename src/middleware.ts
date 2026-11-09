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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected) {
    const sessionCookie = request.cookies.get('vhpw_session')?.value;

    if (!sessionCookie) {
      // Direct access bypass prevented — redirect to login page
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token structure and expiration
    const parts = sessionCookie.split('.');
    if (parts.length !== 2) {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Decode payload to verify expiration
      const payloadJson = Buffer.from(parts[0], 'base64url').toString('utf8');
      const payload = JSON.parse(payloadJson);

      if (!payload.exp || Date.now() > payload.exp) {
        // Expired session
        const loginUrl = new URL('/', request.url);
        loginUrl.searchParams.set('expired', 'true');
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('vhpw_session');
        return response;
      }
    } catch {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
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
