import { DB } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const res = await DB.collection('Users').insertOne({ name: 'Zolo', age: 20 });
    return Response.json(res);
  } catch (e) {
    return Response.json(e);
  }
}
