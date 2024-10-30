import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";


export async function GET(request: Request) {
  try {
    const headers = request.headers;
    const authtoken = headers.get("authtoken");

    if (!authtoken) {
      return new Response("No token provided", { status: 401 });
    }

    const data = jwt.decode(authtoken as string);
    if (typeof data !== 'object' || data === null || !('userId' in data)) {
      return new Response("Invalid token", { status: 401 });
    }
    console.log(data.userId)
    const list = await db.collection('users').findOne({ _id: new ObjectId(data.userId) });
    console.log(list)
    if (!list) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(list), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, role } = body;
  const createdAt = new Date()
  const user = await db.collection('users').findOne({ email })
  if (user) return new Response(null, { status: 401 })
  const hashedPassword = await bcrypt.hash(String(password), Number(process.env.SALT_SECRET))
  await db.collection('users').insertOne({
    name,
    email,
    password: hashedPassword,
    role,
    createdAt
  });
  return new Response(null, { status: 204 });
}
