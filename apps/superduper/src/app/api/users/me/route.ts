import { DB } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

declare module 'jsonwebtoken' {
  export interface UserIDPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export async function GET(request: Request) {
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';
  if (!ADMIN_ACCESS_TOKEN_SECRET) return new Response('internal server error:missing token secret', { status: 500 });
  try {
    const cookieStore = cookies();
    const cookie = await cookieStore.get('token');
    const userToken = cookie?.value;
    console.log(userToken);
    if (!userToken) return new Response('unauthenticated', { status: 400 });
    const { userId } = <jwt.JwtPayload>jwt.verify(userToken, ADMIN_ACCESS_TOKEN_SECRET);

    if (!userId) return new Response('unauthenticated', { status: 404 });
    const currentUser = await DB.collection('users').findOne({ _id: new ObjectId(String(userId)) });
    if (!currentUser) return new Response('unauthenticated', { status: 404 });
    return Response.json(currentUser);
  } catch (err) {
    return new Response('unauthenticated', { status: 400 });
  }
}
