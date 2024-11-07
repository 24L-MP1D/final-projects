import { DB } from '@/lib/db';


export async function POST(request: Request) {
  try {
    const collection = await DB.collection('categories');
    const category = await request.json();

    const result = await collection.insertOne(category);
    return new Response(null, { status: 201 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }}
const collection = DB.collection('categories');

// export async function POST(request: Request) {
//   try {
//     const category = await request.json();
//     console.log(category)
//     const result = await collection.insertOne({ category });
//     return new Response(null, { status: 201 })
//   } catch (err) {
//     return new Response(null, { status: 404 })
//   }
// }
export async function GET(request: Request) {
  try {
    const categories = await collection.find({}).toArray()
    return Response.json(categories)
  } catch (err) {
    return Response.json({ message: "categories deer aldaa garlaa" })

  }
}
