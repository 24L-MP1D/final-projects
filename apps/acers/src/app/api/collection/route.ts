import { DB } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const { name, collection } = body;

    const res = await DB.collection('collections').insertOne({ name, collection });
    return Response.json(res);
  } catch (e) {
    console.error(e);
    Response.json({ eror: e });
  }
}
