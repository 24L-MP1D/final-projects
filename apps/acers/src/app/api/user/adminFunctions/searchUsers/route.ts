import { DB } from '../../../../lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { _id, search, phoneNumber, role, picture, createdAt, updatedAt } = body;

  try {
    const query: any = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { _id: { $regex: search, $options: 'i' } },
        { createdAt: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await DB.collection('users').find(query).toArray();
    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json({});
  }
}
