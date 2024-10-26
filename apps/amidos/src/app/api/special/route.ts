import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const body = await request.json();
  const { id, isSpecial } = body;

  await db.collection('admin').updateOne(
    { _id: new ObjectId(id) },
    { $set: { isSpecial } } // Update the isSpecial field in the database
  );

  return new Response(null, { status: 204 });
}
