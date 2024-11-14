import { Realtime } from 'ably';
import { ObjectId } from 'mongodb';
import { DB } from '../../../../lib/db';

// Initialize Ably Realtime instance with API key
const ably = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_KEY || '' });

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  // Ensure that slug is available in the request
  if (!slug) {
    console.error('Error: Missing slug parameter');
    return new Response('Missing slug parameter', { status: 400 });
  }

  try {
    // Parse incoming request body
    const body = await request.json();
    const { comment, userId, firstName, recipeId } = body;

    // Validate required fields in the request body
    if (!comment || !userId || !recipeId) {
      return new Response('Missing required fields (comment, userId, recipeId)', { status: 400 });
    }

    // Convert recipeId string to MongoDB ObjectId
    const recipeObjectId = new ObjectId(recipeId);
    
    // Find recipe by ID in the database
    const recipe = await DB.collection('recipes').findOne({ _id: recipeObjectId });
    if (!recipe) {
      return new Response('Recipe not found', { status: 404 });
    }

    // Prepare new comment object
    const newComment = {
      recipeId: recipeObjectId,
      userId,
      firstName: firstName || 'Anonymous',
      comment,
      createdAt: new Date(),
    };

    // Insert new comment into the database
    const result = await DB.collection('comments').insertOne(newComment);
    const responseComment = {
      ...newComment,
      _id: result.insertedId.toString(),
      recipeId: recipeObjectId.toString(),
    };

    // Publish the new comment to Ably for real-time updates
    const channel = ably.channels.get(`recipe-${slug}-comments`);

    // Helper function to publish to Ably with better error handling
    const publishToAbly = (channel: any, message: any) => {
      return new Promise((resolve, reject) => {
        channel.publish('new-comment', message, (err) => {
          if (err) {
            console.error("Error publishing to Ably:", err);
            return reject(err); // Reject if there's an error
          }
          console.log('Successfully published to Ably');
          resolve('Published');
        });
      });
    };

    // Attempt to publish the comment to Ably
    try {
      await publishToAbly(channel, responseComment);
    } catch (err) {
      console.error("Ably publish failed:", err);
      return new Response('Failed to publish to Ably', { status: 500 });
    }

    // Return success response with the new comment
    return new Response(JSON.stringify({ success: true, comment: responseComment }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error posting comment:", error);
    return new Response('Internal server error', { status: 500 });
  }
}

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
