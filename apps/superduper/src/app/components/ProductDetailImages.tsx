import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const mockData = [
  {
    productName: 'Hermès - Kelly Mini - Handbag',
    productImage: ['/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg'],
    productNo: 88884317,
  },
];

export const ProductDetailImages = () => {
  const [imageCount, setImageCount] = useState(3);
  const imageSlice = () => {
    if (imageCount == 3) return setImageCount(10);
    setImageCount(3);
  };
  return (
    <div className="max-w-[750px] mx-auto w-full">
      <div>{mockData[0].productName}</div>
      <div>
        <div>NO. {mockData[0].productNo}</div>
        <div className="w-full grid gap-2 grid-cols-2">
          {mockData[0].productImage.slice(0, imageCount).map((image, index) => (
            <div className={`border-solid border-[1px] relative cursor-pointer ${index == 2 ? 'col-span-2' : ''}`} key={image + index}>
              <Image src={image} alt="a" width={1000} height={1000} className={`object-cover shadow drop-shadow-xl`} />
              {index == 2 && (
                <div onClick={imageSlice} className="flex gap-1 right-2 bottom-2 p-4 absolute text-[#03f] bg-slate-200 hover:cursor-pointer hover:bg-slate-300 active:bg-slate-200">
                  <div>{imageCount === 3 ? 'see all photos (16)' : 'see fewer photos'}</div>
                  <div>{imageCount === 3 ? <ChevronDown /> : <ChevronUp />}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
