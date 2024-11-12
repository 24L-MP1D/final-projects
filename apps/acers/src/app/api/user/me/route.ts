import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { headers } from 'next/headers';
import { DB } from '../../../lib/db';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export async function GET(request: Request) {
  const headersList = await headers();
  const authorization = headersList.get('authtoken') || '';
  if (!authorization) {
    return new Response('Unauthenticated', { status: 401 });
  }
  const { userId } = <jwt.UserIDJwtPayload>jwt.verify(authorization, process.env.JWT_SECRET || '');
  if (!userId) {
    return new Response('Unauthenticated', { status: 401 });
  }

  const currentUser = await DB.collection('users').findOne({ _id: new ObjectId(userId) });
  if (!currentUser) {
    return new Response('Unauthenticated', { status: 401 });
  }
  return Response.json(currentUser);
}
