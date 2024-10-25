import { DB } from '@/lib/db';
import bcrypt from 'bcrypt';
export async function POST(request: Request) {
  try {
    const collection = DB.collection('users');
    const user = await request.json();
    console.log(user);

    const salt = 10;
    const hashedPass = bcrypt.hashSync(user.password, salt);

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
