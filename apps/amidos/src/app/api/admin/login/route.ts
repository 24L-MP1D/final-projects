import { db } from '@/lib/db';
import 'dotenv/config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
export async function POST(request: Request) {
  try {
    const bcrypt = require('bcryptjs');
    const body = await request.json();
    const { email, password } = body;
    const user = await db.collection('user').findOne({ email: email });
    if (!user) {
      return new Response('Please sign up', { status: 401 });
    }
    const isValid = await bcrypt.compareSync(password, user.password);
    if (!isValid) return new Response('Wrong password', { status: 401 });
    if (isValid) {
      const token = jwt.sign({ userId: user._id, email: email, role: user.role ?? '' }, TOKEN_SECRET, { expiresIn: '1d' });

      return Response.json({ token });
    }
  } catch (error) {
    return new Response('You are not authenticated', { status: 401 });
  }
}
