import { DB } from "../../lib/db";

export async function GET(request: Request) {
  try {
    const collection = DB.collection('products');
    const result = await collection.find({}).toArray();
    return Response.json(result)
  } catch (err) {
    console.error(err)
  }
  return Response.json({ message: 'Heelo world!' });
}

export async function POST() {
  return Response.json({ message: 'Heelo world!' });
}

export async function PUT() {
  return Response.json({ message: 'Heelo world!' });
}

export async function DEL() {
  return Response.json({ message: 'Heelo world!' });
}
