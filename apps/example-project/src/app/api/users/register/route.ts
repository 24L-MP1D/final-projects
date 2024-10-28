import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  await db.collection('users').insertOne({
    email,
    password,
  });
  return new Response(null, { status: 204 });
}
