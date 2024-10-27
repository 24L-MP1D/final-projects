import { db } from '@/lib/db';
import { algoliasearch } from 'algoliasearch';
export async function GET(request: Request) {
  const dishes = await db.collection('admin').find({}).toArray();
  return Response.json(dishes);
}

export async function POST(request: Request) {
  try {
    const client = algoliasearch('MLKXEEH303', '8afc4b223bd36c4137f45360abf5dfb0');
    const body = await request.json();
    const { name, description, ingredients, price, photos } = body;
    await db.collection('admin').insertOne({
      name,
      description,
      ingredients,
      price,
      photos,
    });
    await client.saveObject({ indexName: 'amidos', body: { name: name, description: description, ingredients: ingredients, price: price, photos: photos } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}
