// const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
// const channel = ably.channels.get('auction-bids');

import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';

// export async function POST(request: Request) {
//   try {
//     const { user, amount } = await request.json();
//     console.log({ user, amount });
//     await channel.publish('new-bid', { user, amount });
//     return Response.json([{ message: 'successfully publish' }]);
//   } catch (err) {
//     return console.error('aldaa', err);
//   }
// }

// export async function POST(request: Request) {
//   const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
//   const channel = ably.channels.get('auction-bids');

//   try {
//     const { user, amount } = await request.json();

//     await channel.publish('new-bid', { user, amount });

//     return new Response(JSON.stringify({ message: 'Successfully published' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error publishing bid:', error); // Log the error for debugging
//     return new Response(JSON.stringify({ error: 'Failed to publish bid' }), { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
//   const channel = ably.channels.get('auction-bids');

//   try {
//     const { user, amount } = await request.json();

//     await channel.publish('new-bid', { user, amount });

//     console.log('Published new bid:', { user, amount });

//     return new Response(JSON.stringify({ message: 'Successfully published' }), { status: 200 });
//   } catch (err) {
//     console.error('Error while publishing bid:', err);
//     return new Response(JSON.stringify({ message: 'Error publishing bid' }), { status: 500 });
//   }
// }
export async function GET(request: Request) {
  try {
    const collection = DB.collection('bids');

    const result = await collection
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo',
          },
        },
        {
          $lookup: {
            from: 'product',
            localField: 'productId',
            foreignField: '_id',
            as: 'productInfo',
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();
    return Response.json(result);
  } catch (err) {
    return Response.json({ message: err });
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    data.userId = new ObjectId(String(data.userId));
    data.productId = new ObjectId(String(data.productId));
    const collection = DB.collection('bids');

    await collection.insertOne(data);
    return new Response(JSON.stringify({ message: 'Successfully published' }), { status: 200 });
  } catch (err) {
    console.error('Error while publishing bid:', err); // Log any errors encountered
    return new Response(JSON.stringify({ message: 'Error publishing bid' }), { status: 500 });
  }
}
export async function PUT(request: Request) {
  const collection = DB.collection('bids');

  const body = await request.json();
  const { searchValue, productId } = body;

  const pipeline = [];
  try {
    pipeline.push(
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $lookup: {
          from: 'product',
          localField: 'productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      }
    );
    if (searchValue) {
      pipeline.push({
        $match: {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $toString: '$bid' },
                  regex: searchValue,
                },
              },
            },
            {
              userInfo: { $elemMatch: { email: { $regex: searchValue, $options: 'i' } } },
            },
            {
              productInfo: { $elemMatch: { productName: { $regex: searchValue, $options: 'i' } } },
            },
          ],
        },
      });
    }
    if (productId) {
      pipeline.push({
        $match: {
          productId: new ObjectId(String(productId)),
        },
      });
    }

    const response = await collection.aggregate(pipeline).toArray();
    return Response.json(response);
  } catch (err) {
    return Response.json({ message: 'not found' }, { status: 404 });
  }
}
