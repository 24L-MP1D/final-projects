import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
type Params = Promise<{ courseId: string; chapterId: string }>;
export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const { courseId } = await params;

    const userId = request.headers.get('userId');
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const course = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const unpublishedCourse = await db.collection('courses').updateOne({ _id: new ObjectId(courseId) }, { $set: { published: false } });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log('COURSE_UNPUBLISH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
