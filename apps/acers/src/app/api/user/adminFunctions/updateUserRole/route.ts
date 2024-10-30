import { ObjectId } from 'mongodb';
import { DB } from '../../../../lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, newRole } = body;

  try {
    if (!ObjectId.isValid(userId)) {
      return new Response('Invalid user ID', { status: 400 });
    }

    const result = await DB.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { role: newRole } });

    if (result.modifiedCount === 0) {
      return new Response('No user found or role is the same', { status: 404 });
    }

    return new Response('User role updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}
