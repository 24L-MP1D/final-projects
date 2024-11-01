import { DB } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}
const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';

export async function GET(request: Request) {
  console.log('fdaasf');
  const cookieStore = cookies();
  const token = cookieStore.get('token') || '';
  console.log(token);
  if (!token) {
    return new Response('Unauthenticated', { status: 401 });
  }

  const { userId } = <jwt.UserIDJwtPayload>jwt.verify(token.value, ADMIN_ACCESS_TOKEN_SECRET);
  console.log(userId);
  if (!userId) {
    return new Response('Unauthenticated', { status: 401 });
  }
  const currentUser = await DB.collection('users').findOne({ _id: new ObjectId(userId) });
  console.log(currentUser);
  if (!currentUser) {
    return new Response('Unauthenticated', { status: 401 });
  }
  return Response.json(currentUser);
}
