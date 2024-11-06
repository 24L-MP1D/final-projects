import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DB } from '../../../lib/db';
import { auth, generateSalt } from '../../auth/route';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authResult = await auth(request, params.id);

  if (authResult.status !== 200) {
    return new Response(authResult.message, { status: authResult.status });
  }

  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response('Token is missing', { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    if (userId !== params.id) {
      return new Response('Forbidden', { status: 403 });
    }

    const body = await request.json();
    const { firstName, lastName, phoneNumber, role, password } = body;

    const updateData: any = {
      firstName,
      lastName,
      phoneNumber,
      role,
      updatedAt: new Date(),
    };

    if (password) {
      const salt = generateSalt(Number(process.env.saltNumber));
      updateData.password = await bcrypt.hash(password, salt);
    }

    await DB.collection('users').updateOne({ _id: userId }, { $set: updateData });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response('Invalid token or error processing request', { status: 403 });
  }
}
