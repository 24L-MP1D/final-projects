import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const oneMovie = await db.collection('tablesDetail').findOne({ _id: new ObjectId(params.id) });
  if (!oneMovie) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneMovie);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  await db.collection('tablesDetail').updateOne(
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
  await db.collection('tablesDetail').deleteOne({ _id: new ObjectId(params.id) });
  return new Response(null, { status: 204 });
}
