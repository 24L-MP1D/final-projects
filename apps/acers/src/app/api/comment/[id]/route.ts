import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { DB } from '../../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '';

function decodeToken(authtoken: string): { userId: string } {
  if (!authtoken) throw new Error('No token provided');

  try {
    return jwt.verify(authtoken, JWT_SECRET) as { userId: string };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token: ' + error.message);
    }
    throw new Error('Token verification failed');
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const url = new URL(request.url);
  const recipeId = url.searchParams.get('recipeId');

  try {
    const query: any = {};
    if (recipeId) query.recipeId = recipeId;

    const comments = await DB.collection('comments').find(query).toArray();

    if (comments.length > 0) {
      const recipeIds = comments.map((comment: any) => comment.recipeId);

      // const recipes = await DB.collection('recipes')
      //   .find({ _id: { $in: recipeIds } })
      //   .toArray();

      const populatedComments = comments.map((comment: any) => {
        //const recipe = recipes.find((recipe: any) => recipe._id.toString() === comment.recipeId.toString());
        return {
          ...comment,
          // recipe,
        };
      });

      return new Response(JSON.stringify(populatedComments), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('No comments found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const token = req.headers.get('authtoken');
  const body = await req.json();
  const { recipeId, comment } = body;

  if (!token || !recipeId || !comment) {
    return new Response('Missing required fields', { status: 400 });
  }

  if (!ObjectId.isValid(recipeId)) {
    return new Response('Invalid recipeId format', { status: 400 });
  }

  try {
    const { userId } = decodeToken(token);
    const newComment = {
      recipeId: new ObjectId(recipeId),
      userId,
      comment,
      createdAt: new Date(),
    };

    await DB.collection('comments').insertOne(newComment);
    return new Response(JSON.stringify({ val: 'success' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ val: 'failed' }), { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { recipeId: string } }) {
  const token = request.headers.get('authtoken');
  const body = await request.json();
  const { comment, rating } = body;

  if (!token) {
    return new Response('Authentication token is required', { status: 401 });
  }

  try {
    const { userId } = decodeToken(token);

    if (typeof comment !== 'string' || typeof rating !== 'number') {
      return new Response('Invalid input data', { status: 400 });
    }

    const updateData = {
      comment,
      rating,
      updatedAt: new Date(),
    };

    const result = await DB.collection('comments').updateOne({ recipeId: new ObjectId(params.recipeId), userId }, { $set: updateData });

    if (result.matchedCount === 0) {
      return new Response('No comment found to update', { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error updating comment:', error);
    return new Response('Internal server error', { status: 500 });
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
    const { userId } = decodeToken(token);

    const result = await DB.collection('comments').deleteOne({
      recipeId: new ObjectId(recipeId),
      userId,
    });

    if (result.deletedCount === 0) {
      return new Response('No comment found to delete', { status: 404 });
    }

    return new Response(JSON.stringify({ val: 'success' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new Response(JSON.stringify({ val: 'failed' }), { status: 500 });
  }
}
