import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const courses = await db.collection('courses').find({}).sort({ metacritic: -1 }).limit(20).toArray();
  return Response.json(courses);
}

export async function POST(request: Request) {
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
    const insertedCourse={_id: course.insertedId,title}
    return NextResponse.json(insertedCourse);
    
  } catch (error) {
    console.log("[COURSES]", error)
    return new NextResponse("Internal error", {status: 500}) 
  }
}
