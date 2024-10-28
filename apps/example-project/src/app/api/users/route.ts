import { db } from '@/lib/db';

export async function GET(request: Request) {
  const users = await db.collection('users').find({}).sort({ metacritic: -1 }).limit(1).toArray();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  await db.collection('users').insertOne({
    email,
    password,
  });
  return new Response(null, { status: 204 });
}
