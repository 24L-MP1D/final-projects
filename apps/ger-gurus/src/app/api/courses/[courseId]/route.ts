import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

type Params = Promise<{ courseId: string }>;
export async function GET(request: Request, { params }: { params: Params }) {
  const { courseId } = await params;
  const oneCourse = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });
  if (!oneCourse) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneCourse);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { courseId } = await params;
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
  const { courseId } = await params;
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
  try {
    const { courseId } = await params;
    const userId = request.headers.get('userId');
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }
    const course = await db.collection('courses').findOne({ _id: new ObjectId(courseId), ownerId: userId });
    if (!course) {
      return new NextResponse('Not found', { status: 404 });
    }
    const deletedCourse = await db.collection('courses').deleteOne({ _id: new ObjectId(courseId) });
    await db.collection('chapters').deleteMany({ courseId: courseId });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log('[COURSE_ID_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
