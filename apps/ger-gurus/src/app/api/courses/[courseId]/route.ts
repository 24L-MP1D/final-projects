import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

type Params = Promise<{ courseId: string }>
export async function GET(request: Request, { params }: { params: Params }) {
  const {courseId}= await params
  const oneCourse = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });
  if (!oneCourse) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneCourse);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const {courseId}= await params
  const body = await request.json();

  await db.collection('courses').updateOne(
    {
      _id: new ObjectId(courseId),
    },
    {
      $set: body,
    }
  );
  return new Response(null, { status: 204 });
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const {courseId}= await params
  const values = await request.json();

  await db.collection('courses').updateOne(
    {
      _id: new ObjectId(courseId),
    },
    {
      $set: values,
    }
  );
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const {courseId}= await params
  await db.collection('courses').deleteOne({ _id: new ObjectId(courseId) });
  return new Response(null, { status: 204 });
}
