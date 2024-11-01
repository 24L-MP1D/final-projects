import { DB } from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const number = parseInt(url.searchParams.get('number')) || 10; // Default to 10 if not provided
    console.log('Number:', number);

    const data = await DB.collection('recipes').find().sort({ visits: -1 }).limit(number).toArray();
    console.log(data);
    return new Response(JSON.stringify(hideData(data)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Error fetching recipes', details: e }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const hideData = (data) => {
  return data.map((item) => ({
    id: item._id,
    prepTime: item.prepTime,
    description: item.description,
    title: item.title,
    img: item.images ? item.images[0] : null, // Ensure there's an image
  }));
};
