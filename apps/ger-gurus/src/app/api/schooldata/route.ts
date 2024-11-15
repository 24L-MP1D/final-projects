import { db } from "@/lib/db";
import { ObjectId } from 'mongodb';




async function getCurrentSchool(request: Request) {
  const host = new URL(request.url).hostname;
  const hostname = host === 'localhost' ? process.env.CURRENT_HOST : host;
  if (!hostname) {
    throw new Error("Hostname is undefined. Please set the CURRENT_HOST environment variable.");
  }
  const cleanedHostname = hostname.split(':')[0]; // remove any port if present
  const school = await db.collection('schools').findOne({ domain: cleanedHostname });
  return school;
}

export async function GET(request: Request) {
  try {
    const currentSchool = await getCurrentSchool(request);

    if (!currentSchool) {
      return new Response('Not Found', { status: 404 });
    }
    const data = await db.collection('schooldata').findOne({ ownerId: currentSchool?.ownerId });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(null, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = request.headers.get('userId');
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
    title,
    desc,
    flow,
    introduce,
    introduceDesc,
    createdAt
  });
  return new Response(null, { status: 200 });
}
