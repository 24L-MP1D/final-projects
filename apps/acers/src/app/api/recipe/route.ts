import { DB } from '../../lib/db';

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

    return new Response(JSON.stringify({ res: 'Suxeed' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ 'error on creating product': e }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

