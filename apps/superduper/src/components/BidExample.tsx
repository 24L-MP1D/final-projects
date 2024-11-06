import * as Ably from 'ably';
import { useEffect, useState } from 'react';
import { ProductType } from './productType';
import { Input } from './ui/Input';

type Type = {
  user: string;
  amount: number;
};

const ably = new Ably.Realtime('kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM');
export const Auction = ({ oneProduct }: { oneProduct: ProductType }) => {
  const [bids, setBids] = useState<Type[]>([]);
  const [bid, setBid] = useState<number>(0);
  const channel = ably.channels.get('auction-bids');
  const loadBid = async () => {
    const response = await fetch('/api/bids');
    const data = await response.json();
    setBids(data);
  };
  const bidPost = async () => {
    const data = { user: 'badral', amount: bid };
    if (!bid || bid <= 0) {
      return;
    }

    channel.publish('new-bid', data);
    console.log('Preparing to post bid...');
    try {
      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'badral',
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
    loadBid();
    console.log('Connecting to Ably...');
    const channel = ably.channels.get('auction-bids');

    channel.subscribe('new-bid', (message) => {
      setBids((prevBids) => [...prevBids, message.data]);
    });

    return () => {
      console.log('Unsubscribing from channel...');
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Шууд дуудлага худалдаа</h2>
      <Input type="number" value={bid > 0 ? bid : ''} onChange={(e) => setBid(Number(e.target.value))} />
      <button onClick={bidPost}>Нийтлэх</button>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>
            {bid.user} Үнийн санал оруулах доллар{bid.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};
