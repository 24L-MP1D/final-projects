import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';

const collection = DB.collection('notifications');
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await collection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          isSeen: true,
        },
      }
    );

    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
