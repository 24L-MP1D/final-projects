import { db } from '@/lib/db';

export async function GET(request: Request) {
  const dishes = await db.collection('admin').find({}).toArray();
  return Response.json(dishes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, ingredients, price, photos, id } = body;
  await db.collection('admin').insertOne({
    name,
    description,
    ingredients,
    price,
    photos,
    id,
  });
  return new Response(null, { status: 204 });
}
