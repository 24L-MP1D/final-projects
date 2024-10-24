import bcrypt from "bcrypt";
import { db } from "../../../lib/db";

export async function GET(request: Request) {
  const list = await db.collection('users').find({}).toArray();
  return Response.json(list)
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;
  const createdAt = new Date()
  const user = await db.collection('users').findOne({ email })
  if (user) return new Response(null, { status: 401 })
  const hashedPassword = await bcrypt.hash(String(password), Number(process.env.SALT_SECRET))
  await db.collection('users').insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt
  });
  return new Response(null, { status: 204 });
}
