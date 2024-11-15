import { db } from "@/lib/db";
import { ObjectId } from 'mongodb';




async function getCurrentSchool(request: Request) {
  const url = new URL(request.url);
  const hostname = url.hostname === 'localhost' ? process.env.CURRENT_HOST || 'defaultHost' : url.hostname;

  const baseDomain = hostname.split('/')[0];

  console.log("Base Domain:", baseDomain);
  const school = await db.collection('schools').findOne({ domain: baseDomain });

  if (!school) {
    console.warn(`No school found for domain: ${baseDomain}`);
    return null;
  }

  return school;
}

export async function GET(request: Request) {
  try {
    const currentSchool = await getCurrentSchool(request);

    if (!currentSchool) {
      return new Response('Not Found', { status: 404 });
    }
    const data = await db.collection('schooldata').findOne({ schoolDomain: currentSchool?.domain });
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(null, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = request.headers.get('userId');
  const body = await request.json();
  const { domain } = body;
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  const createdAt = new Date()

  const title = `${user?.name}-н вэбсайтад тавтай морилно уу !`
  const desc = "Манай вебсайт нь дижитал артын салбарт шилдэг туршлагуудыг танилцуулж, суралцагчдад чанартай мэдлэгийг хялбархан, хүртээмжтэйгээр хүргэх зорилготой..."
  const flow = 'DO IT FOR THE PLANET DO IT FOR YOUR BUSINESS THE BETTER YOUR ESG SCORE GETS, THE BIGGER THE DISCOUNT';
  const introduce = `${user?.name} багшийн тухай.`
  const introduceDesc = 'Өөрийгөө танилцуулах товч намтараа оруулна уу.'
  await db.collection('schooldata').insertOne({
    ownerId: userId,
    schoolDomain: domain,
    title,
    desc,
    flow,
    introduce,
    introduceDesc,
    createdAt
  });
  return new Response(null, { status: 200 });
}
