import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
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

export async function PUT(request: Request, { params }: { params: any }) {
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

export async function GET(request: Request, { params }: { params: any }) {
  const recipeId = params.id;

  if (!recipeId) {
    return new NextResponse('Recipe ID is required', { status: 400 });
  }

  try {
    // Fetch comments based on the recipeId
    const comments = await DB.collection('comments')
      .find({ recipeId: new ObjectId(recipeId) })
      .toArray();

    // Return comments in the response
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const token = req.headers.get('authtoken');
  const body = await req.json();
  const { recipeId, comment, rating = 0 } = body;

  console.log('Received recipeId:', recipeId);

  if (!token || !recipeId || !comment) {
    return new Response('Missing required fields or invalid data', { status: 400 });
  }

  try {
    if (!ObjectId.isValid(recipeId)) {
      return new Response('Invalid recipeId format', { status: 400 });
    }

    const { userId } = decodeToken(token as string);

    const newComment = {
      recipeId: new ObjectId(recipeId),
      userId,
      comment,
      rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await DB.collection('comments').insertOne(newComment);
    return new Response(JSON.stringify({ val: 'success' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ val: 'failed' }), { status: 500 });
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
