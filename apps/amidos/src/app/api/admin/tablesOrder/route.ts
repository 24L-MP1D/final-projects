import { db } from '@/lib/db';

export async function GET(request: Request) {
  const test = request.body;
  const Get = await db.collection('table').find({ test }).toArray();
  console.log('Get', Get);
  return Response.json(Get);
}

export async function DELETE(request: Request) {
  return new Response('Hello, from API DELETE!');
}

export async function PUT(request: Request) {
  return new Response('Hello, from API PUT!');
}
