import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";


declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";


export async function GET(request: Request) {
  try {
    const headers = request.headers;
    const authtoken = headers.get("authtoken");
    if (!authtoken) {
      return new Response('No token provided', { status: 401 });
    }
    const { userId } = <jwt.UserIDJwtPayload>jwt.verify(authtoken, ACCESS_TOKEN_SECRET);
    if (!userId) {
      return new Response('User ID not found!', { status: 401 });
    }
    const currentUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!currentUser) {
      return new Response('User not found', { status: 401 });
    }
    return Response.json(currentUser, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response("Invalid token", { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;
  const lowerCaseEmail = email.toLowerCase();

  const createdAt = new Date()
  const user = await db.collection('users').findOne({ email: lowerCaseEmail })

  if (user) return new Response(null, { status: 401 })
  const hashedPassword = await bcrypt.hash(String(password), Number(process.env.SALT_SECRET))
  const result = await db.collection('users').insertOne({
    name,
    email: lowerCaseEmail,
    password: hashedPassword,
    createdAt
  });
  const authtoken = jwt.sign(
    { userId: result.insertedId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
  return new Response(JSON.stringify({ token: authtoken, userId: result.insertedId }), {
    status: 200,
  });
}
