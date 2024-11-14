import { db } from "@/lib/db";


export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  const lowerCaseEmail = email.toLowerCase();

  const user = await db.collection('users').findOne({ email: lowerCaseEmail })

  if (user) return new Response(null, { status: 401 });
  return new Response(null, { status: 200 })
}
