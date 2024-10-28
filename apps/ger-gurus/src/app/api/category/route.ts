
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const list = await db.collection('users').find({}).toArray();
  // console.log({ list })
  return Response.json(list)
}
