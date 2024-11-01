import bcrypt from 'bcrypt';
import { DB } from '../../lib/db';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phoneNumber, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return new Response('Missing fields', { status: 400 });
    }

    const salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
    const hashedPassword = await bcrypt.hash(password, salt);

    await DB.collection('users').insertOne({
      firstName,
      lastName,
      email,
      phoneNumber,
      role: 'Free',
      password: hashedPassword,
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return new Response(null, { status: 201 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}
