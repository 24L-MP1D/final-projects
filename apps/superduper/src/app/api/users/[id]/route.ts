import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';

const collection = DB.collection('users');
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { message } = await request.json();
    const id = params.id;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { message } });
    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
