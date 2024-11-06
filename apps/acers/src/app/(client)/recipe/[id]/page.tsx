'use client';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Bookmark, Calendar, Ellipsis, Heart, MessageSquare, TrendingUp, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '../../components/ui/Table';

dayjs.extend(relativeTime);

interface Recipe {
  _id: string;
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: { name: string }[];
  instructions: { name: string; step: string }[];
  nutritionFacts: { name: string; value: string }[];
  category: string;
  difficulty: string;
  availability: string;
  images: string[];
  video: string;
  tags: string[];
  visits: number;
  createdAt: Date;
  updatedAt: Date;
  comment: Comment[];
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
  ADMIN = 'admin',
}

export default function RecipeComponent() {
  const params = useParams<{ id: string }>();

  const id = params?.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const [user, setUser] = useState<Partial<User>>({ firstName: '' });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = localStorage.getItem('authtoken');
  //       const response = await axios.get('/api/user', {
  //         headers: {
  //           authtoken: token,
  //         },
  //       });
  //       setUser(response.data.user);
  //       setIsLoggedIn(true);
  //     } catch (error) {
  //       console.error('Error checking authentication status:', error);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipe/${id}`);
        if (!response) {
          throw new Error('response not ok');
        }

        console.log(response.data);
        setRecipe(response.data.recipe);
        console.log(recipe);
        // setRecipe(response.data.recipes);
        // setComments(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setErrorMessage('Failed to fetch recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  async function handleCommentSubmit() {
    if (!newComment.trim()) {
      alert('Comment cannot be empty!');
      return;
    }

    const commentData: Comment = {
      recipeId: id as string,
      userId: user.id || 'unknown',
      comment: newComment,
      createdAt: new Date(),
    };

    setComments((prevComments) => [...prevComments, commentData]);
    setNewComment('');

    try {
      const response = await axios.post(`/api/comment/${id}`, commentData);
      if (response.status !== 201) {
        throw new Error('Failed to post comment');
      }
      alert('Comment posted successfully!');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  }

  return (
    <div className="w-[1110px] m-auto flex flex-col gap-6">
      {loading ? (
        <p>Loading recipe...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <TrendingUp className="w-8 h-8" />
              <p className="text-slate-600">85% would make this again</p>
            </div>
            <div className="flex gap-6">
              <Upload />
              <Bookmark />
            </div>
          </div>
          <p className="font-bold text-5xl">{recipe?.title}</p>
          <div className="flex">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-gray-300 w-[50px] h-[50px] rounded-full"></div>
                <p>{user.firstName || 'Anonymous'}</p>
              </div>
              <div className="flex gap-2">
                <Calendar />
                {dayjs(recipe?.updatedAt).fromNow()}
              </div>
              <div className="flex gap-2">
                <MessageSquare />
                {comments.length}
              </div>
            </div>
          </div>
          <div className="h-[1px] w-[1110px] bg-gray-200"></div>
          <p className="font-semibold text-xl">{recipe?.description}</p>
          <div className="rounded">
            {recipe?.images ? (
              recipe.images.map((image, index) => <img key={index} src={image} alt={`Recipe Image ${index + 1}`} className="w-[1110px] h-[624px] object-cover rounded" />)
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="flex justify-between">
            <div>
              <div>
                <div className="flex gap-5 ">
                  <div>
                    <p className="font-medium text-slate-600">PREP TIME</p>
                    <p>{recipe?.prepTime}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-600">SERVINGS</p>
                    <div className="flex">
                      {recipe?.servings} People
                      {/* <SquarePen /> */}
                    </div>
                    {/* <Printer /> */}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-3xl py-5">Ingredients</h3>
                  {recipe?.ingredients && recipe.ingredients.length > 0 ? (
                    recipe?.ingredients.map((ingredient, index) => (
                      <ul key={index} className="list-disc p-2 ml-3">
                        <li>{ingredient.name}</li>
                      </ul>
                    ))
                  ) : (
                    <p>No ingredients available.</p>
                  )}
                  <h4 className="font-bold text-3xl py-5">Instructions</h4>
                  {recipe?.instructions && recipe.instructions.length > 0 ? (
                    recipe?.instructions.map((instruction, index) => (
                      <ol key={index} className="list-decimal p-2 ml-3">
                        <li className="flex items-start space-x-3">
                          <span className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center">{index + 1}</span>
                          <span>{instruction.step}</span>
                        </li>
                      </ol>
                    ))
                  ) : (
                    <p>No instructions available.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border-l pl-5">
              <div className="bg-slate-100 border border-1 rounded px-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCaption className="w-[130px] font-semibold text-lg pb-3 pl-1">Nutrition Facts</TableCaption>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipe?.nutritionFacts && recipe.nutritionFacts.length > 0 ? (
                      recipe?.nutritionFacts.map((fact, index) => (
                        <TableRow key={index}>
                          <TableCell className="w-[100px]">{fact.name}</TableCell>
                          <TableCell className="w-[100px]">{fact.value}</TableCell>
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
          {/* {isLoggedIn ? (
            <button onClick={handleCommentSubmit}>Share your feedback</button>
          ) : (
            <div className="flex gap-1">
              <a href="/login" className="text-orange-500">
                Login
              </a>
              <p> to post a comment</p>
            </div>
          )} */}
          <div className="h-3 bg-orange-400"></div>
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
                      <TableRow key={index + comment.userId} className="flex gap-5">
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
                <button className="bg-orange-500 hover:bg-orange-400 w-[200px] h-[50px] rounded mt-2 absolute right-[36px] bottom-8 z-10" aria-label="Post comment" onClick={handleCommentSubmit}>
                  Post Comment
                </button>
              </div>
            )}
          </div>
          <p>You might also like</p>
          <div></div>
        </>
      )}
    </div>
  );
}
