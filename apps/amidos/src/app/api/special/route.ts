import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const specialDish = await db.collection('specialFood').findOne({ _id: new ObjectId(params.id) });
  if (!specialDish) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(specialDish);
}
export async function POST(request: Request) {
  const body = await request.json();
  const { special, id } = body;
  await db.collection('specialFood').updateOne({ _id: new Object(id) }, { $set: { special } });
  return new Response(null, { status: 204 });
}
