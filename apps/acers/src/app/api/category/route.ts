import { DB } from '../../lib/db';

export async function GET() {
  try {
    const data = await DB.collection('categories').find().toArray();
    return Response.json(data);
  } catch (e: any) {
    console.error(e);
    return Response.json({ error: e.message });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { categoryName } = body;
    console.log(categoryName);
    const res = await DB.collection('categories').insertOne({ categoryName });
    return Response.json(res);
  } catch (e) {
    console.error(e);
    return Response.json([]);
  }
}
