import { db } from "../../lib/db";


export async function GET(request: Request) {
  const courses = await db.collection('courses').find({}).sort({ metacritic: -1 }).limit(10).toArray();
  return Response.json(courses);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { title, author, description } = body;
  await db.collection('courses').insertOne({
    title,
    author,

    description,
  });
  return new Response(null, { status: 204 });
}
