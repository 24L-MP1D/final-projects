import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
export async function PUT(request: Request) {
  const body = await request.json();
  const { id } = body;
  console.log(id);

  try {
    const allUsers = await db.collection('user').updateOne({ _id: new ObjectId(id) }, { $set: { role: '' } });
    return new Response('Successfully became admin', { status: 200 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}
