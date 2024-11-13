import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const collection = await DB.collection('users');
    const body = await request.json();
    const { email, password } = body;
    const newUser = await collection.findOne({ email });

    if (!newUser) return new Response('Unauthorized', { status: 404 });
    const Authenticated = await bcrypt.compare(password, newUser.password);
    console.log(Authenticated);


    if (Authenticated) {
      const accessToken = jwt.sign({ email: newUser.email, userId: newUser._id }, 'Privetkey', { expiresIn: '72h' });
      //   console.log(accessToken);
      const response = new Response(null, { status: 201 });
      response.headers.append('Set-cookie', `token=${accessToken};HttpOnly; Path=/; Max-Age=43200; SameSite=Lax`);
      return response;
    } else {

      return new Response('Password did not match', { status: 404 });

    }
  } catch {
    return new Response(null, { status: 404 });
  }
}
