import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const _id = params.id;

  try {
    const collection = DB.collection('product');
    const data = await collection.findOne({ _id: new ObjectId(_id) });
    return Response.json(data);
  } catch (err) {
    return Response.json({ message: err });
  }
}
