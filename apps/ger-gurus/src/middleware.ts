import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  const currentHost = hostname === 'localhost:3000' ? process.env.CURRENT_HOST : hostname;

  let domain = '';

  switch (currentHost) {
    case 'ger-gurus.vercel.app':
      domain = 'client';
      break;
    case 'dashboard-ger-gurus.vercel.app':
      domain = 'dashboard';
      break;
    default:
      domain = 'client';

  }

  return NextResponse.rewrite(new URL(`/${domain}${pathname}${search}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
