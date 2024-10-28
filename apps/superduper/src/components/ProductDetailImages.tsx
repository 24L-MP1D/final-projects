import Image from 'next/image';
import { useState } from 'react';
import { ProductType } from './productType';

const mockData = [
  {
    productName: 'Hermès - Kelly Mini - Handbag',
    productImage: ['/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg'],
    productNo: 88884317,
  },
];

export const ProductDetailImages = ({ oneProduct }: { oneProduct: ProductType }) => {
  const [imageCount, setImageCount] = useState(3);
  const imageSlice = () => {
    if (imageCount == 3) return setImageCount(10);
    setImageCount(3);
  };

  return (
    <div className="max-w-[750px] mx-auto w-full">
      <div className="text-[40px]">{oneProduct.productName}</div>
      <div>
        <div>NO. {mockData[0].productNo}</div>
        <div className="w-full grid gap-2 grid-cols-2">
          <div className="border-solid border-[1px]  cursor-pointer">
            <Image className="object-cover shadow drop-shadow-xl" src={oneProduct.frontImage} alt="front-image" width={1000} height={1000} />
          </div>
          <div className="border-solid border-[1px]  cursor-pointer ">
            <Image className="object-cover shadow drop-shadow-xl" src={oneProduct.backImage} alt="front-image" width={1000} height={1000} />
          </div>
          <div className="border-solid border-[1px]  cursor-pointer col-span-2">
            <Image className="object-cover shadow drop-shadow-xl" src={oneProduct.detailImage} alt="front-image" width={1000} height={1000} />
          </div>
          {oneProduct.damageImage && (
            <div className="border-solid border-[1px]  cursor-pointer">
              <Image className="object-cover shadow drop-shadow-xl" src={oneProduct.damageImage} alt="front-image" width={1000} height={1000} />
            </div>
          )}
          {oneProduct.signatureImage && (
            <div className="border-solid border-[1px]  cursor-pointer">
              <Image className="object-cover shadow drop-shadow-xl" src={oneProduct.signatureImage} alt="front-image" width={1000} height={1000} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 px-6 py-6">
        <div className="border-b-2 py-6 grid grid-cols-2 text-[#000000] gap-5 text-xl items-center justify-center">
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Product Name</div>
            <div>{oneProduct?.productName}</div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Item's Country of Origin</div>
            <div>{oneProduct?.Country}</div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Additional information</div>
            <div>{oneProduct?.additionalInformation}</div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Signatures</div>
            <div>{oneProduct?.signatures}</div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Areas of Damage</div>
            <div>{oneProduct?.damage}</div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Has it been restored? If so, to what extent</div>
            <div>{oneProduct?.restored}</div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Start Price</div>
            <div>{oneProduct?.startBid}</div>
          </div>
          {oneProduct.Currency && (
            <div className="flex gap-2 flex-col">
              <div className="text-[#565B60] text-sm">Currency</div>
              <div>{oneProduct.Currency}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
