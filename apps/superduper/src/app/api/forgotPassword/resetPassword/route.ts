import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';

const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';
interface User {
  _id: string;
  password: string;
}

export async function PUT(request: Request) {
  const collection = DB.collection('users');
  const { password, email } = await request.json();

  const salt = process.env.SECRET_SALT || '';
  const hashedPass = bcrypt.hashSync(password, salt);

  try {
    await collection.updateOne({ email }, { $set: { password: hashedPass } });

    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
