import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  const chapters = await db.collection('chapters').find({}).sort({ metacritic: -1 }).limit(10).toArray();
  return Response.json(chapters);
}

export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
        // const {userId}=auth()
        const {title}= await request.json();
        // if (!userId){
        //   return new NextResponse("Unauthorized", {status:401})
        // }
        const courseOwner= await db.collection("course").findOne({_id: params.courseId})
        if (!courseOwner){
          return new NextResponse("Unauthorized", {status: 401})
        }
        await db.collection('chapters').insertOne({title});
        return new Response(null, { status: 204 });
    
  } catch (error) {
    console.log("[CHAPTERS]", error)
    return new NextResponse("Internal error", {status: 500})
    
  }
 

}
