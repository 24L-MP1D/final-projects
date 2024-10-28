import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { _id, name, photos, price } = body;
  await db.collection('special').insertOne({
    _id,
    name,
    price,
    photos,
  });

  return new Response(null, { status: 204 });
}
export async function GET(request: Request) {
  const isSpecial = await db.collection('special').find({}).toArray();
  return Response.json(isSpecial);
}
