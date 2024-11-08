import { DB } from '@/lib/db';
import { oauth_github } from 'config';
import jwt from 'jsonwebtoken';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';
  try {
    const params = new URLSearchParams({
      client_id: oauth_github.client_id,
      client_secret: oauth_github.client_secret,
      code: code || '',
    });
    const oauthResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
    });
    if (!oauthResponse) return new Response('failed to retrieve token', { status: 404 });
    const { access_token } = await oauthResponse.json();
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!userResponse) throw new Error('failed to retrieve user info');
    const githubUser = await userResponse.json();

    const collection = await DB.collection('users');
    const check = await collection.findOne({ email: githubUser.email, role: 'user' });
    if (!check) return new Response('failed to find the user', { status: 404 });
    const accessToken = jwt.sign({ userId: check._id, email: check.email }, ADMIN_ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const response = NextResponse.redirect(new URL('/client', request.url));
    response.headers.append('Set-cookie', `token=${accessToken}; Path=/; Max-Age=43200; SameSite=Lax`); //12h
    return response;
  } catch (error) {
    const errorResponse = NextResponse.redirect(new URL('/admin', request.url));
    return errorResponse;
  }
}
