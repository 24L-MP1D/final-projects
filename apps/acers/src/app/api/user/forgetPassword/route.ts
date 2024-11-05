import { DB } from '../../../lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  try {
    const user = await DB.collection('users').findOne({ email });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Return the user details in the response
    return new Response(
      JSON.stringify({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store', // Ensure sensitive data is not cached
        },
      }
    );
  } catch (error) {
    console.error(' error:', error);

    return new Response('An error occurred', { status: 500 });
  }
}
