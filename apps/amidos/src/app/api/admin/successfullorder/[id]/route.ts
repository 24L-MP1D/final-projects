import { db } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const oneOrder = await db.collection('successfullorder').findOne({ id: params.id });
  if (!oneOrder) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneOrder);
}
