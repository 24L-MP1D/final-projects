import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { findSchoolId } from "./[id]/route";


// export async function GET(request: Request) {
//   const schools = await db.collection('schools').find({}).sort({ metacritic: -1 }).limit(20).toArray();
//   return Response.json(schools);
// }

export async function GET(request: Request) {
  const id=await  findSchoolId(request)
  const oneSchool = await db.collection('schools').findOne({ _id: new ObjectId(id) });
  if (!oneSchool) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneSchool);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { domain, description } = body;
  await db.collection('schools').insertOne({
    domain,
    description,
  });
  return new Response(null, { status: 204 });
}
