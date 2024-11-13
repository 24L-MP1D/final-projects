import { DB } from '@/lib/db';

export async function GET(request: Request) {
  return new Response('Hello, from API!');
}

export async function POST(request: Request) {
  try {
    const { bid } = await request.json();
    const collection = DB.collection('bids');
    await collection.insertOne({ bid });
    return Response.json({ message: 'succesfully inserted' });
  } catch (err) {
    console.error(err);
  }
}
