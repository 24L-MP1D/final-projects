import { DB } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const collection = DB.collection('products');
    const products = await collection.find({}).toArray();
    return Response.json(products);
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
