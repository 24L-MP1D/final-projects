import { db } from '@/lib/db';
export async function PUT(request: Request) {
  const bcrypt = require('bcryptjs');
  try {
    const body = await request.json();
    const salt = await bcrypt.genSaltSync(10);

    const { email, password } = body;
    const otp = localStorage.getItem('otp');
    if (!otp) {
      return new Response('OTP not found', { status: 401 });
    }
    if (!email) {
      return new Response('Such user not found', { status: 401 });
    }
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const dataofperson = await db.collection('user').updateOne({ email: email }, { $set: { password: hashedPassword } });
    console.log(dataofperson);
    if (!dataofperson) {
      return new Response('Could not renew the pass', { status: 404 });
    } else {
      return new Response('Successfully renewed the pass', { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 404 });
  }
}
