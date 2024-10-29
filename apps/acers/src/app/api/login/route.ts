import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DB } from '../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { email, password } = body;


  const user = await DB.collection('users').findOne({ email });

    if (!user) {
      return new Response('Invalid email', { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response('Invalid password', { status: 401 });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    return new Response(
      JSON.stringify({
        authtoken: token,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Internal server error', { status: 500 });

  }
}
