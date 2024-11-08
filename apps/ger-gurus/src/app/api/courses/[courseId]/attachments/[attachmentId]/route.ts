import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
type Params = Promise<{ courseId: string , attachmentId: string}>
export async function DELETE(request: Request, {params}: {params: Params}){
    try {
        const {courseId, attachmentId}= await params
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
            courseId: new ObjectId(courseId),
            _id: new ObjectId(attachmentId)
        })

        return NextResponse.json(attachment)

    } catch (error) {
        console.log("ID_ATTACHMENT", error)
        return new NextResponse("Internal Error", {status: 500})
        
    }

}