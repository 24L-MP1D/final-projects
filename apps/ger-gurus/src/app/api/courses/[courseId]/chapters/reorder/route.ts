import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
interface ChapterItem {
    _id: string;
    position: number;
}

export async function PUT(request: Request, { params }: { params: { courseId: string } }) {
    try {
        // const userId=auth()
        // if (!userId){ 
        //     return new NextResponse("Unauthorized", {status:401})
        // }
        const ownCourse= await db.collection("courses").findOne({_id: new ObjectId(params.courseId)})//userId=userId gej shalgah
        if (!ownCourse){
            return new NextResponse("Unauthorized", {status:401})
        }
        const {list} = await request.json();

       for (let item of list){await db.collection('chapters').updateOne(
        {
          _id: new ObjectId(String(item.id)) ,
          // userId: userId
        },
        {
            $set: { position: item.position }
        }
      )} 
      
        return new NextResponse(null, { status: 204 });
        
    } catch (error: any) {
        console.log("[REORDER]", error.message)
        return new NextResponse("Internal error", {status: 500})     
    } }
