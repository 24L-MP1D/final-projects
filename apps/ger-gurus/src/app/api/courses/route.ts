import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// export async function getSchoolId(request: Request) {
//   const host = new URL(request.url).hostname ;
//   const school =await db.collection('schools').findOne({domain: host});
//   return school?._id
// }

// export async function GET(request: Request) {
//   const schoolId = getSchoolId(request);

//   const courses = await db.collection('courses').find({schoolId: schoolId}).limit(20).toArray();
//   return Response.json(courses);
// }

export async function POST(request: Request) {
  // const schoolId = getSchoolId(request);


  // const body = await request.json();
  // const { title, author, description, thumbnail } = body;
  try {
    // const {userId}=auth() //clerk?
    const {title}= await request.json()
    // if (!userId){return new NextResponse("Unauthorized", {status: 401})}
    const course = await db.collection('courses').insertOne({
      // userId,
      title
    });
    const insertedCourse={_id: course.insertedId,title} //, schoolId
    return NextResponse.json(insertedCourse);
    
  } catch (error) {
    console.log("[COURSES]", error)
    return new NextResponse("Internal error", {status: 500}) 
  }
}
