import { ObjectId } from 'mongodb';
import { DB } from '../../lib/db';

export async function POST(request: Request) {
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
export async function GET(request: Request) {
  try {
    const body = await request.json;

    console.log('Received ID:', body);

    const ad = await DB.collection('advertisements').findOne({ _id: new ObjectId() });

    if (!ad) {
      return new Response(JSON.stringify({ message: 'Advertisement not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(ad), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('Error fetching advertisement:', e);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
