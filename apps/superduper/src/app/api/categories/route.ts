import { DB } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const collection = DB.collection('categories');
    const result = await collection.find().toArray();
    return Response.json(result);
  } catch (err) {
    console.error(err);
  }
}

export async function POST(request: Request) {
  try {
    const collection = DB.collection('products');
  } catch (err) {
    console.error(err);
  }
}
