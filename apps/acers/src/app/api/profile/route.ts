import jwt from 'jsonwebtoken';
import { DB } from '../../lib/db';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET(request: Request) {
  const token = request.headers.get('authtoken');

  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const objectUserId = new ObjectId(userId);

    const user = await DB.collection('users').findOne({ _id: objectUserId });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(
      JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
