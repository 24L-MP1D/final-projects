'use client';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Bookmark, Calendar, Ellipsis, Heart, MessageSquare, Printer, SquarePen, TrendingUp, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

dayjs.extend(relativeTime);

interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  nutritionFacts: string[];
  category: string;
  difficulty: string;
  availability: string;
  images: string[];
  video: string;
  tags: string[];
  visits: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

interface Comment {
  recipeId: string;
  userId: string;
  comment: string;
  createdAt: Date;
}

interface User {
  id: string;
  firstName: string;
  role: Role[];
  profilePicture: string;
}

enum Role {
  GOLD = 'gold',
  SILVER = 'silver',
  BRONZE = 'bronze',
  FREE = 'free',
  admin = 'admin',
}

export default function RecipeComponent() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Partial<Recipe>>({});
  const [user, setUser] = useState<Partial<User>>({ firstName: '' });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/login');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipe/${id}`);
        setRecipe(response.data);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  function handleCommentSubmit() {
    if (!newComment.trim()) return;
    setLoading(true);

    const commentData: Comment = {
      recipeId: id as string,
      userId: user.id || 'unknown',
      comment: newComment,
      createdAt: new Date(),
    };

    axios
      .post('/api/comment', commentData)
      .then(({ status }) => {
        if (status === 201) {
          setComments((prevComments) => [...prevComments, commentData]);
          setNewComment('');
          alert('Comment posted successfully!');
        }
      })
      .catch((error) => {
        console.error('Error posting comment:', error);
        alert('Failed to post comment. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-[1110px] m-auto flex flex-col gap-6">
      {loading ? (
        <p>Loading recipe...</p>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <TrendingUp className="w-8 h-8" />
              85% would make this again
            </div>
            <div className="flex gap-6">
              <Upload />
              <Bookmark />
            </div>
          </div>
          <p className="font-bold text-6xl">{recipe.title}</p>
          <div className="flex">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-gray-300 w-[50px] h-[50px] rounded-full"></div>
                <p>{user.firstName}</p>
              </div>
              <div className="flex gap-2">
                <Calendar />
                {dayjs(recipe.updatedAt).fromNow()}
              </div>
              <div className="flex gap-2">
                <MessageSquare />
                {comments.length}
              </div>
            </div>
          </div>
          <div className="h-[1px] w-[1110px] bg-gray-200"></div>
          <p>{recipe.description}</p>
          <div className="bg-gray-300 w-[1110px] h-[624px] rounded">Video url</div>
          <div className="flex justify-between">
            <div>
              <div>
                <div className="flex">
                  <div>
                    <p>PREP TIME</p>
                    <p>{recipe.prepTime}</p>
                  </div>
                  <div>
                    <p>SERVINGS</p>
                    <div className="flex">
                      {recipe.servings}
                      <SquarePen />
                    </div>
                    <Printer />
                  </div>
                </div>
                <div>
                  <h3>Ingredients</h3>
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <ul key={index}>
                        <li>{ingredient}</li>
                      </ul>
                    ))
                  ) : (
                    <p>No ingredients available.</p>
                  )}
                  <h4>Instructions</h4>
                  {recipe.instructions && recipe.instructions.length > 0 ? (
                    recipe.instructions.map((instruction, index) => (
                      <ul key={index}>
                        <li>{instruction}</li>
                      </ul>
                    ))
                  ) : (
                    <p>No instructions available.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border-l pl-5">
              <div className="bg-slate-100 border border-1 rounded p-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Nutrition Facts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipe.nutritionFacts && recipe.nutritionFacts.length > 0 ? (
                      recipe.nutritionFacts.map((fact, index) => (
                        <TableRow key={index}>
                          <TableCell className="w-[100px]">{fact}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell>No nutrition facts available.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div>
                <h4>Fresh Recipes</h4>
                {[...Array(5)].map((_, index) => (
                  <div key={index}>
                    <div className="w-[130px] h-[100px]"></div>
                    <div>
                      <div>Rating</div>
                      <p>Spinach and Cheese Pasta</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p>Already made this?</p>
          {isLoggedIn ? (
            <button onClick={handleCommentSubmit}>Share your feedback</button>
          ) : (
            <div className="flex gap-1">
              <a href="/login" className="text-orange-500">
                Login
              </a>
              <p> to post a comment</p>
            </div>
          )}
          <div className="h-5 bg-orange-400"></div>
          <div>
            <p>{comments.length} Comments</p>
          </div>
          <div>
            <ScrollArea className="h-[400px] w-[1110px] rounded-md border border-none p-4">
              <Table>
                <TableCaption>Recent Comments</TableCaption>
                <TableBody className="flex flex-col">
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <TableRow key={index} className="flex gap-5">
                        <TableCell>
                          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        </TableCell>
                        <TableCell>
                          <p>{comment.userId}</p>
                          <p>{dayjs(comment.createdAt).fromNow()}</p>
                          <p>{comment.comment}</p>
                          <div className="flex items-center">
                            <Heart /> 48
                            <button className="flex items-center">
                              <Ellipsis />
                              <p>More</p>
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No comments yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
            {isLoggedIn && (
              <div className="relative">
                <input
                  className="h-[400px] w-full max-w-[1110px] bg-gray-200 rounded p-4"
                  placeholder="Write your comment..."
                  aria-label="Comment input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="bg-orange-500 hover:bg-orange-400 w-[200px] h-[50px] rounded mt-2 absolute right-0 bottom-0 z-10" aria-label="Post comment" onClick={handleCommentSubmit}>
                  Post Comment
                </button>
              </div>
            )}
          </div>
          <p>You might also like</p>
        </>
      )}
    </div>
  );
}
