import { Realtime } from 'ably';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { DB } from '../../../../lib/db';

// Initialize Ably Realtime instance with API key
const ably = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_KEY || '' });

export async function PUT(request: Request, { params }: { params: { title: string } }) {
  const { title } = params;

  try {
    const { commentId, userId, comment } = await request.json();

    if (!commentId || !userId || !comment) {
      return new Response('Missing required fields (commentId, userId, comment)', { status: 400 });
    }

    const existingComment = await DB.collection('comments').findOne({
      _id: new ObjectId(commentId),
      userId,
      recipeTitle: title,
    });

    if (!existingComment) {
      return new Response('Comment not found or you are not authorized to update this comment', { status: 404 });
    }

    const updatedComment = { comment, updatedAt: new Date() };

    await DB.collection('comments').updateOne({ _id: new ObjectId(commentId) }, { $set: updatedComment });

    const channel = ably.channels.get(`recipe-${title}-comments`);
    channel.publish('update-comment', { commentId, updatedComment });

    return new Response(JSON.stringify({ success: true, message: 'Comment updated successfully', updatedComment }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { title: string } }) {
  const { title } = params;

  try {
    const { commentId, userId } = await request.json();

    if (!ObjectId.isValid(commentId)) {
      return new Response('Invalid commentId format', { status: 400 });
    }

    const existingComment = await DB.collection('comments').findOne({
      _id: new ObjectId(commentId),
      userId,
      recipeTitle: title,
    });

    if (!existingComment) {
      return new Response('Comment not found or you are not authorized to delete this comment', { status: 404 });
    }

    const result = await DB.collection('comments').deleteOne({ _id: new ObjectId(commentId) });

    if (result.deletedCount === 1) {
      const channel = ably.channels.get(`recipe-${title}-comments`);
      channel.publish('delete-comment', { commentId });

      return new Response(JSON.stringify({ success: true, message: 'Comment deleted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Failed to delete comment', { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const title = slug;
  try {
    const body = await request.json();

    const { comment, firstName, recipeTitle } = body; // Change _id to recipeId

    const token = request.headers.get('authtoken');

    if (!token) {
      throw new Error('idk who ya are');
    }

    const { userId } = verify(token, process.env.JWT_SECRET || '') as { userId: string };

    if (!comment || !userId || !recipeTitle) {
      return new Response('Missing required fields (comment, userId, recipeId)', { status: 400 });
    }

    const res = await DB.collection('recipes').findOne({ title });
    const recipeId = res?._id;

    const newComment = {
      recipeId,
      userId,
      firstName: firstName || 'Anonymous',
      comment,
      createdAt: new Date(),
    };

    const result = await DB.collection('comments').insertOne(newComment);

    return new Response(JSON.stringify({ success: true, comment }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error posting comment:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
