import { DB } from '../../lib/db';

export async function GET(request: Request) {
  try {
    const collection = DB.collection('seller');
    const result = await collection.find({ name: 'badral' }).toArray();
    return Response.json(result);
  } catch (err) {
    console.error(err);
  }
}
