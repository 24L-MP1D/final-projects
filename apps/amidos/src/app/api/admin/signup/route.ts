import { db } from '@/lib/db';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSaltSync(10);
    console.log(username, email, password);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const signedipuser = await db.collection('user').findOne({ email: email });
    if (signedipuser) {
      return new Response('You already signed up', { status: 400 });
    }

    if (username.lenght < 1) {
      return new Response('Нэр хамгийн багадаа 2 үсэг орсон байх', { status: 402 });
    }
    if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email)) {
      return new Response('Имэйл буруу байна', { status: 402 });
    }
    if (password.lenght < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[ !@#$%^&*(),.?":{}|<> ]/.test(password)) {
      return new Response('Нууц үг шаардлага хангахгүй байна', { status: 402 });
    }
    await db.collection('user').insertOne({ username: username, email: email, password: hashedPassword, otp: '', role: '', createdat: '' });
    return new Response('Successfully signed up', { status: 200 });
  } catch (error) {
    console.log(error);
    new Response('Failed to signup', { status: 500 });
  }
}
