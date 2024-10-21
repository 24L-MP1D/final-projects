import { db } from "../../lib/db";

export async function GET(request: Request) {
  const list = await db.collection('products').find({}).toArray();
  return Response.json(list)
}

