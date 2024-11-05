import { DB } from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const users = await DB.collection('users').find().toArray();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
