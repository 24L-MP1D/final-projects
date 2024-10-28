import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const specialDish = await db.collection('special').findOne({ _id: new ObjectId(params.id) });
  if (!specialDish) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(specialDish);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  await db.collection('special').updateOne(
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
  await db.collection('special').deleteOne({ _id: new ObjectId(params.id) });
  return new Response(null, { status: 204 });
}
