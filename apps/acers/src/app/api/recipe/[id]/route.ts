import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
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
    const userId = await verifyToken(request);

    const body = await request.json();
    const date = new Date();
    const { title, description, prepTime, servings, ingredients, instructions, nutritionFacts, category, difficulty, availability, images, video, tags, comment } = body;

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
      userId,
      comment,
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

export async function GET(request: Request, { params }: { params: { id: string } | any }) {
  console.log('Fetching recipe with ID:', params?.id);

  try {
    if (params && params.id) {
      const { id } = params;

      const trimmedId = id.trim();
      if (!ObjectId.isValid(trimmedId)) {
        return new Response(JSON.stringify({ message: 'Invalid recipeId format' }), { status: 400 });
      }

      const recipe = await DB.collection('recipes').findOne({ _id: new ObjectId(trimmedId) });
      if (!recipe) {
        return new Response(JSON.stringify({ message: 'Recipe not found' }), { status: 404 });
      }

      const comments = await DB.collection('comments')
        .find({ recipeId: new ObjectId(trimmedId) })
        .toArray();

      return new Response(JSON.stringify({ recipe, comments }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      const recipes = await DB.collection('recipes').find().toArray();
      return new Response(JSON.stringify(recipes), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (e) {
    console.error('Error fetching recipe or comments:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
