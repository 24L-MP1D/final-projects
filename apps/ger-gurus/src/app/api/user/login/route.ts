import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const lowerCaseEmail = email.toLowerCase()
    if (!email || !password) {
      return new Response("Email and password are required!", { status: 400 })
    }

    const user = await db.collection('users').findOne({ email: lowerCaseEmail })
    if (!user) return new Response("User not found!", { status: 401 })

    const isTrue = await bcrypt.compare(password, user.password);
    if (isTrue) {
      const authtoken = jwt.sign(
        { userId: user._id, email: user.email },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "24h" }
      );
      return new Response(JSON.stringify({ token: authtoken, userId: user._id }), {
        status: 200,
      });
    }
    return new Response("Password is incorrect!", { status: 403 })
  } catch (error) {
    console.error(error);
    return new Response("An error occurred during login.", { status: 500 })
  }
}