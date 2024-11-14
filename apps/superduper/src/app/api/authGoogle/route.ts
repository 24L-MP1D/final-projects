import { DB } from '@/lib/db';
import { oauth_google_client } from 'config';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
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
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';

  try {
    const params = new URLSearchParams({
      client_id: oauth_google_client.client_id,
      client_secret: oauth_google_client.client_secret,
      code: code || '',
      grant_type: 'authorization_code',
      redirect_uri: oauth_google_client.redirect_uri,
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

    const collection = await DB.collection('users');
    let check = await collection.findOne({ email: payload.email });
    if (!check) {
      const user = await collection.insertOne({ email: payload.email, firstName: payload.given_name, lastName: payload.family_name, role: 'user' });
      check = { _id: user.insertedId, email: payload.email };
    }
    const accessToken = jwt.sign({ email: payload.email, userId: check?._id }, ADMIN_ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const response = NextResponse.redirect(new URL('/client', request.url));
    response.headers.append('Set-Cookie', `token=${accessToken}; Path=/; Max-Age=43200; SameSite=Lax`); //12 hours

    console.log('Redirecting to /admin and setting cookie.');
    return response;
  } catch (error) {}
  return NextResponse.redirect(new URL('/client', request.url));
}
