import { db } from '@/lib/db';
import Mux from '@mux/mux-node';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

type Params = Promise<{ courseId: string; chapterId: string }>;

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { courseId, chapterId } = await params;
  const oneChapter = await db.collection('courses').findOne({ _id: new ObjectId(chapterId), courseId: new ObjectId(courseId) });
  if (!oneChapter) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json(oneChapter);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { chapterId, courseId } = await params;
  // const userId = request.headers.get('userId');
  // if (!userId) {
  //   return new Response('Unauthorized', { status: 401 });
  // }
  // const ownCourse = await db.collection('courses').findOne({ _id: new ObjectId(courseId) });
  // userId: userId

  // if (!ownCourse) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }

  const chapter = await db.collection('chapters').findOne({
    _id: new ObjectId(chapterId),
    courseId: new ObjectId(courseId),
  });

  if (!chapter) {
    return new NextResponse('Not Found', { status: 404 });
  }

  if (chapter.videoUrl) {
    const existingMuxData = await db.collection('muxData').findOne({ chapterId: chapterId });
    if (existingMuxData) {
      await mux.video.assets.delete(existingMuxData.assetId);
      await db.collection('muxData').deleteOne({ _id: existingMuxData._id });
    }
  }

  const deletedChapter = await db.collection('chapters').deleteOne({
    _id: new ObjectId(chapterId),
  });

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
  return new NextResponse(null, { status: 204 });
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { chapterId, courseId } = await params;
  const body = await request.json();

  await db.collection('courses').updateOne(
    {
      _id: new ObjectId(chapterId),
      courseId: new ObjectId(courseId),
    },
    {
      $set: body,
    }
  );
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const { courseId, chapterId } = await params;
  try {
    // const userId=auth()
    // if (!userId){
    //     return new NextResponse("Unauthorized", {status:401})
    // }
    const ownCourse = await db.collection('courses').findOne({ _id: new ObjectId(courseId) }); //userId=userId gej shalgah
    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { isPublished, ...values } = await request.json();

    await db.collection('chapters').updateOne(
      {
        _id: new ObjectId(chapterId),
        courseId: new ObjectId(courseId),
        // userId: userId
      },
      {
        $set: values,
      }
    );

    if (values.videoUrl) {
      const existingMuxData = await db.collection('muxData').findOne({ chapterId: chapterId });
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.collection('muxData').deleteOne({ _id: existingMuxData._id });
      }
      const asset = await mux.video.assets.create({
        input: values.videoUrl,
        playback_policy: ['public'],
        test: false,
      });
      console.log(asset);

      await db.collection('muxData').insertOne({
        chapterId,
        assetId: asset.id,
        playbackId: asset.playback_ids?.[0]?.id,
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.log('[CHAPTER UPDATE]', error.message);
    return new NextResponse('Internal error', { status: 500 });
  }
}
