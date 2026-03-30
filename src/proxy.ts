import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Skillio Proxy - Declarative Routing & Redirects (Replaces Middleware)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Catch /undefined redirects early (common mobile link bug)
  if (pathname.includes('/undefined')) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.pathname = '/';
    return NextResponse.redirect(cleanUrl);
  }

  // 2. Add custom log tracing for navigations (Server-side)
  // [EVENT] NAVIGATION to pathname
  
  return NextResponse.next();
}

/**
 * Configure matching paths for middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|public).*)',
  ],
};
