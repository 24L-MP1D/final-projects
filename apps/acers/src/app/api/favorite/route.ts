import jwt from 'jsonwebtoken';
import { DB } from '../../lib/db';

export const POST = async (req: Request) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';

  try {
    const body = await req.json();
    const { recipeId } = body;
    const token = req.headers.get('authtoken') || '';
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded as { userId: string };
    const res = await DB.collection('favorites').insertOne({ userId, recipeId });
    return new Response(JSON.stringify({ s: 'suxeed' }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e || 'An error occurred' }), { status: 500 });
  }
};

export async function GET(request: Request) {
  const JWT_SECRET = process.env.JWT_SECRET || '';

  try {
    const token = request.headers.get('authtoken');
    if (!token) {
      return new Response('Authentication token is required', { status: 401 });
    }
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded as { userId: string };
    const recipeList = await DB.collection('favorites').find({ userId }).toArray();
    if (!recipeList) {
      return new Response('No recipe found', { status: 404 });
    }
    return new Response(JSON.stringify(recipeList), { status: 200 });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return new Response('Invalid token', { status: 401 });
    }
    if (error instanceof Error) {
      return new Response('Internal server error: ' + error.message, { status: 500 });
    }
    return new Response('Unknown error', { status: 500 });
  }
}
