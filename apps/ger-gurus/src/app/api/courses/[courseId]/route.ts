import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';


export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  const oneCourse = await db.collection('courses').findOne({ _id: new ObjectId(params.courseId) });
  if (!oneCourse) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneCourse);
}

export async function PUT(request: Request, { params }: { params: { courseId: string } }) {
  const body = await request.json();

  await db.collection('courses').updateOne(
    {
      _id: new ObjectId(params.courseId),
    },
    {
      $set: body,
    }
  );
  return new Response(null, { status: 204 });
}

export async function PATCH(request: Request, { params }: { params: { courseId: string } }) {
  const values = await request.json();

  await db.collection('courses').updateOne(
    {
      _id: new ObjectId(params.courseId),
    },
    {
      $set: values,
    }
  );
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, { params }: { params: { courseId: string } }) {
  await db.collection('courses').deleteOne({ _id: new ObjectId(params.courseId) });
  return new Response(null, { status: 204 });
}
