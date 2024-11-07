import { DB } from '../../../lib/db';
export async function GET(request: Request) {
  try {
    const recipes = await DB.collection('recipes').find().toArray();
    console.log('Fetched recipes:', recipes); // Debugging line
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
