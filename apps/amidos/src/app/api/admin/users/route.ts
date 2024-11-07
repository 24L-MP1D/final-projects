import { db } from '@/lib/db';
import 'dotenv/config';
import { ObjectId } from 'mongodb';
export async function GET(request: Request) {
  try {
    const allUsers = await db.collection('user').find({}).toArray();
    if (!allUsers) {
      return new Response('Any user found', { status: 404 });
    }
    return Response.json(allUsers);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id } = body;

  try {
    const allUsers = await db.collection('user').updateOne({ _id: new ObjectId(id) }, { $set: { role: 'admin' } });
    return new Response('Successfully became admin', { status: 200 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}
