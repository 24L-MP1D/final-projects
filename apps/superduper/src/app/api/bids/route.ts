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

export async function POST(request: Request) {
  console.log('API endpoint hit!'); // Confirm the endpoint is hit

  // Initialize Ably with your API key
  const ably = new Ably.Realtime('YOUR_ABLY_API_KEY'); // Replace with your actual API key

  // Check connection to Ably
  ably.connection.on('connected', () => {
    console.log('Connected to Ably'); // Log connection success
  });

  const channel = ably.channels.get('auction-bids'); // Get the channel

  try {
    // Read and parse the request body
    const body = await request.json();
    const { user, amount } = body; // Destructure to get user and amount
    // Log received data

    // Publish the message to the channel
    await channel.publish('new-bid', { user, amount });
    console.log('Published new bid:', { user, amount }); // Log successful publish

    // Return success response
    return new Response(JSON.stringify({ message: 'Successfully published' }), { status: 200 });
  } catch (err) {
    console.error('Error while publishing bid:', err); // Log any errors encountered
    return new Response(JSON.stringify({ message: 'Error publishing bid' }), { status: 500 });
  }
}
