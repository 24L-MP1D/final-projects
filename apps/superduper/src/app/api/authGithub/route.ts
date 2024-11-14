import { DB } from '@/lib/db';
import { oauth_github_client } from 'config';
import jwt from 'jsonwebtoken';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';

  try {
    // Constructing OAuth request parameters
    const params = new URLSearchParams({
      client_id: oauth_github_client.client_id,
      client_secret: oauth_github_client.client_secret,
      code: code || '',
    });

    // Requesting the access token from GitHub
    const oauthResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
    });

    if (!oauthResponse.ok) throw new Error('Failed to retrieve access token');
    const { access_token } = await oauthResponse.json();

    // Fetching user information from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userResponse.ok) throw new Error('Failed to retrieve user info');
    const githubUser: { email?: string | null; login: string } = await userResponse.json();

    // Fetching the user's email addresses
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!emailResponse.ok) throw new Error('Failed to retrieve email info');
    const emails: { email: string; primary: boolean; verified: boolean }[] = await emailResponse.json();
    const primaryEmail = emails.find((email) => email.primary && email.verified)?.email;

    if (!primaryEmail) throw new Error('No verified email found for this GitHub user.');

    // Connecting to the database and checking for the user
    const collection = await DB.collection('users');
    let user = await collection.findOne({ email: primaryEmail });

    if (!user) {
      // If the user does not exist, create a new user record
      const newUser = await collection.insertOne({
        email: primaryEmail,
        firstName: githubUser.login,
        role: 'user',
      });
      user = { _id: newUser.insertedId, email: primaryEmail };
    }

    // Generating the access token
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, ADMIN_ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    // Setting the access token in a cookie and redirecting
    const response = NextResponse.redirect(new URL('/client', request.url));
    response.headers.append('Set-Cookie', `token=${accessToken}; Path=/; Max-Age=86400; SameSite=Lax`); // 24h cookie
    return response;
  } catch (error) {
    console.error(error);
    // Redirecting to the admin page in case of an error
    return NextResponse.redirect(new URL('/client', request.url));
  }
}
