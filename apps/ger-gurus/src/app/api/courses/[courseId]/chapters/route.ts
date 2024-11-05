import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Params = Promise<{ courseId: string }>

export async function GET(request: Request, { params }: { params: Params }) {
  const {courseId}=await params
  const chapters = await db.collection('chapters').find({courseId: new ObjectId(courseId)}).sort({ position: 1 }).limit(20).toArray();
  return NextResponse.json(chapters);
}

export async function POST(request: Request, { params }: { params: Params }) {
  try {
        const {courseId}=await params
        // const {userId}=auth()
        const {title}= await request.json();
        // if (!userId){
        //   return new NextResponse("Unauthorized", {status:401})
        // }
        // const courseOwner= await db.collection("course").findOne({_id: new ObjectId(params.courseId)})
        // if (!courseOwner){
        //   return new NextResponse("Unauthorized", {status: 401})
        // }
        const lastChapter = await db.collection("chapters")
        .find({ courseId: new ObjectId(courseId) })
        .sort({ position: -1 })
        .limit(1)
        .toArray();
    
        const newPosition= lastChapter[0] ? lastChapter[0].position+1 : 0
        const chapter = await db.collection('chapters').insertOne({title, courseId: new ObjectId(courseId), position : newPosition});
        return NextResponse.json(chapter , {status:200})
    
  } catch (error) {
    console.log("[CHAPTERS]", error)
    return new NextResponse("Internal error", {status: 500})
    
  }
}
