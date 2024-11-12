import { db } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log(params.id);
  const oneDish = await db.collection('admin').findOne({ id: params.id });
  console.log(oneDish);
  if (!oneDish) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneDish);
}
