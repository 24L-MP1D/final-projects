import { DB } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const collection = DB.collection('categories');
    const response = await collection.find({}).toArray();
    return Response.json(response);
  } catch (err) {
    return console.error('Error on get request for leaderboard from categories db', err);
  }
}