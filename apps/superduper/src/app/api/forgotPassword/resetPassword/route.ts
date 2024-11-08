import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';

const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';
interface User {
  _id: string;
  password: string;
}

export async function PUT(request: Request) {
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';
  const collection = DB.collection('users');
  const { password, email } = await request.json();
  console.log(password, email);

  const salt = process.env.SECRET_SALT || '';
  const hashedPass = bcrypt.hashSync(password, Number(salt));
  console.log(hashedPass);

  try {
    const updated = await collection.updateOne({ email }, { $set: { password: hashedPass } });
    // if (updated) {
    //   const accessToken = jwt.sign({ email: email }, ADMIN_ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
    //   const response = new Response(null, { status: 201 });
    //   response.headers.append('Set-cookie', `token=${accessToken}; Path=/; Max-Age=43200; SameSite=Lax`);
    //   return response;
    // } else {
    //   return new Response('Password did not match', { status: 404 });
    // }
    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
