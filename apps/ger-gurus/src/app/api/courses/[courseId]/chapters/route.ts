import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  const chapters = await db.collection('chapters').find({courseId: new ObjectId(params.courseId)}).sort({ position: 1 }).limit(20).toArray();
  return NextResponse.json(chapters);
}

export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
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
        .find({ courseId: new ObjectId(params.courseId) })
        .sort({ position: -1 })
        .limit(1)
        .toArray();
    
        const newPosition= lastChapter[0] ? lastChapter[0].position+1 : 0
        const chapter = await db.collection('chapters').insertOne({title, courseId: new ObjectId(params.courseId), position : newPosition});
        return NextResponse.json(chapter , {status:200})
    
  } catch (error) {
    console.log("[CHAPTERS]", error)
    return new NextResponse("Internal error", {status: 500})
    
  }
}
