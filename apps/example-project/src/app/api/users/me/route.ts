import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { headers } from 'next/headers';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export async function GET(request: Request) {
  const headersList = await headers();
  const authorization = headersList.get('authorization') || '';
  if (!authorization) {
    return new Response('Unauthenticated', { status: 401 });
  }
  const { userId } = <jwt.UserIDJwtPayload>jwt.verify(authorization, 'MySecret');
  if (!userId) {
    return new Response('Unauthenticated', { status: 401 });
  }

  const currentUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  if (!currentUser) {
    return new Response('Unauthenticated', { status: 401 });
  }
  return Response.json(currentUser);
}
