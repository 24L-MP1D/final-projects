import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, otp } = body;

  try {
    const otpRecord = await db.collection('otp').findOne({ otp });
    if (!otpRecord) {
      return new Response('OTP record not found', { status: 404 });
    }

    const verify = email == otpRecord.email;
    if (verify) {
      return new Response('OTP verified successfully', { status: 200 });
    } else {
      return new Response('Invalid OTP', { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response('Error verifying OTP', { status: 500 });
  }
}
