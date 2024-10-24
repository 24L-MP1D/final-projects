import { db } from "@/lib/db";


export async function GET(request: Request) {
  const movies = await db.collection('categories').find({}).sort({ metacritic: -1 }).limit(1).toArray();
  return Response.json(movies);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description } = body;
  await db.collection('categories').insertOne({
    name,
    description,
  });
  return new Response(null, { status: 204 });
}
