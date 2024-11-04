import { DB } from '../../lib/db';

export async function GET() {
  try {
    const data = await DB.collection('tags').find().toArray();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Failed to fetch tags' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;
    const data = await DB.collection('tags').insertOne({ tagName: name });

    return new Response(JSON.stringify({ success: true, data }), { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: e || 'An error occurred' }), { status: 500 });
  }
}
