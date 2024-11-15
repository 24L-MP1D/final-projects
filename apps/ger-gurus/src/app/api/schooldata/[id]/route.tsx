import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const data = await db.collection('schooldata').findOne({ _id: new ObjectId(id) });
  if (!data) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(data);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await request.json();

  await db.collection('schooldata').updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: body,
    }
  );
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  await db.collection('users').deleteOne({ _id: new ObjectId(id) });
  return new Response(null, { status: 204 });
}
