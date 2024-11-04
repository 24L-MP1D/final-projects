import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';
const collection = DB.collection('product');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const _id = params.id;
  try {
    const data = await collection.findOne({ _id: new ObjectId(_id) });
    return Response.json(data);
  } catch (err) {
    return Response.json({ message: err });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    return Response.json({ message: 'successfully deleted' });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json();
  try {
    const data = await collection.updateOne({ _id: new ObjectId(params.id) }, { $set: { status: status } });

    return Response.json({ message: 'Succesfully updated' });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
