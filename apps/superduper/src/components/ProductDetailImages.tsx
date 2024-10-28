import Image from 'next/image';
import { ProductType } from './productType';

export const ProductDetailImages = ({ oneProduct }: { oneProduct: ProductType }) => {
  return (
    <div className="max-w-[750px] mx-auto w-full">
      <div>
        <div className="text-[40px]">{oneProduct.productName}</div>
        <div>NO.14214</div>
        <div className="flex gap-3">
          <div className="w-full">
            <Image className="object-cover rounded-lg w-full shadow drop-shadow-xl" src={oneProduct.frontImage} alt="front-image" width={1000} height={1000} />
          </div>
          <div className="flex flex-col gap-3">
            <Image className="object-cover w-[150px] h-[150px] rounded-lg shadow drop-shadow-xl" src={oneProduct.backImage} alt="front-image" width={1000} height={1000} />

            <Image className="object-cover w-[150px] h-[150px] rounded-lg shadow aspect-video drop-shadow-xl" src={oneProduct.detailImage} alt="front-image" width={1000} height={1000} />

            {oneProduct.damageImage && (
              <div className="border-solid border-[1px] flex-1 cursor-pointer">
                <Image className="object-cover w-[150px] h-[150px] shadow rounded-lg  drop-shadow-xl" src={oneProduct.damageImage} alt="front-image" width={1000} height={1000} />
              </div>
            )}
            {oneProduct.signatureImage && (
              <div className="border-solid border-[1px] flex-1 cursor-pointer">
                <Image className="object-cover  w-[150px] h-[150px] shadow rounded-lg drop-shadow-xl" src={oneProduct.signatureImage} alt="front-image" width={1000} height={1000} />
              </div>
            )}
          </div>
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
