'use client';

import { Bid } from '@/components/Bid';
import { BidDialog } from '@/components/bidDialog';
import { BidType } from '@/components/bidType';
import { HelpCenter } from '@/components/helpCenter';
import { PlacedBidDialog } from '@/components/placedBidDialog';
import { ProductDetailImages } from '@/components/ProductDetailImages';
import { ProductType } from '@/components/productType';
import { Safity } from '@/components/Safity';
import { BidSticky } from '@/components/stickyBid';
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
  const id = '671f3e9409e0a506b97f5c89';

  const [bids, setBids] = useState<BidType[]>([]);

  const [dialogsBid, setDialogsBid] = useState(0);

  const [oneProduct, setOneProduct] = useState<ProductType>();

  const [maximumBid, setMaximumBid] = useState(0);

  const [open, setOpen] = useState(false);

  const [secondDialog, setSecondDialog] = useState(false);

  const [isSticky, setIsSticky] = useState(false);

  const validationSchema = yup.object({
    bid: yup
      .number()
      .required('Please insert a valid bid amount')
      .min(maximumBid + 50, `minumum bid is ${maximumBid + 50}`),
  });

  const formik = useFormik({
    initialValues: {
      bid: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      if (open) {
        sendBid();
        console.log('safas');
        fetch('/api/bids', {
          method: 'POST',
          body: JSON.stringify({ bid: values.bid, userId: 'badral', createdAt: new Date() }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setDialogsBid(formik.values.bid);
        resetForm();
        setOpen(false);

        setSecondDialog(true);
      } else {
        setOpen(true);
      }
    },
    validationSchema,
  });

  const { channel } = useChannel(chatId, 'auction-bids', (message) => {
    const maxBid = Number(message.data.bid);
    setBids((previousBids) => [message.data, ...previousBids]);
    setMaximumBid((previousMaxBid) => (previousMaxBid < maxBid ? maxBid : previousMaxBid));
  });

  const loadBids = async () => {
    const response = await fetch('/api/bids');
    const data = await response.json();
    setBids(data);
    if (!data.length) return;
    let maxBid = data[0].bid;
    for (let i = 0; i < data.length; i++) {
      if (data[i].bid > maxBid) {
        maxBid = data[i].bid;
      }
    }
    setMaximumBid(maxBid);
  };

  const sendBid = () => {
    channel.publish('auction-bids', { bid: formik.values.bid, userId: 'badral', createdAt: new Date() });
  };

  const loadProductDetail = async () => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    setOneProduct(data);
  };
  useEffect(() => {
    loadBids();
    loadProductDetail();
  }, []);

  if (!oneProduct) return <div>loading</div>;
  return (
    <form onSubmit={formik.handleSubmit} className={`max-w-[1240px] mx-auto w-full`}>
      <div className={`flex gap-24`}>
        <ProductDetailImages oneProduct={oneProduct} />
        <div className="flex flex-col gap-8 pb-12">
          <Bid
            formikSetFieldValue={formik.setFieldValue}
            formikTouched={formik.touched}
            oneProduct={oneProduct}
            formikErrors={formik.errors}
            sendBid={sendBid}
            bids={bids}
            open={open}
            setOpen={setOpen}
            formikValues={formik.values}
            formikHandleChange={formik.handleChange}
            maximumBid={maximumBid}
            isSticky={isSticky}
            setIsSticky={setIsSticky}
          />
          <Safity oneProduct={oneProduct} />
          <HelpCenter oneProduct={oneProduct} />
          {isSticky && (
            <BidSticky
              formikSetFieldValue={formik.setFieldValue}
              formikTouched={formik.touched}
              oneProduct={oneProduct}
              formikErrors={formik.errors}
              sendBid={sendBid}
              bids={bids}
              open={open}
              setOpen={setOpen}
              formikValues={formik.values}
              formikHandleChange={formik.handleChange}
              maximumBid={maximumBid}
              isSticky={isSticky}
              setIsSticky={setIsSticky}
            />
          )}
        </div>
      </div>
      {open && <div className="absolute inset-0 bg-slate-500 opacity-50"></div>}
      {open && <BidDialog bid={formik.values.bid} open={open} setOpen={setOpen} />}
      <PlacedBidDialog secondDialog={secondDialog} setSecondDialog={setSecondDialog} bid={dialogsBid} />
    </form>
  );
}
