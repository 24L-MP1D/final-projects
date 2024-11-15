import { DB } from '@/lib/db';
import nodemailer from 'nodemailer';
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';

export async function PUT(request: Request) {
  const { email } = await request.json();

  try {
    const collection = DB.collection('users');
    const user = await collection.findOne({ email });

    if (!user) {
      return new Response(null, { status: 404 });
    }

    const { _id } = user;
    console.log(_id);
    if (!_id) {
      console.log('user not found');
      return new Response(null, { status: 400 });
    }
    const otp = Math.floor(Math.random() * 899999) + 100000;
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    console.log(otp);

    await collection.updateOne(
      { _id },
      {
        $set: {
          otp,
          expiresAt: expirationTime,
        },
      }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'galt.batzana1@gmail.com',
        pass: GOOGLE_SECRET,
      },
    });
    try {
      await transporter.sendMail({
        from: 'galt.batzana1@gmail.com',
        to: email,
        subject: 'Нууц 6 орон тоо',
        text: `Таны нэг удаагийн нууц 6 орон тоо :${otp}
        хүчинтэй хугацаа: 5 минут`,
      });

      console.log('user not ');
      return Response.json({ email });
    } catch (err) {
      return Response.json({ message: 'error' });
    }
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
