import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const host = new URL(request.url).hostname ;
//  const hostname = host === 'localhost' ? process.env.NAME : host;
//   console.log(hostname)
//   const school = await db.collection('schools').findOne({domain: hostname});
//   return  new Response(JSON.stringify(school), {status: 200})
// }

export async function GET(request: Request) {
  // const schoolId = getSchoolId(request);

  const courses = await db.collection('courses').find().limit(20).toArray();
  return Response.json(courses);
}
//{schoolId: schoolId} filter deer bichih

export async function POST(request: Request) {
  try {
    const { currentSchool } = await request.json();
    console.log(currentSchool);
    const userId = request.headers.get('userId');
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (currentSchool) {
      const courses = await db.collection('courses').find({ schoolId: currentSchool._id, ownerId: userId });
      return NextResponse.json(courses);
    }

    const { title, schoolId } = await request.json();
    const course = await db.collection('courses').insertOne({
      schoolId,
      title,
      ownerId: userId,
      createdAt: Date(),
    });
    const insertedCourse = { _id: course.insertedId, title, schoolId };
    return NextResponse.json(insertedCourse);
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
