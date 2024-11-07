import { db } from '@/lib/db';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { headers } from 'next/headers';
const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
console.log(TOKEN_SECRET);

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
    role: string;
  }
}

export async function GET(request: Request) {
  const headersList = await headers();
  const authorization = headersList.get('authorization') || '';
  console.log(authorization);
  if (!authorization) {
    return new Response('Unauthenticated', { status: 401 });
  }

  const { userId } = <jwt.UserIDJwtPayload>jwt.verify(authorization, TOKEN_SECRET);
  const { role } = <jwt.UserIDJwtPayload>jwt.verify(authorization, TOKEN_SECRET);
  console.log(userId, role);
  if (!userId) {
    return new Response('Unauthenticated', { status: 401 });
  }
  if (role !== 'admin') {
    return new Response('Unauthenticated', { status: 401 });
  }

  const currentUser = await db.collection('user').findOne({ _id: new ObjectId(userId) });
  console.log(currentUser);
  if (!currentUser) {
    return new Response('Unauthenticated', { status: 401 });
  }
  return Response.json(currentUser);
}
