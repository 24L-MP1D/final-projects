'use client';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Calendar, Ellipsis, Heart, MessageSquare } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Advertisement from '../../ads/ads';
import { Stars } from '../../components/itemComponents/stars';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '../../components/ui/Table';

dayjs.extend(relativeTime);

export const formatTitle = (slug: string) => {
  if (!slug) {
    return '';
  }
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

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
  _id: string;
  recipeId: string;
  userId: string;
  firstName: string;
  comment: string;
  createdAt: Date;
}

interface Ads {
  name: string;
  id: string;
  images: string[];
  link: string;
}

interface User {
  id: string;
  firstName: string;
  profilePicture: string;
}

export default function RecipeComponent() {
  const { slug } = useParams<{ slug: string }>();
  const [user, setUser] = useState<Partial<User>>({ firstName: '' });
  const [ads, setAds] = useState<Ads>({});
  const [adsHover, setAdsHover] = useState<number>(0);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [freshRecipes, setFreshRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (slug) {
      const fetchRecipe = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/recipe/${slug}`);
          if (response.data.recipe) {
            setRecipe(response.data.recipe);
            setComments(response.data.comments);
          } else {
            setErrorMessage('Recipe not found');
          }
        } catch (error) {
          console.error('Error fetching recipe:', error);
          setErrorMessage('Failed to fetch recipe.');
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [slug]);

  useEffect(() => {
    const fetchFreshRecipes = async () => {
      try {
        const response = await axios.post('/api/recipe/getRecipe');
        console.log('Fresh recipes response:', response.data);

        if (response.data && response.data.hiddenData) {
          const sortedRecipes = response.data.hiddenData.sort((a: Recipe, b: Recipe) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          });
          setFreshRecipes(sortedRecipes.slice(0, 2));
        } else {
          console.error('No fresh recipes found');
        }
      } catch (error) {
        console.error('Error fetching fresh recipes:', error);
      }
    };
    fetchFreshRecipes();
  }, []);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`/api/recipe/${slug}/comment`, {
        comment: newComment,
      });
      if (response.data.success) {
        setComments((prev) => [...prev, response.data.comment]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <div className="xl:max-w-[1110px] w-full max-w-[80%] m-auto flex flex-col gap-6 font-serif ">
      {loading ? (
        <p>Loading recipe...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <>
          <div className="flex justify-between">
            {/* <div className="flex gap-4 items-center">
              <TrendingUp className="w-8 h-8" />
              <p className="text-slate-600">85% would make this again</p>
            </div> */}
            {/* <div className="flex gap-6">
              <Upload />
              <Bookmark />
            </div> */}
          </div>
          <p className="font-bold text-6xl leading-10">{formatTitle(slug)}</p>
          <div className="flex">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                {recipe?.tags && recipe.tags.length > 0 ? (
                  recipe?.tags.map((tag, index) => (
                    <div key={index} className="bg-gray-200 rounded-full px-4 py-1 ml-3 text-lg">
                      {tag}
                    </div>
                  ))
                ) : (
                  <p>No tags available.</p>
                )}
              </div>
              <div className="flex gap-2 text-lg">
                <Calendar />
                {dayjs(recipe?.updatedAt).fromNow()}
              </div>
              <div className="flex gap-2 text-lg">
                <MessageSquare />
                {comments.length}
              </div>
              <Stars size={15} />
            </div>
          </div>
          <div className="h-[1px] w-[1110px] bg-gray-200"></div>
          <p className="font-semibold text-xl leading-8">{recipe?.description}</p>
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
                    <div className="flex">{recipe?.servings} People</div>
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
                      <ol key={index} className="list-decimal p-2 ml-3 leading-8">
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center">{index + 1}</div>
                          <span className="ml-1 flex-1">{instruction.step}</span>
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
                      <TableCaption className="w-[150px] font-semibold text-xl pb-3 pl-1">Nutrition Facts</TableCaption>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipe?.nutritionFacts && recipe.nutritionFacts.length > 0 ? (
                      recipe?.nutritionFacts.map((fact, index) => (
                        <TableRow key={index}>
                          <TableCell className="w-[100px] text-lg">{fact.name}</TableCell>
                          <TableCell className="w-[100px] text-lg">{fact.value}</TableCell>
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
                <h4 className="text-lg font-semibold p-3">Fresh Recipes</h4>
                {freshRecipes.length > 0 ? (
                  freshRecipes.map((recipe, index) => (
                    <div key={index} className="flex mb-5 gap-3">
                      <div className="flex gap-2">
                        {recipe.img ? (
                          <img src={recipe.img} alt={`Fresh Recipe Image ${index + 1}`} className="w-[150px] h-[100px] object-cover rounded" />
                        ) : (
                          <div className="w-[150px] h-[100px] bg-gray-300 rounded"></div>
                        )}
                      </div>

                      <div>
                        <Stars size={15} />
                        <div>{recipe.title}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No fresh recipes available.</p>
                )}
              </div>
              <Advertisement />
            </div>
          </div>

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
                      <TableRow key={index} className="flex">
                        <TableCell>
                          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                        </TableCell>
                        <TableCell className="flex flex-col gap-1">
                          <p className="pt-2">{comment.firstName}</p>
                          <p className="text-gray-400">{dayjs(comment.createdAt).fromNow()}</p>
                          <p className="p-4">{comment.comment}</p>
                          <div className="flex items-center text-gray-400 gap-4">
                            <div className="flex gap-1">
                              <Heart />
                              <p>48</p>
                            </div>
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

            <div className="relative mb-5">
              <input
                className="h-[240px] w-full max-w-[1110px] bg-gray-200 rounded p-4"
                placeholder="Write your comment..."
                aria-label="Comment input"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="bg-orange-500 hover:bg-orange-400 w-[200px] h-[50px] rounded mt-2 absolute right-[36px] bottom-8 z-10 " aria-label="Post comment" onClick={handleCommentSubmit}>
                Post Comment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
