import { db } from "@/lib/db";


export async function GET(request: Request) {
  const schools = await db.collection('schools').find({}).sort({ metacritic: -1 }).limit(20).toArray();
  return Response.json(schools);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { domain, description } = body;
  await db.collection('schools').insertOne({
    domain,
    description,
  });
  return new Response(null, { status: 204 });
}
