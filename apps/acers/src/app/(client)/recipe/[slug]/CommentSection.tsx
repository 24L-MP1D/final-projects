'use client';

import Ably from 'ably';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Define a type for the comment
interface Comment {
  _id: string;
  firstName: string;
  comment: string;
  createdAt: string; // You can adjust this based on the type of your `createdAt`
}

interface CommentSectionProps {
  recipeId: string; // recipeId should be a string (or ObjectId depending on how you store it)
  user: { id: string; firstName: string } | null; // Optional user object
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipeId, user }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]); // Properly typed comment state
  const [loading, setLoading] = useState(true); // To manage loading state when fetching comments

  // Initialize Ably (with your API key)
  const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_KEY });
  const channel = ably.channels.get(`recipe-${recipeId}-comments`);

  // Fetch existing comments when the component mounts
  useEffect(() => {
    // Fetch initial comments for the recipe from your API
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/recipe/${slug}/comment`);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false); // Set loading to false once comments are fetched
      }
    };

    fetchComments();

    // Subscribe to the Ably channel for real-time updates
    channel.subscribe('new-comment', (message) => {
      // Add the new comment to the state when it is received
      setComments((prevComments) => [message.data, ...prevComments]);
    });

    // Cleanup subscription on component unmount
    return () => {
      channel.unsubscribe('new-comment');
    };
  }, [recipeId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert('Comment cannot be empty!');
      return;
    }

    setIsSubmitting(true);
    const commentData = {
      recipeId: recipeId,
      comment: newComment,
      firstName: user?.firstName || 'Anonymous',
      userId: user?.id || '', // Pass the userId directly
    };

    try {
      // Send the comment to the backend to be stored in the database
      const response = await axios.post(`/api/comment/${recipeId}`, commentData);
      if (response.status === 201) {
        setNewComment('');
      } else {
        alert('Failed to post comment.');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Comments Section */}
      <h3>{comments.length} Comments</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment._id} style={{ marginBottom: '1rem' }}>
              <p>
                <strong>{comment.firstName}</strong>: {comment.comment}
              </p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Input */}
      <textarea
        placeholder="Write your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        disabled={isSubmitting} // Disable input when submitting
      />
      <button onClick={handleCommentSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </div>
  );
};

export default { CommentSection };
