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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const collection = DB.collection('product');
    await collection.deleteOne({ _id: new ObjectId(id) });
    return Response.json({ message: 'successfully deleted' });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
