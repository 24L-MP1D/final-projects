'use client';

import { useState } from 'react';
import { ProductType } from './productType';

export const Safity = ({ oneProduct }: { oneProduct: ProductType }) => {
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
          We, along with our trusted partners, thoroughly verify our sellers. This helps ensure you are buying from only legitimate sellers who are committed to delivering high quality objects and
          excellent service.
        </div>
      </div>

      <div>learn more</div>
    </div>
  );
};
