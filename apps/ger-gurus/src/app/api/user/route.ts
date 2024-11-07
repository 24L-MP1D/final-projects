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
    return Response.json(currentUser);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Invalid token', { status: 401 });

  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, role } = body;
  const lowerCaseEmail = email.toLowerCase();

  const createdAt = new Date()
  const user = await db.collection('users').findOne({ email })

  if (user) return new Response(null, { status: 401 })
  const hashedPassword = await bcrypt.hash(String(password), Number(process.env.SALT_SECRET))
  const result = await db.collection('users').insertOne({
    name,
    email: lowerCaseEmail,
    password: hashedPassword,
    role,
    createdAt
  });
  const authtoken = jwt.sign(
    { userId: result.insertedId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
  return Response.json(authtoken, { status: 200 });
}
