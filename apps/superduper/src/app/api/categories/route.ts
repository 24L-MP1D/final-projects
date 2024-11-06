import { DB } from '@/lib/db';

const collection = DB.collection('categories');

export async function POST(request: Request) {
  try {
    const category = await request.json();
    console.log(category)
    const result = await collection.insertOne({ category });
    return new Response(null, { status: 201 })
  } catch (err) {
    return new Response(null, { status: 404 })
  }
}
