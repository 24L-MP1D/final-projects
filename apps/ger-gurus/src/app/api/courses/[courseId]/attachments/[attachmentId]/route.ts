import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request, 
    {params}:{params: {courseId: string, attachmentId: string}}
){
    try {
        const userId = request.headers.get('userId');
        if (!userId) {
          return new Response('Unauthorized', { status: 401 });
        }
        // const courseOwner=await db.collection("courses").findOne({
        //     _id : new ObjectId(params.courseId),
        //     userId: userId
        // })
        // if (!courseOwner){
        //     return new NextResponse("Unauthorized", {status:401})
        // }
        const attachment= await db.collection("attachments").deleteOne({
            courseId: new ObjectId(params.courseId),
            _id: new ObjectId(params.attachmentId)
        })

        return NextResponse.json(attachment)

    } catch (error) {
        console.log("ID_ATTACHMENT", error)
        return new NextResponse("Internal Error", {status: 500})
        
    }

}