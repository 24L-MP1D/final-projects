import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { courseId: string; chapterId: string} }) {
  const {courseId, chapterId}= await params
  const oneChapter = await db.collection('courses').findOne({ _id: new ObjectId(chapterId), 
    courseId: new ObjectId(courseId)
   });
  if (!oneChapter) {
    return  NextResponse.json({message: 'Not Found'}, { status: 404 });
  }
  return NextResponse.json(oneChapter);
}

export async function PUT(request: Request, { params }: { params: { courseId: string } }) {
  const {courseId}=params
  const body = await request.json();

  await db.collection('courses').updateOne(
    {
      _id: new ObjectId(courseId),
    },
    {
      $set: body,
    }
  );
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request: Request, { params }: { params: { courseId: string , chapterId: string} }) {
  const {courseId, chapterId}=params
  try {
      // const userId=auth()
      // if (!userId){ 
      //     return new NextResponse("Unauthorized", {status:401})
      // }
      const ownCourse= await db.collection("courses").findOne({_id: new ObjectId(courseId)})//userId=userId gej shalgah
      if (!ownCourse){
          return new NextResponse("Unauthorized", {status:401})
      }
      const {isPublished, ...values} = await request.json();

     await db.collection('chapters').updateOne(
      {
        _id: new ObjectId(chapterId) ,
        courseId: new ObjectId(courseId)
        // userId: userId
      },
      {
          $set: values
      }
    )
    
      return new NextResponse(null, { status: 204 });
      
  } catch (error: any) {
      console.log("[REORDER]", error.message)
      return new NextResponse("Internal error", {status: 500})     
  } }
