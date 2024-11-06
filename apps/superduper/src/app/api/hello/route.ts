import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

declare module 'jsonwebtoken' {
  export interface UserIDPayload extends jwt.JwtPayload {
    userId: string;
  }
}
export async function POST() {
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';
  if (!ADMIN_ACCESS_TOKEN_SECRET) return new Response('internal server error:missing token secret', { status: 500 });
  const cookieStore = await cookies();
  const cookie = await cookieStore.get('token');
  const userToken = cookie?.value;
  if (!userToken) return new Response('unauthenticated', { status: 400 });
  const { userId } = <jwt.JwtPayload>jwt.verify(userToken, ADMIN_ACCESS_TOKEN_SECRET);
}
