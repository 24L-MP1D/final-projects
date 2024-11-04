import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';


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

export async function PATCH(request: Request, { params }: { params: { courseId: string , chapterId: string} }) {
  try {
      // const userId=auth()
      // if (!userId){ 
      //     return new NextResponse("Unauthorized", {status:401})
      // }
      const ownCourse= await db.collection("courses").findOne({_id: new ObjectId(params.courseId)})//userId=userId gej shalgah
      if (!ownCourse){
          return new NextResponse("Unauthorized", {status:401})
      }
      const {isPublished, ...values} = await request.json();

     await db.collection('chapters').updateOne(
      {
        _id: new ObjectId(params.chapterId) ,
        courseId: new ObjectId(params.courseId)
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
