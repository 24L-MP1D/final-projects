import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/client/addProducts/:path*',
    '/client/save/:path*',
    '/api/bids/:path*',
    '/api/chatbot/:path*',
    '/api/favorites/:path*',
    '/api/notifications/:path*',
    '/api/product/:path*',
    '/api/products',
    '/api/sellerRequest/:path*',
  ],
};

const ADMIN_ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.ADMIN_ACCESS_TOKEN_SECRET || '');

export default async function authenticationMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';

  if (!token) {
    return NextResponse.redirect(new URL('/client/sign-in', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, ADMIN_ACCESS_TOKEN_SECRET);
    console.log('JWT Payload:', payload);
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect(new URL('/client/sign-in', request.url));
  }
}
