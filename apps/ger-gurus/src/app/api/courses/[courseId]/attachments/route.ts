import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Params = Promise<{ courseId: string }>

export async function POST(
    req: Request, {params}:{params: Params}
){
    try {
        const {courseId}= await params
        // const {userId}=auth()
        const {url}=await req.json();
        // if (!userId){
        //     return new NextResponse("Unauthorized", {status: 401})
        // }
        // const courseOwner=await db.collection("courses").findOne({
        //     _id : new ObjectId(params.courseId)
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