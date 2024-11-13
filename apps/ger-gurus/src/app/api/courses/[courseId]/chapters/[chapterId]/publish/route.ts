import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
type Params = Promise<{ courseId: string; chapterId: string }>;
export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const { chapterId, courseId } = await params;
    // const userId = request.headers.get('userId');
    // if (!userId) {
    //   return new Response('Unauthorized', { status: 401 });
    // }
    // const ownCourse = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });
    // userId: userId;

    // if (!ownCourse) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    const chapter = await db.collection('chapters').findOne({
      _id: new ObjectId(chapterId),
      courseId: new ObjectId(courseId),
    });

    const muxData = db.collection('muxData').findOne({ chapterId: chapterId });

    if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const publishedChapter = await db.collection('chapters').updateOne(
      {
        _id: new ObjectId(chapterId),
      },
      {
        $set: { isPublished: true },
      }
    );
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log('CHAPTER_PUBLISH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
