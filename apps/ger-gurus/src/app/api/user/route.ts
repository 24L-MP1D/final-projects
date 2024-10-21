import { db } from "../../lib/db";

export async function GET(request: Request) {
  const list = await db.collection('users').find({}).toArray();
  return Response.json(list)
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;
  await db.collection('users').insertOne({
    name,
    email,
  });
  return new Response(null, { status: 204 });
}

