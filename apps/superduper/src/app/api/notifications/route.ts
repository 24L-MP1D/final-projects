import { DB } from '@/lib/db';

const collection = DB.collection('notifications');

export async function PUT(request: Request) {
  const { userId } = await request.json();

  try {
    const result = await collection.find({ userId }, { sort: { createdAt: -1 } }).toArray();
    return Response.json(result);
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
