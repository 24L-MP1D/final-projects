import bcrypt from 'bcrypt';
import { DB } from '../../../lib/db';
import { auth, generateSalt } from '../../auth/route';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authResult = await auth(request, params.id);

  if (authResult.status !== 200) {
    return new Response(authResult.message, { status: authResult.status });
  }
  try {
    const userId = authResult.userId;
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
    return new Response('Invalid token', { status: 403 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authResult = await auth(request, params.id);

  if (authResult.status !== 200) {
    return new Response(authResult.message, { status: authResult.status });
  }
  try {
    const userId = authResult.userId;
    await DB.collection('users').deleteOne({ _id: userId });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Invalid token', { status: 403 });
  }
}
