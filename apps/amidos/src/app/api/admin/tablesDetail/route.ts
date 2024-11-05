import { db } from '@/lib/db';

export async function GET(request: Request) {
  const test = request.body;
  const Get = await db.collection('tablesDetail').find({ test }).toArray();
  console.log('Get', Get);
  return Response.json(Get);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { tableId, coordinate } = body;
  await db.collection('tablesDetail').insertOne({
    _id: tableId,
    coordinate,
  });
  return new Response(null, { status: 204 });
}
