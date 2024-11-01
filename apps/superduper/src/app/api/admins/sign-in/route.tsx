import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';
  try {
    const collection = DB.collection('users');
    const body = await request.json();
    const { email, password } = body;
    const user = await collection.findOne({ email });
    if (!user) return Response.json({ status: 404 });
    const isSame = await bcrypt.compare(String(password), user.password);

    if (isSame) {
      const accessToken = jwt.sign({ userId: user._id, email }, ADMIN_ACCESS_TOKEN_SECRET, {
        expiresIn: '7d',
      });

      const response = new Response(null, { status: 201 });
      response.headers.append('Set-cookie', `token=${accessToken}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax`);
      return response;
    } else {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}
