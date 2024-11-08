import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Params = Promise<{ courseId: string }>

export async function POST(
    request: Request, {params}:{params: Params}
){
    try {
        const {courseId}= await params
        const {url}=await request.json();
        // const userId = request.headers.get('userId');
        // if (!userId) {
        //   return new Response('Unauthorized', { status: 401 });
        // }
      
        // if (!userId){
        //     return new NextResponse("Unauthorized", {status: 401})
        // }
        // const courseOwner=await db.collection("courses").findOne({
        //     _id : new ObjectId(courseId),
        //     userId: userId
        // })
        // if (!courseOwner){
        //     return new NextResponse("Unauthorized", {status:401})
        // }
        const attachment= await db.collection("attachments").insertOne({
            url,
            name: url.split("/").pop(),
            courseId: new ObjectId(courseId),
            createdAt: new Date()
        })
        return NextResponse.json(attachment)
    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS", error)
        return new NextResponse("Internal Error", {status: 500})
        
    }
}