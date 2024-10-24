import { DB } from '@/lib/db';

export async function POST(request: Request) {
  const collection = await DB.collection('users');
  const body = await request.json();
  const { email, password } = body;
  const newUser = await collection.findOne(email);
  console.log({ newUser });

  // const Authenticated = email === newUser.email && password === bcrypt.compareSync(password);

  // try {
  //   return Response.json();
  // } catch (error) {
  //   return Response.json(response, { status: 400 });
  // }
}
