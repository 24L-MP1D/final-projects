import { DB } from '@/lib/db';


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
