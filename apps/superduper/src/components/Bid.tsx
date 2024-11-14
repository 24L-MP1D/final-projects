'use client';
import dayjs from 'dayjs';
import { FormikErrors, FormikTouched } from 'formik';
import { ChevronDown, ChevronUp, Clock, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BidType } from './bidType';
import { ProductType } from './productType';
import { Button } from './ui/button';
import { Input } from './ui/Input';

interface FormValues {
  bid: number;
}
type Props = {
  bids: BidType[];
  formikValues: FormValues;
  sendBid: () => void;
  formikTouched: FormikTouched<FormValues>;
  formikErrors: FormikErrors<FormValues>;
  formikHandleChange: (e: ChangeEvent) => void;
  oneProduct: ProductType;
  maximumBid: number;
  formikSetFieldValue: (name: string, value: number) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  isSticky: boolean;
  setIsSticky: (value: boolean) => void;
};
type DateType = {
  day: number;
  dateHours: number;
  dateMinuts: number;
  dateSecunds: number;
};
export const Bid = ({ bids, maximumBid, formikValues, isSticky, setIsSticky, open, setOpen, formikSetFieldValue, formikTouched, oneProduct, formikErrors, formikHandleChange }: Props) => {
  const [showDate, setShowDate] = useState<DateType>();
  const endDate = new Date(oneProduct.endDate).getTime();
  const [showAllBids, setShowAllBids] = useState(0);
  const sticky = useRef<HTMLDivElement | null>(null);
  const startDate = new Date(oneProduct.startDate).getTime();

  let betweenDate = endDate - new Date().getTime();

  useEffect(() => {
    const handleScroll = () => {
      if (sticky.current) {
        const { bottom } = sticky.current.getBoundingClientRect();
        setIsSticky(bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const timeInterval = setInterval(() => {
      if (new Date().getTime() >= startDate) {
        const time = {
          day: Math.floor(betweenDate / (1000 * 60 * 60 * 24)),
          dateHours: Math.floor((betweenDate % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
          dateMinuts: Math.floor((betweenDate % (60 * 60 * 1000)) / (60 * 1000)),
          dateSecunds: Math.floor((betweenDate % (60 * 1000)) / 1000),
        };

        if (betweenDate < 0) {
          clearInterval(timeInterval);
          setShowDate(undefined);
          return;
        }
        setShowDate(time);
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDate]);
  const bidId = (id: string) => {
    let shortId = '';
    for (let i = 0; i < id.length / 3; i++) {
      shortId = shortId + id[i];
    }
    const replacedId = shortId.replace(/\D/g, '');
    return replacedId;
  };
  return (
    <div className="max-w-[400px] w-full" ref={sticky}>
      <div className="p-6 bg-gradient-to-r text-center font-semibold text-lg rounded-t-lg shadow-lg">
        {new Date().getTime() <= endDate && new Date().getTime() >= startDate ? (
          <div className="mt-2 text-2xl font-extrabold">
            Дуусах хугацаа: {showDate?.day}өдөр {showDate?.dateHours}цаг {showDate?.dateMinuts}минут {showDate?.dateSecunds}секунд
          </div>
        ) : (
          <div className="text-blue-600 font-bold"> Эхлэх хугацаа {dayjs(startDate).format('YYYY.MM.DD')}</div>
        )}
      </div>
      <div className="border-2 border-t-2 border-blue-400  shadow-md">
        <div className="mt-3 py-8 px-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#333]">Одоогийн үнийн санал</div>
            <div className="font-bold text-3xl text-[#333]">{maximumBid ? maximumBid : oneProduct.startBid} ₮</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-4 px-4">
          <div className="flex gap-4">
            <div
              onClick={() => formikSetFieldValue('bid', Math.ceil(maximumBid ? maximumBid : oneProduct.startBid) + 5000)}
              className="py-1 px-4 flex-1 border-2 rounded-3xl text-center hover:bg-slate-50 hover:cursor-pointer shadow-md"
            >
              {Math.ceil(maximumBid ? maximumBid : oneProduct.startBid) + 5000}
            </div>
            <div
              onClick={() => formikSetFieldValue('bid', Math.ceil(maximumBid ? maximumBid : oneProduct.startBid) + 10000)}
              className="py-1 px-4 text-center flex-1 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer shadow-md"
            >
              {Math.ceil(maximumBid ? maximumBid : oneProduct.startBid) + 10000}
            </div>
          </div>

          {!(new Date().getTime() > endDate) ? (
            <label className="border-solid bg-[#f8f7f8] flex gap-1 items-center py-1 px-3 w-full shadow-sm">
              <div className="text-slate-500">₮</div>
              <Input
                id="bid"
                onChange={formikHandleChange}
                value={formikValues.bid > 0 ? formikValues.bid : ''}
                className="w-full p-2 bg-[#f8f7f8]"
                placeholder={`${maximumBid ? maximumBid + 5000 : oneProduct.startBid + 5000} эсвэл дээш`}
                type="number"
              />
            </label>
          ) : (
            <div>Үнийн санал оруулах хугацаа дууссан</div>
          )}
          {formikTouched.bid && formikErrors.bid && <p className="ml-8 text-red-500">{formikErrors.bid}</p>}
          {!(new Date().getTime() > endDate) && (
            <div className="flex gap-1 w-full">
              <Button type="submit" className="flex-1 hover:bg-blue-500 active:bg-blue-400 hover:text-white border-[1px] py-2 px-4 bg-white text-blue-500 text-center btn">
                Үнийн санал оруулах
              </Button>
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-2.5 border-b-2 border-slate-300 shadow-sm">
          <Link href={'#satisfy'} className="px-4 flex items-center gap-2 text-green-400">
            <div>
              <ShieldCheck />
            </div>
            <div>Хэрэглэгчийн аюулгүй байдал</div>
          </Link>
          <div className="px-4 flex items-center gap-2 text-[#919397]">
            <div>
              <Truck />
            </div>
            <div>Дэлхийн хаана ч хүргэнэ</div>
          </div>
          <div className="px-4 flex items-center gap-2 mb-6 text-[#919397]">
            <div>
              <Clock />
            </div>
            <div> Хаагдана: {dayjs(oneProduct.endDate).format(' YYYY-MM-DD  hh-mm')}</div>
          </div>
        </div>

        <div className="pt-8 px-4 flex flex-col gap-[40px]">
          <div className="overflow-y-scroll relative w-full max-h-80 flex flex-col gap-2">
            {bids.slice(0, 3).map((bid, index) => (
              <div key={bid._id} className="flex justify-between items-center border-b border-solid border-slate-200 shadow-sm">
                <div>Дуудлага худалдаанд оролцогч {bidId(bid._id)}</div>
                <div className="p-2">{bid.bid} ₮</div>
                <div>{dayjs(bid.createdAt).format('YYYY.MM.DD')}</div>
              </div>
            ))}
          </div>

          {bids.length > 3 && (
            <label className="mb-2 hover:cursor-pointer flex justify-between">
              <div> Бүх үнийн саналыг харах({bids.length - 3})</div>
              <div>{showAllBids == 0 ? <ChevronDown onClick={() => setShowAllBids(bids.length)} /> : <ChevronUp onClick={() => setShowAllBids(0)} />}</div>
            </label>
          )}
          <div className="overflow-y-scroll relative w-full max-h-80 flex flex-col gap-2">
            {bids.slice(3, showAllBids).map((bid, index) => (
              <div key={bid._id} className="flex justify-between items-center border-b border-solid border-slate-200 shadow-sm">
                <div>оролцогч {bidId(bid._id)}</div>
                <div className="p-2">{bid.bid} ₮</div>
                <div>{dayjs(bid.createdAt).format('YYYY.MM.DD')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
