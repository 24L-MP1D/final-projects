import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const userId = request.headers.get('userId');
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  const schools = await db.collection('schools').find({ ownerId: userId }).toArray();
  if (!schools) {
    return new Response('Not Found', { status: 404 });
  }
  console.log(schools);
  return Response.json(schools);
}

export async function POST(request: Request) {
  const body = await request.json();
  const userId = request.headers.get('userId');
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

  const { domain } = body;
  await db.collection('schools').insertOne({
    domain,
    ownerId: userId,
    ownerName: user?.name,
  });
  return new Response(null, { status: 204 });
}
