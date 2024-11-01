import { db } from '@/lib/db';

export async function GET(request: Request) {
  const list = await db.collection('admin').find({ special: true }).toArray();
  return Response.json(list);
}
