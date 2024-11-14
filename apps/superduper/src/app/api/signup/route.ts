import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';
export async function POST(request: Request) {
  try {
    const collection = DB.collection('users');
    const user = await request.json();

    const userCheck = await collection.findOne({ email: user.email });
    if (!userCheck) {
      const salt = process.env.SECRET_SALT || '';
      const hashedPass = bcrypt.hashSync(user.password, Number(salt));
      const response = await collection.insertOne({ firstName: user.firstName, lastName: user.lastName, email: user.email, password: hashedPass, role: 'user' });
      return new Response(null, { status: 201 });
    } else {
      return new Response(null, { status: 400 });
    }
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
