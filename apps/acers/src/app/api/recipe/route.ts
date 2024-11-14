import { DB } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const date = new Date();
<<<<<<< HEAD
    const { title, description, prepTime, servings, ingredients, instructions, nutritionFacts, category, difficulty, availability, images, video, tags, comment } = body;

=======
    const { title, description, prepTime, servings, ingredients, instructions, nutritionFacts, category, difficulty, availability, images, video, tags } = body;
>>>>>>> a5f17c8e4c37a63645efb5c5f80d3681c6138902
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
<<<<<<< HEAD
      comment,
    });

    return new Response(JSON.stringify({ res: 'Succeed' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({}), {
=======
    });

    return new Response(JSON.stringify({ res: 'Suxeed' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ 'error on creating product': e }), {
>>>>>>> a5f17c8e4c37a63645efb5c5f80d3681c6138902
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
<<<<<<< HEAD
=======

>>>>>>> a5f17c8e4c37a63645efb5c5f80d3681c6138902
