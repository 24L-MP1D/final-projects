import Ably from 'ably';
// const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
// const channel = ably.channels.get('auction-bids');

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

export async function POST(request: Request) {
  const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
  const channel = ably.channels.get('auction-bids');

  try {
    const { user, amount } = await request.json();

    await channel.publish('new-bid', { user, amount });

    return new Response(JSON.stringify({ message: 'Successfully published' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error publishing bid:', error); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Failed to publish bid' }), { status: 500 });
  }
}
