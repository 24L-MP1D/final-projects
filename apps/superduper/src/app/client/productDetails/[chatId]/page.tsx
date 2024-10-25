'use client';

import { Bid } from '@/components/Bid';
import { Auction } from '@/components/BidExample';
import { HelpCenter } from '@/components/helpCenter';
import { ProductDetailImages } from '@/components/ProductDetailImages';
import { ProductType } from '@/components/productType';
import { Safity } from '@/components/Safity';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLYKEY });

export default function App({ params }: { params: { chatId: string } }) {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={params.chatId}>
        <Realtime chatId={params.chatId} />
      </ChannelProvider>
    </AblyProvider>
  );
}

function Realtime({ chatId }: { chatId: string }) {
  const validationSchema = yup.object({
    bid: yup.number().required('Please insert a valid bid amount').min(1000, 'minumum bid is 1000'),
  });

  const formik = useFormik({
    initialValues: {
      bid: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      sendBid();
      // fetch('/api/hello', {
      //   method: 'POST',
      //   body: JSON.stringify({ bid: values.bid }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      resetForm();
    },
    validationSchema,
  });

  const id = '671b4f498f3ba2f00e69fe3b';

  const [bids, setBids] = useState<Ably.Message[]>([]);

  const [oneProduct, setOneProduct] = useState<ProductType>();

  const [maximumBid, setMaximumBid] = useState(0);

  const { channel } = useChannel(chatId, 'auction-bids', (message) => {
    const maxBid = Number(message.data);
    setBids((previousBids) => [message, ...previousBids]);
    setMaximumBid((previousMaxBid) => (previousMaxBid < maxBid ? maxBid : previousMaxBid));
  });

  const sendBid = () => {
    channel.publish('auction-bids', String(formik.values.bid));
  };

  const loadProductDetail = async () => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    setOneProduct(data);
  };
  useEffect(() => {
    loadProductDetail();
  }, []);
  if (!oneProduct) return <div>loading</div>;
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-[1240px] mx-auto w-full">
      <div className="flex gap-24">
        <ProductDetailImages oneProduct={oneProduct} />

        <div className="flex flex-col gap-8 pb-12">
          <Bid
            formikTouched={formik.touched}
            oneProduct={oneProduct}
            formikErrors={formik.errors}
            sendBid={sendBid}
            bids={bids}
            formikValues={formik.values}
            formikHandleChange={formik.handleChange}
            maximumBid={maximumBid}
          />

          <Safity oneProduct={oneProduct} />

          <HelpCenter oneProduct={oneProduct} />

          <Auction oneProduct={oneProduct} />
        </div>
      </div>
    </form>
  );
}
