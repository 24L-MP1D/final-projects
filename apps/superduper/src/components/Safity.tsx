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
        Таны төлбөр аюулгүй
        </div>
        <div>Бид таны мөнгийг найдвартай хадгалж байгаа болно. Бид барааг хүргэснээс хойш 3 хоногийн дотор худалдагчид төлбөрийг шилжүүлдэг тул та объектоо шалгаж үзэх боломжтой.</div>
      </div>

      <div className={`transition-all w-full ${showQualityChecked ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
        <div className={`${showQualityChecked && 'text-green-400'} hover:cursor-pointer`} onClick={showTextMiddle}>
        Бүх объектын чанарыг шалгасан
        </div>
        <div>СуперДуперын дотоод мэргэжилтнүүд дуудлага худалдаанд оруулсан бүх объектыг хянаж, баталгаажуулдаг. Иймд зөвхөн хамгийн онцгой объектууд СуперДупер дээр зарагдаж байгаа болно.</div>
      </div>

      <div className={`transition-all w-full ${showSellerVerify ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
        <div className={`${showSellerVerify && 'text-green-400'} hover:cursor-pointer`} onClick={showTextLast}>
        Бүх худалдагч нар баталгаажсан
        </div>
        <div>
        Бид итгэмжлэгдсэн түншүүдийнхээ хамт худалдагчдаа сайтар шалгадаг. Энэ нь таныг хууль ёсны худалдагчаас өндөр чанартай бүтээгдэхүүн худалдаж авах боломжоор хангаж буй үйлчилгээ юм.
        </div>
      </div>

      <div>илүү ихийг мэдэх</div>
    </div>
  );
};
