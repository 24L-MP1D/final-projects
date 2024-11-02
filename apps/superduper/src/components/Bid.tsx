'use client';
import dayjs from 'dayjs';
import { FormikErrors, FormikTouched } from 'formik';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  const startDate = new Date().getTime();
  let betweenDate = endDate - startDate;

  useEffect(() => {
    const handleScroll = () => {
      if (sticky.current) {
        const { bottom } = sticky.current.getBoundingClientRect();
        setIsSticky(bottom < 0);
        console.log(bottom);
      }
    };
    window.addEventListener('scroll', handleScroll);
    const timeInterval = setInterval(() => {
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
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDate]);

  return (
    <div className="max-w-[500px] w-full" ref={sticky}>
      <div>
        Closed in {showDate?.day}d {showDate?.dateHours}h {showDate?.dateMinuts}m {showDate?.dateSecunds}s
      </div>
      <div className="border-2 border-t-2 border-t-blue-600 border-b-2 border-slate-300">
        <div className="mt-3  py-8 px-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm">Current bid</div>
            <div className="font-bold text-3xl">€ {maximumBid}</div>
            <div className="text-sm">Reserve price not met</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-8 px-4">
          <div className="flex gap-4">
            <div onClick={() => formikSetFieldValue('bid', Math.ceil(maximumBid) + 500)} className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">
              {Math.ceil(maximumBid) + 500}
            </div>
            <div onClick={() => formikSetFieldValue('bid', Math.ceil(maximumBid) + 1000)} className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">
              {Math.ceil(maximumBid) + 1000}
            </div>
            <div onClick={() => formikSetFieldValue('bid', Math.ceil(maximumBid) + 1500)} className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">
              {Math.ceil(maximumBid) + 1500}
            </div>
          </div>
          <label className="border-solid bg-[#f8f7f8] flex gap-1 items-center py-1 px-3 w-full">
            <div className="text-slate-500">€</div>
            <Input
              id="bid"
              onChange={formikHandleChange}
              value={formikValues.bid > 0 ? formikValues.bid : ''}
              className="w-full p-2 bg-[#f8f7f8]"
              placeholder={`${maximumBid ? maximumBid : oneProduct.startBid} or up`}
              type="number"
            />
          </label>
          {formikTouched.bid && formikErrors.bid && <p className="ml-8 text-red-500">{formikErrors.bid}</p>}
          <div className="flex gap-1 w-full">
            <Button type="submit" className="flex-1 border-[1px] py-2 px-4 bg-white text-blue-500 text-center">
              Place bid
            </Button>
            <Button type="submit" className="flex-1 border-[1px] py-2 px-4 bg-blue-600 text-white text-center">
              Set max bid
            </Button>
          </div>
        </div>
        <div className="mt-8 px-4">Buy confidently with our Buyer Protection</div>
        <div className="px-4 py-8 flex flex-col gap-2.5 border-b-2 border-slate-300">
          <div>€100 from France, arrives in 3-22 days</div>
          <div>Buyer Protection fee: 9% + € 3</div>
          <div>Closes: Saturday 18:01</div>
        </div>
        <div className="pt-8 px-4 flex flex-col gap-[40px]">
          <div className="overflow-y-scroll relative w-full max-h-80 flex flex-col gap-2">
            {bids.slice(0, 3).map((bid, index) => (
              <div key={bid._id} className="flex justify-between items-center">
                <div>{bid.userId}</div>
                <div className="p-2">{bid.bid}</div>
                <div>{dayjs(bid.createdAt).format('YYYY-MM-DD')}</div>
              </div>
            ))}
          </div>

          <label className="mb-2 hover:cursor-pointer flex justify-between">
            {bids.length > 3 && <div> See all bids({bids.length - 3})</div>}
            <div>{showAllBids == 0 ? <ChevronDown onClick={() => setShowAllBids(bids.length)} /> : <ChevronUp onClick={() => setShowAllBids(0)} />}</div>
          </label>
          <div className="overflow-y-scroll relative w-full max-h-80 flex flex-col gap-2">
            {bids.slice(3, showAllBids).map((bid, index) => (
              <div key={bid._id} className="flex justify-between items-center">
                <div>{bid.userId}</div>
                <div className="p-2">{bid.bid}</div>
                <div>{dayjs(bid.createdAt).format('YYYY-MM-DD')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
