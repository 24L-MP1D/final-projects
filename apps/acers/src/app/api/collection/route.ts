import { DB } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, collection } = body;

    const res = await DB.collection('collections').insertOne({ name, collection });
    return Response.json(res);
  } catch (e) {
    console.error(e);
    Response.json({ eror: e });
  }
}

export async function GET() {
  try {
    const res = await DB.collection('collections').find().toArray();
    return new Response(JSON.stringify({ success: true, res }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e || 'An error occurred' }), { status: 500 });
  }
}
