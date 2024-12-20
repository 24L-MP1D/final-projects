import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { DB } from '../../lib/db';
import { hideData } from '../recipe/handyFunctions';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { recipeId } = body;
    const token = req.headers.get('authtoken') || '';
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded as { userId: string };
    const isExist = await DB.collection('favorites').findOne({ recipeId, userId });
    if (isExist) {
      const result = await DB.collection('favorites').deleteOne({ recipeId, userId });
      return new Response(JSON.stringify({ s: 'succeed' }), { status: 200 });
    }
    const res = await DB.collection('favorites').insertOne({ userId, recipeId });
    return new Response(JSON.stringify({ s: 'succeed' }), { status: 200 });
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
    const recipeIdlist = await DB.collection('favorites').find({ userId }).toArray();

    const recipeIds = recipeIdlist.map((favorite) => new ObjectId(favorite.recipeId));

    const recipeListFull = await DB.collection('recipes')
      .find({ _id: { $in: recipeIds } })
      .toArray();
    const recipeList = hideData(recipeListFull);
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

export async function DELETE(req: Request) {
  const token = req.headers.get('authtoken');
  const body = await req.json();
  const { recipeId } = body;

  if (!token || !recipeId) {
    return new Response('Missing required fields', { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded as { userId: string };
    const result = await DB.collection('favorites').deleteOne({ recipeId, userId });

    return new Response(JSON.stringify({ val: 'success' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ val: 'failed' }), { status: 500 });
  }
}
