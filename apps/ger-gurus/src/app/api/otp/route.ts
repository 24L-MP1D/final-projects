import nodemailer from "nodemailer";
import { db } from "../../lib/db";


export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  const otp = Math.floor(Math.random() * 8999) + 1000;
  const GOOGLE_SECRET = process.env.GOOGLE_SECRET
  try {
    await db.collection('users').insertOne({
      email,
      otp
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '88delgeree@gmail.com',
        pass: GOOGLE_SECRET,
      },
    });

    await transporter.sendMail({
      from: '88delgeree@gmail.com',
      to: email,
      subject: 'OTP Verification',
      html: `<p>Your OTP for verification is: <b>${otp}</b></p>`
    })
    return new Response('OTP sent successfully', { status: 200 })
  }
  catch (error) {
    console.error(error)
    return new Response('OTP send failed.', { status: 400 })
  }
}
