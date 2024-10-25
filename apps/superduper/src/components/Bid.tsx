'use client';
import * as Ably from 'ably';
import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { ProductType } from './productType';
import { Button } from './ui/button';
import { Input } from './ui/Input';
interface FormValues {
  bid: number;
}
type Props = {
  bids: Ably.Message[];
  formikValues: FormValues;
  sendBid: () => void;
  formikTouched: FormikTouched<FormValues>;
  formikErrors: FormikErrors<FormValues>;
  formikHandleChange: (e: ChangeEvent) => void;
  oneProduct: ProductType;
  maximumBid: number;
};
type DateType = {
  day: number;
  dateHours: number;
  dateMinuts: number;
  dateSecunds: number;
};
export const Bid = ({ bids, maximumBid, formikValues, formikTouched, oneProduct, formikErrors, formikHandleChange }: Props) => {
  const [showDate, setShowDate] = useState<DateType>();
  const endDate = new Date(oneProduct.endDate).getTime();
  const startDate = new Date().getTime();
  let betweenDate = endDate - startDate;

  useEffect(() => {
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

    return () => clearInterval(timeInterval);
  }, [showDate]);
  return (
    <div>
      <div>
        Closed in {showDate?.day}d {showDate?.dateHours}h {showDate?.dateMinuts}m {showDate?.dateSecunds}s
      </div>
      <div className="border-l-2 border-b-2 border-slate-300">
        <div className="mt-3 border-t-2 border-blue-600 py-8 px-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm">Current bid</div>
            <div className="font-bold text-3xl">€ {maximumBid}</div>
            <div className="text-sm">Reserve price not met</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-8 px-4">
          <div className="flex gap-4">
            <div className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">3000</div>
            <div className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">3500</div>
            <div className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">4000</div>
          </div>
          <label className="border-solid bg-[#f8f7f8] flex gap-1 items-center py-1 px-3 w-full">
            <div className="text-slate-500">€</div>
            <Input id="bid" onChange={formikHandleChange} value={formikValues.bid > 0 ? formikValues.bid : ''} className="w-full p-2 bg-[#f8f7f8]" placeholder="3,350 or up" type="number" />
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
          <div className="flex justify-between">
            <div>Bidder 0835</div>
            <div>1 day ago</div>
            <div>€3,150</div>
          </div>
          <div className="mb-2">See all bids (7)</div>
          <div className="overflow-y-scroll w-full max-h-80 flex flex-col gap-2">
            {bids.map((bid) => (
              <div className="bg-slate-500 p-2" key={bid.id}>
                {bid.data}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
