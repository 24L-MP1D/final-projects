const GOOGLE_SECRET_OTP = process.env.GOOGLE_SECRET_OTP;
import { db } from '@/lib/db';
import nodeMailer from 'nodemailer';
const otp = Math.floor(Math.random() * 899999) + 100000;
const otpcreated = Date.now();
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    const dataofperson = await db.collection('user').findOne({ email: email });
    console.log(dataofperson);
    if (!dataofperson) {
      return new Response('You are not signed up. Please sign up', { status: 401 });
    }
    const otpdata = await db.collection('user').updateOne({ email: email }, { $set: { otp: otp, createdat: otpcreated } });

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anarchulu@gmail.com',
        pass: GOOGLE_SECRET_OTP,
      },
    });
    await transporter.sendMail({
      from: 'anarchulu@gmail.com',
      to: email,
      subject: 'OTP verification',
      html: `<h1>Your recovery OTP is ${otp} </h1>`,
    });
    return new Response('OTP is successfully sent');
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 500 });
  }
}
