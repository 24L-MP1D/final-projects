import jwt, { JwtPayload } from 'jsonwebtoken';
import { DB } from '../../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '';

async function verifyToken(request: Request) {
  const token = request.headers.get('authtoken');
  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof decoded === 'string' || !decoded.userId) {
      throw new Error('Invalid token');
    }
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const date = new Date();
    const { title, description, prepTime, servings, ingredients, instructions, nutritionFacts, category, difficulty, availability, images, video, tags } = body;

    const res = await DB.collection('recipes').insertOne({
      title,
      description,
      prepTime,
      servings,
      ingredients,
      instructions,
      nutritionFacts,
      category,
      difficulty,
      availability,
      images,
      video,
      tags,
      visits: 0,
      createdAt: date.toDateString(),
      updatedAt: date.toDateString(),
    });

    return new Response(JSON.stringify({ res: 'Succeed' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = await params;

  const recipe = await DB.collection('recipes').findOne({ title: slug });

  if (!recipe) {
    return new Response(JSON.stringify({ message: 'Recipe not found' }), { status: 404 });
  }

  console.log('id        :', recipe._id);

  const comments = await DB.collection('comments').find({ recipeId: recipe._id }).toArray();
  console.log('comms:           ', comments);

  return new Response(JSON.stringify({ recipe, comments }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
