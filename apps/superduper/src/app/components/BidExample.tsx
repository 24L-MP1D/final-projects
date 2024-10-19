// import * as Ably from 'ably';

// import { useEffect, useState } from 'react';
// import { Input } from './ui/Input';

// // Connect to Ably using the AblyProvider component and your API key

// type Type = {
//   user: string;
//   amount: number;
// };
// export const Auction = () => {
//   const [bids, setBids] = useState<Type[]>([]);
//   const [bid, setBid] = useState<number>(0);
//   // const bidPost = async () => {
//   //   console.log('bads');
//   //   await fetch('/api/bids', {
//   //     method: 'POST',

//   //     headers: {
//   //       'Content-Type': 'application/json; charset=UTF-8',
//   //     },

//   //     body: JSON.stringify({
//   //       user: 'Badral',
//   //       amount: bid,
//   //     }),
//   //   });

//   //   setBid(0);
//   // };
//   const bidPost = async () => {
//     console.log('bads');
//     if (bid <= 0) {
//       console.error('Bid amount must be greater than 0');
//       return;
//     }

//     try {
//       const response = await fetch('/api/bids', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user: 'Badral',
//           amount: bid,
//         }),
//       });

//       const data = await response.json(); // Parse the JSON response

//       if (!response.ok) {
//         throw new Error(data.error || 'Something went wrong');
//       }

//       console.log('Response:', data); // Log the successful response
//       setBid(0);
//     } catch (error) {
//       console.error('Failed to post bid:', error); // Log any errors
//     }
//   };
//   useEffect(() => {
//     const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
//     const channel = ably.channels.get('auction-bids');

//     // Subscribe to new bids
//     channel.subscribe('new-bid', (message) => {
//       const { user, amount } = message.data;
//       setBids((prevBids) => [...prevBids, { user, amount }]);
//     });

//     // Cleanup the subscription when the component is unmounted
//     return () => {
//       channel.unsubscribe();
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Live Auction Bids</h2>
//       <Input type="number" value={bid == 0 ? '' : bid} onChange={(e) => setBid(Number(e.target.value))} />
//       <button onClick={bidPost}>Publish</button>
//       <ul>
//         {bids.map((bid, index) => (
//           <li key={index}>
//             {bid.user} placed a bid of ${bid.amount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
import * as Ably from 'ably';
import { useEffect, useState } from 'react';
import { Input } from './ui/Input';

type Type = {
  user: string;
  amount: number;
};

export const Auction = () => {
  const [bids, setBids] = useState<Type[]>([]);
  const [bid, setBid] = useState<number>(0);

  const bidPost = async () => {
    console.log('Preparing to post bid...');
    try {
      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'Badral',
          amount: bid,
        }),
      });
      const data = await response.json();
      console.log('Response from server:', data);
      if (!response.ok) {
        console.error('Failed to publish bid:', data);
      }
    } catch (error) {
      console.error('Error posting bid:', error);
    }
    console.log('Bid posting complete.');
    setBid(0);
  };

  useEffect(() => {
    const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
    console.log('Connecting to Ably...');
    const channel = ably.channels.get('auction-bids');

    // Subscribe to new bids
    channel.subscribe('new-bid', (message) => {
      const { user, amount } = message.data;

      setBids((prevBids) => [...prevBids, { user, amount }]);
    });

    // channel.on('error', (error) => {
    //   console.error('Ably channel error:', error);
    // });

    // Cleanup the subscription when the component is unmounted
    return () => {
      console.log('Unsubscribing from channel...');
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Live Auction Bids</h2>
      <Input type="number" value={bid === 0 ? '' : bid} onChange={(e) => setBid(Number(e.target.value))} />
      <button onClick={bidPost}>Publish</button>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>
            {bid.user} placed a bid of ${bid.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};
