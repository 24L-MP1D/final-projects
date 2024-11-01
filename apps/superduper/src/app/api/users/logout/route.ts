import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete('token');
  return new Response('logged out', { status: 200 });
}
