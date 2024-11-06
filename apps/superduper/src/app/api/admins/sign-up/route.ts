import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const AUTH_SALT = process.env.AUTH_SALT || '';
  try {
    const collection = DB.collection('users');
    const body = await request.json();
    const { firstname, lastname, email, password } = body;
    if (!firstname || !lastname || !email || !password) return new Response(null, { status: 400 });
    const hashedPassword = await bcrypt.hash(String(password), Number(AUTH_SALT));
    const res = await collection.insertOne({ firstname, lastname, email, password: hashedPassword, role: 'admin' });
    return new Response(null, { status: 201 });
  } catch (err) {
    return new Response(null, { status: 400 });
  }
}
