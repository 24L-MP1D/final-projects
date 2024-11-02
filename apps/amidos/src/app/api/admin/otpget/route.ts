const GOOGLE_SECRET_OTP = process.env.GOOGLE_SECRET_OTP;
import { db } from '@/lib/db';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recoveryemail, otp } = body;
    const otpperson = await db.collection('OTP').findOne({ recoveryemail: recoveryemail });
    console.log(otpperson);
    if (!otpperson) {
      return new Response('Wrong email', { status: 401 });
    } else {
      const isValid = otp === otpperson.otp;
      if (isValid) {
        return new Response('Password successfully recovered', { status: 200 });
      }
    }
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 404 });
  }
}