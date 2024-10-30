import { DB } from '@/lib/db';
import { oauth_google } from 'config';
import { OAuth2Client } from 'google-auth-library';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  const client = new OAuth2Client(process.env.OAUTH_GOOGLE_CLIENT_ID);
  interface payload {
    email: string;
    name: string;
    picture: string;
    sub: string;
  }

  try {
    const params = new URLSearchParams({
      client_id: oauth_google.client_id,
      client_secret: oauth_google.client_secret,
      code: code || '',
      grant_type: 'authorization_code',
      redirect_uri: oauth_google.redirect_uri,
    });
    const oauthResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    if (!oauthResponse.ok) {
      throw new Error('Failed to retrieve token');
    }
    const oauthResponseData = await oauthResponse.json();

    const { id_token } = oauthResponseData;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Failed to verify token payload');
    }

    const collection = await DB.collection('admins');
    const check = await collection.findOne({ email: payload.email });
    console.log(check);
    if (check) {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else {
      return new Response(JSON.stringify({ message: '404' }), { status: 404 });
    }

    // return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {}
  return new Response(JSON.stringify({ message: '404' }), { status: 200 });
}
