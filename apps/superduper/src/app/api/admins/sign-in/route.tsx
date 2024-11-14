import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';
  try {
    const collection = DB.collection('users');
    const body = await request.json();
    const { email, password } = body;
    const user = await collection.findOne({ email, role: 'admin' });
    if (!user) return Response.json({ status: 404 });
    const isSame = await bcrypt.compare(String(password), user.password);

    if (isSame) {
      const accessToken = jwt.sign({ userId: user._id, email }, ADMIN_ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
      });
      console.log(accessToken);

      const response = new Response(null, { status: 201 });
      response.headers.append('Set-cookie', `token=${accessToken}; Path=/; Max-Age=43200; SameSite=Lax`);
      return response;
    } else {
      return new Response(null, { status: 404 });
    }
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}
