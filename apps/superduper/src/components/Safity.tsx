'use client';

import { CreditCard, Search, UserRoundCheck } from 'lucide-react';
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
    <div id="satisfy" className="py-8 px-6 flex flex-col gap-5 max-w-[392px] w-full border-green-500 border-2 border-solid">
      <div className="text-green-300">Superduper төлбөрийн аюулгүй байдал</div>
      <div className="flex gap-2">
        <div className="text-[#919397]">
          <CreditCard />
        </div>
        <div className={`transition-all w-full ${showPaymentSafety ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
          <div className={`${showPaymentSafety && 'text-green-400'} hover:cursor-pointer`} onClick={showTextFirst}>
            Таны төлбөр аюулгүй
          </div>
          <div>Бид таны мөнгийг найдвартай хадгалж байгаа болно. Бид барааг хүргэснээс хойш 3 хоногийн дотор худалдагчид төлбөрийг шилжүүлдэг тул та объектоо шалгаж үзэх боломжтой.</div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="text-[#919397]">
          <Search />
        </div>
        <div className={`transition-all w-full ${showQualityChecked ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
          <div className={`${showQualityChecked && 'text-green-400'} hover:cursor-pointer`} onClick={showTextMiddle}>
            Бүх объектын чанарыг шалгасан
          </div>
          <div>СуперДуперын дотоод мэргэжилтнүүд дуудлага худалдаанд оруулсан бүх объектыг хянаж, баталгаажуулдаг. Иймд зөвхөн хамгийн онцгой объектууд СуперДупер дээр зарагдаж байгаа болно.</div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="text-[#919397]">
          <UserRoundCheck />
        </div>
        <div className={`transition-all w-full ${showSellerVerify ? 'h-[120px]' : 'h-[20px]'} overflow-hidden`}>
          <div className={`${showSellerVerify && 'text-green-400'} hover:cursor-pointer`} onClick={showTextLast}>
            Бүх худалдагч нар баталгаажсан
          </div>
          <div>
            Бид итгэмжлэгдсэн түншүүдийнхээ хамт худалдагчдаа сайтар шалгадаг. Энэ нь таныг хууль ёсны худалдагчаас өндөр чанартай бүтээгдэхүүн худалдаж авах боломжоор хангаж буй үйлчилгээ юм.
          </div>
        </div>
      </div>
    </div>
  );
};
