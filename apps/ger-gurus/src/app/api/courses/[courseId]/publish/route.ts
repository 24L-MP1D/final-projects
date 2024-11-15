import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
type Params = {
  courseId: string;
  chapterId: string;
};

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const { courseId } = params;

    const userId = request.headers.get('userId');
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const course = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // const hasPublishedChapters = course.chapters.some((chapter)=>chapter.isPublished);

    const publishedCourse = await db.collection('courses').updateOne({ _id: new ObjectId(courseId) }, { $set: { published: true } });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log('COURSE_PUBLISH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
