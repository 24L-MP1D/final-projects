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

    const unpublishedChapter = await db.collection('chapters').updateOne(
      {
        _id: new ObjectId(chapterId),
      },
      {
        $set: { isPublished: false },
      }
    );

    const publishedChaptersInCourse = await db
      .collection('chapters')
      .find({
        courseId: new ObjectId(courseId),
        isPublished: true,
      })
      .toArray();

    if (!publishedChaptersInCourse.length) {
      {
        await db.collection('course').updateOne(
          {
            _id: new ObjectId(courseId),
          },
          {
            $set: { isPublished: false },
          }
        );
      }
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log('CHAPTER_PUBLISH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
