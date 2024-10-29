import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await db.collection('users').findOne({
    email,
  });

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // TODO: use `bcryptjs`
  if (user.password !== password) {
    return new Response('Unauthorized', { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, 'MySecret', { expiresIn: '24h' });

  return Response.json({ token });
}
