import { DB } from '../../../../lib/db';

export async function PUT(request: Request) {
  enum Role {
    GOLD = 'gold',
    SILVER = 'silver',
    BRONZE = 'bronze',
    FREE = 'free',
    ADMIN = 'admin',
  }

  const body = await request.json();
  const { _id, newRole } = body;

  // Check role is valid
  if (!Object.values(Role).includes(newRole)) {
    return new Response(JSON.stringify({ message: 'Invalid role' }), { status: 400 });
  }

  // Get the current user
  const currentUser = await getCurrentUser(request);
  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
  }

  try {
    // Update the user role in the database
    const result = await DB.collection('users').updateOne({ _id }, { $set: { role: newRole } });

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: 'No user found or role not updated' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User role updated successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

async function getCurrentUser(request: Request) {
  // const body = await request.json();
  // const { _id, newRole } = body;
  // const res = await DB.collection('user').updateOne({_id}, {role: newRole})
  // Implement your logic to get the current user from the request
  // For example, decoding a token or fetching from session
  return { role: 'admin' }; // Simulating an admin user for the example
}
