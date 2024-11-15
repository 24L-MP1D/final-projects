import { DB } from '@/lib/db';

const collection = DB.collection('notifications');

export async function PUT(request: Request) {
  const { userId } = await request.json();

  try {
    const result = await collection
      .aggregate([
        {
          $lookup: {
            from: 'product',
            localField: 'productId',
            foreignField: '_id',
            as: 'productInfo',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo',
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();
    return Response.json(result);
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
