'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const mockData = [
  {
    productName: 'Hermès - Kelly Mini - Handbag',
    productImage: ['/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg'],
    productNo: 88884317,
  },
];

export default function App() {
  const showTextFirst = () => {
    if (showPaymentSafety) return setShowPaymentSafety(false);
    setShowPaymentSafety(true);
  };
  const showTextMiddle = () => {
    if (showQualityChecked) return setShowQualityChecked(false);
    setShowQualityChecked(true);
  };
  const showTextLast = () => {
    if (showSellerVerify) return setShowSellerVerify(false);
    setShowSellerVerify(true);
  };
  const [showPaymentSafety, setShowPaymentSafety] = useState(false);
  const [showQualityChecked, setShowQualityChecked] = useState(false);
  const [showSellerVerify, setShowSellerVerify] = useState(false);
  return (
    <div className="max-w-[1240px] mx-auto w-full">
      <div className="flex gap-24">
        <div className="max-w-[750px] mx-auto w-full">
          <div>{mockData[0].productName}</div>
          <div>
            <div>NO. {mockData[0].productNo}</div>
            <div className="w-full grid gap-2 grid-cols-2">
              {mockData[0].productImage.map((image, index) => (
                <div className={`border-solid border-[1px] ${index == 2 ? 'col-span-2' : ''}`} key={image + index}>
                  <Image src={image} alt="a" width={1000} height={1000} className={`object-cover shadow drop-shadow-xl`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <div>Closes in 4d 4h 04m 35s</div>
            <div className="mt-3 border-t-2 border-blue-600 py-8 px-6">
              <div className="flex flex-col gap-2">
                <div className="text-sm">Current bid</div>
                <div className="font-bold text-3xl">€ 18,500</div>
                <div className="text-sm">Reserve price not met</div>
              </div>
            </div>
          </div>
          <div className="py-8 px-6 flex flex-col gap-5 max-w-[392px] w-full border-green-500 border-2 border-solid">
            <div className={`transition-all w-full ${showPaymentSafety ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
              <div className={`${showPaymentSafety && 'text-green-400'} hover:cursor-pointer`} onClick={showTextFirst}>
                Your payment is safe
              </div>
              <div>We ensure your money is kept safe. We only release payment to the seller up to 3 days after delivery so that you have had the time to inspect your object.</div>
            </div>

            <div className={`transition-all w-full ${showQualityChecked ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
              <div className={`${showQualityChecked && 'text-green-400'} hover:cursor-pointer`} onClick={showTextMiddle}>
                All objects are quality checked
              </div>
              <div>Catawiki’s in-house experts review and approve all objects in auction. This ensures only the most special objects are sold on Catawiki.</div>
            </div>

            <div className={`transition-all w-full ${showSellerVerify ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
              <div className={`${showSellerVerify && 'text-green-400'} hover:cursor-pointer`} onClick={showTextLast}>
                All sellers are verified
              </div>
              <div>
                We, along with our trusted partners, thoroughly verify our sellers. This helps ensure you are buying from only legitimate sellers who are committed to delivering high quality objects
                and excellent service.
              </div>
            </div>

            <div>learn more</div>
          </div>

          <div className="flex flex-col gap-4 border-2 border-solid border-slate-500 px-4 py-8">
            <div className="font-bold text-2xl">Any questions?</div>
            <Link className="underline" href={'/helpCenter'}>
              Get in touch via our Help Centre
            </Link>
            <div className="font-bold text-2xl">Share this object with your friends</div>
            <div className="flex gap-2">
              <Link className="p-3 border-2 border-slate-400" href={''}></Link>
              <Link className="p-3 border-2 border-slate-400" href={''}></Link>
              <Link className="p-3 border-2 border-slate-400" href={''}></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
