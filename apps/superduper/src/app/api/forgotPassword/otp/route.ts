import { DB } from '@/lib/db';

const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';
interface User {
  _id: string;
  otp: number;
}

export async function PUT(request: Request) {
  try {
    const collection = DB.collection('users');
    const { otp, email } = await request.json();
    const user = await collection.findOne({ email });

    if (!user) return new Response(null, { status: 400 });

    if (otp == user.otp) return new Response(null, { status: 200 });
    return new Response(null, { status: 404 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
