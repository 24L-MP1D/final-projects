import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const oneDish = await db.collection('addFood').findOne({ _id: new ObjectId(params.id) });
  if (!oneDish) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneDish);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  await db.collection('addFood').updateOne(
    {
      _id: new ObjectId(params.id),
    },
    {
      $set: body,
    }
  );
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await db.collection('addFood').deleteOne({ _id: new ObjectId(params.id) });
  return new Response(null, { status: 204 });
}
