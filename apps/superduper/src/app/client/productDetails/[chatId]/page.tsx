'use client';

import { useAuthStore } from '@/app/components/auth/useAuthStore';
import { ProductItem } from '@/app/components/productItem';
import { Bid } from '@/components/Bid';
import { BidDialog } from '@/components/bidDialog';
import { BidType } from '@/components/bidType';
import { HelpCenter } from '@/components/helpCenter';
import { PlacedBidDialog } from '@/components/placedBidDialog';
import { ProductDetailImages } from '@/components/ProductDetailImages';
import { ProductType } from '@/components/productType';
import { Safity } from '@/components/Safity';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { RealtimeNotif } from '../../layout';
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
  const currentUser = useAuthStore((state) => state.currentUser);
  const value = useContext(RealtimeNotif);
  const [isBid, setIsBid] = useState(false);
  const [bids, setBids] = useState<BidType[]>([]);

  const [dialogsBid, setDialogsBid] = useState(0);

  const [oneProduct, setOneProduct] = useState<ProductType>();

  const [maximumBid, setMaximumBid] = useState(0);

  const [open, setOpen] = useState(false);

  const [isClick, setClick] = useState(false);

  const [secondDialog, setSecondDialog] = useState(false);

  const [isSticky, setIsSticky] = useState(false);

  const [products, setProducts] = useState<ProductType[]>([]);
  const validationSchema = yup.object({
    bid: yup
      .number()
      .required('Please insert a valid bid amount')
      .min(maximumBid + 500, `minumum bid is ${maximumBid + 500} ₮`),
  });

  const formik = useFormik({
    initialValues: {
      bid: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      const cookie = Cookies.get('token');
      if (!cookie) {
        formik.setFieldValue('bid', 0);
        return alert('first you must sign-in');
      }
      if (open) {
        sendBid();
        console.log('safas');
        fetch('/api/bids', {
          method: 'POST',
          body: JSON.stringify({ bid: values.bid, productId: chatId, userId: currentUser?._id, email: currentUser?.email, createdAt: new Date() }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        loadBids();
        setDialogsBid(formik.values.bid);
        resetForm();
        setOpen(false);

        const audio = new Audio('/images/bidaudio.mp3');

        audio.play();
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 5000);
        setSecondDialog(true);
      } else {
        setOpen(true);
      }
    },
    validationSchema,
  });

  const { channel } = useChannel(chatId, 'auction-bids', (message) => {
    setIsBid(message.data.bid);
  });

  const loadBids = async () => {
    const response = await fetch('/api/bids', {
      method: 'PUT',
      body: JSON.stringify({
        productId: chatId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
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
    channel.publish('auction-bids', { bid: !isBid });
  };

  const loadProductDetail = async () => {
    const response = await fetch(`/api/products/${chatId}`);
    const data = await response.json();
    setOneProduct(data);
  };

  const handleFavourite = (productId: string) => {
    let result: string[] = [];
    if (value?.favourite) result = [...value?.favourite];
    if (result.find((id) => id === productId)) {
      result = result.filter((id) => id !== productId);
      setClick(false);
    } else {
      result.push(productId);
      setClick(true);
    }

    localStorage.setItem('favourites', JSON.stringify(result));

    value?.setFavourite(result);
  };
  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        body: JSON.stringify({
          searchValue: value?.searchValue,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadBids();
    loadProductDetail();
    loadProducts();
    const storage = localStorage.getItem('favourites');
    if (storage) value?.setFavourite(JSON.parse(storage));
  }, [isBid, value?.searchValue]);

  if (!oneProduct) return <div>Ачааллаж байна</div>;

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
          {/* {isSticky && (
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
          )} */}
        </div>
      </div>
      {open && <div className="absolute inset-0 bg-slate-500 opacity-50"></div>}
      {open && <BidDialog bid={formik.values.bid} open={open} setOpen={setOpen} />}
      <PlacedBidDialog secondDialog={secondDialog} setSecondDialog={setSecondDialog} bid={dialogsBid} />

      <div className="grid grid-cols-3 gap-10 w-full">
        {products.slice(0, 20).map((product) => (
          <ProductItem isClick={isClick} product={product} favourite={value?.favourite || []} key={product._id} onClickFavourite={() => handleFavourite(product._id)} />
        ))}
      </div>
    </form>
  );
}
