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
      html: `<div>
      <p style="color: gray; font-size: large; ">Сайн байна уу? Танд энэ өдрийн мэнд хүргэе</p>
      <p style="color: gray; font-size: medium;">Таны нэвтрэх нэг удаагийн баталгаажуулах код:</p>
      <span style="color: white; font-size: large; padding: 3px; background-color: green;">  ${otp} </span>
      <p style="color: gray; font-size: medium;">энэхүү код нь 5 мин хүчинтэй болно.</p>
      <p style="color: gray; font-size: medium;">Amido's</p>
    </div>`,
    });
    return new Response('OTP is successfully sent');
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 500 });
  }
}
