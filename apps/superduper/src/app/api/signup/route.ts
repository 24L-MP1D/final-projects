import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';
export async function POST(request: Request) {
  try {
    const collection = DB.collection('users');
    const user = await request.json();

    const salt = process.env.SECRET_SALT || '';
    const hashedPass = bcrypt.hashSync(user.password, Number(salt));

    let form = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPass,
    };

    const response = await collection.insertOne(form);

    return new Response(null, { status: 201 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
