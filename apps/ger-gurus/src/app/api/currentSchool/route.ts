import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

// export async function GET(request: Request) {
//   const schools = await db.collection('schools').find({}).sort({ metacritic: -1 }).limit(20).toArray();
//   return Response.json(schools);
// }

async function getCurrentSchool(request: Request) {
  const url = new URL(request.url);
  const hostname = url.hostname === 'localhost' ? process.env.CURRENT_HOST || 'defaultHost' : url.hostname;

  const baseDomain = hostname.split('/')[0];

  console.log('Base Domain:', baseDomain);
  const school = await db.collection('schools').findOne({ domain: baseDomain });

  if (!school) {
    console.warn(`No school found for domain: ${baseDomain}`);
    return null;
  }

  return school;
}

export async function GET(request: Request) {
  const currentSchool = await getCurrentSchool(request);
  if (!currentSchool) {
    return new Response('Not Found', { status: 404 });
  }
  const id = currentSchool?._id;
  const oneSchool = await db.collection('schools').findOne({ _id: new ObjectId(id) });
  if (!oneSchool) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneSchool);
}

export async function POST(request: Request) {
  const body = await request.json();
  const userId = request.headers.get('userId');
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

  const { domain } = body;
  await db.collection('schools').insertOne({
    domain,
    ownerId: userId,
    ownerName: user?.name,
  });
  return new Response(null, { status: 204 });
}
