import { db } from '@/lib/db';
export async function PUT(request: Request) {
  const bcrypt = require('bcryptjs');

  try {
    const body = await request.json();
    const salt = await bcrypt.genSaltSync(10);

    const { email, password, otp } = body;
    if (!otp) {
      return new Response('OTP not found', { status: 401 });
    }
    if (!email) {
      return new Response('Such user not found', { status: 401 });
    }
    const dataofpersonwithemail = await db.collection('user').findOne({ email: email });
    if (!dataofpersonwithemail) {
      return new Response('OTP not found', { status: 401 });
    }
    const isValid = otp == dataofpersonwithemail.otp;
    if (!isValid) {
      return new Response('OTP not found', { status: 401 });
    }

    const hashedPassword = await bcrypt.hashSync(password, salt);
    const dataofperson = await db.collection('user').updateOne({ email: email }, { $set: { password: hashedPassword } });
    await db.collection('user').updateOne({ email: email }, { $set: { otp: '' } });
    return new Response('Successfully renewed the pass', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 500 });
  }
}
