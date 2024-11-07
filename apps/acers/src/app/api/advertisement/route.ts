import { ObjectId } from 'mongodb';
import { DB } from '../../lib/db';

export async function POST(request: Request, { params }: { params?: { id: string } }) {
  try {
    const body = await request.json();
    const { images, video, link } = body;
    const res = await DB.collection('advertisements').insertOne({
      images,
      video,
      link,
      createdAt: Date(),
      updatedAt: Date(),
    });
    return new Response(JSON.stringify({ res: 'Succeed' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: 'Invalid recipeId format' }), { status: 400 });
  }
  const ads = await DB.collection('advertisements').findOne({ _id: new ObjectId(id) });
  if (!ads) {
    return new Response(JSON.stringify({ message: 'Ads not found' }), { status: 404 });
  }
}
