import { DB } from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const user = await DB.collection('users').find().toArray();
    return Response.json(user);
  } catch (e) {
    console.error(e);
    return [];
  }
}
