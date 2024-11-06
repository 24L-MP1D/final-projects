import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const oneCourse = await db.collection('courses').findOne({ _id: new ObjectId(params.id) });
  if (!oneCourse) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneCourse);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  await db.collection('courses').updateOne(
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
  await db.collection('courses').deleteOne({ _id: new ObjectId(params.id) });
  return new Response(null, { status: 204 });
}
