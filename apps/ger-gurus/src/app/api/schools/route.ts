import { db } from "@/lib/db";


// export async function GET(request: Request) {
//   const schools = await db.collection('schools').find({}).sort({ metacritic: -1 }).limit(20).toArray();
//   return Response.json(schools);
// }


async function getCurrentSchool(request: Request) {
  const host = new URL(request.url).hostname;
  const hostname = host === 'localhost' ? process.env.CURRENT_HOST : host;
  const school = await db.collection('schools').findOne({ domain: hostname });
  return school
}

export async function GET(request: Request) {
  const currentSchool = await getCurrentSchool(request);

  if (!currentSchool) {
    return new Response('Not Found', { status: 404 });
  }
  // const id=  school?._id
  // const oneSchool = await db.collection('schools').findOne({ _id: new ObjectId(id) });
  // if (!oneSchool) {
  //   return new Response('Not Found', { status: 404 });
  // }
  return Response.json(currentSchool);
}

export async function POST(request: Request) {
  const body = await request.json();
  const userId = request.headers.get('userId');
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { domain, description } = body;
  await db.collection('schools').insertOne({
    domain,
    description,
    owner: userId
  });
  return new Response(null, { status: 204 });
}
