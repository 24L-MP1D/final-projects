import { DB } from '../../../../lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { search } = body;

  try {
    const query: any = {};

    // Build the query based on the search term
    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }, { ingredients: { $regex: search, $options: 'i' } }, { nutritionFacts: { $regex: search, $options: 'i' } }];
    }

    // Fetch recipes based on the query
    const recipes = await DB.collection('recipes').find(query).toArray();
    console.log('aa');
    // Return the recipes as a JSON response
    return new Response(JSON.stringify(recipes), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
