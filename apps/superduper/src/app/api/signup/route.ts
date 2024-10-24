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

    return Response.json(response, { status: 200 });
  } catch (err) {
    return console.error('Sign up error', { status: 404 });
  }
}
