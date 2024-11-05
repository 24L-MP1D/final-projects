const GOOGLE_SECRET_OTP = process.env.GOOGLE_SECRET_OTP;
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const datenow = Date.now();
  console.log(typeof datenow);
  try {
    const body = await request.json();
    const { recoveryemail, otp } = body;
    console.log(recoveryemail, otp);
    const otpperson = await db.collection('user').findOne({ email: recoveryemail });
    console.log(otpperson);
    if (!otpperson) {
      return new Response('Wrong email', { status: 401 });
    }
    const isValid = otp == otpperson.otp;
    if (!isValid) {
      return new Response('Wrong OTP', { status: 401 });
    }
    const timeDifferenceInMinutes = Math.floor((datenow - otpperson.createdat) / (1000 * 60));
    console.log('hi');
    console.log(timeDifferenceInMinutes);
    if (timeDifferenceInMinutes > 5) {
      await db.collection('user').updateOne({ email: recoveryemail }, { $set: { otp: '' } });
      return new Response('Expired OTP', { status: 404 });
    }

    return new Response('Correct OTP', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 500 });
  }
}
