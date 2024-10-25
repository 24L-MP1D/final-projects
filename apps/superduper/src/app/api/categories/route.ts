import { DB } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const collection = DB.collection('categories');
    const result = await collection.find({ category: 'categories' }).toArray();
    return Response.json(result);
  } catch (err) {
    console.error(err);
  }
}

export async function POST(request: Request) {
  try {
    const collection = await DB.collection('categories');
    const category=await request.json();
    console.log(category)
    const result=await collection.insertOne({category});
    return new Response(null,{status:201})
  } catch (err) {
    return new Response(null,{status:404})
  }
}
