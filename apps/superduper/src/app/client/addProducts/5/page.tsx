'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
type Props = {
  Country: string;
  additionalInformation: string;
  backImage: string;
  category: string;
  city: string;
  countryOfOrigin: string;
  damage: string;
  detailImage: string;
  email: string;
  firstName: string;
  frontImage: string;
  lastName: string;
  productName: string;
  restored: string;
  signatures: string;
  startBid: number;
  Currency: string;
  additionalImage: string;
  damageImage: string;
  signatureImage: string;
};
export default function Page() {
  const [getFromLocal, setGetFromLocal] = useState<Props>();
  const postToDatabase = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          getFromLocal,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      console.log('data');
      alert('amjilttai nemegdlee');
      localStorage.removeItem('addProduct');
      setGetFromLocal(undefined);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
    setGetFromLocal(addProductObject);
  }, []);
  return (
    <>
      <div className="max-w-[50%] mx-auto mt-10 pb-28">
        <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
          <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
            <div className="p-0.5 border-2 border-[#00253e] rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
          </div>
          <div className="flex gap-10 justify-center items-center ">
            <div>Category</div>
            <div>Detail</div>
            <div>Photos</div>
            <div>Logistics</div>
            <div>Review</div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#333] text-[48px] mb-16">Review information</div>
        <div>
          <div className="border-b-[1px] items-center py-3 flex justify-between">
            <div className="text-2xl ">Category</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts'}>
              edit
            </Link>
          </div>
          <div className="text-center my-10 text-xl">Category: {getFromLocal?.category}</div>
          <div className="border-b-[1px] mb-8 items-center py-3 flex justify-between">
            <div className="text-2xl">Details</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts/2'}>
              edit
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-xl items-center justify-center">
            <div className="text-center flex gap-4">
              <div>Product Name:</div>
              <div>{getFromLocal?.productName}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Item's Country of Origin:</div>
              <div>{getFromLocal?.Country}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Additional information:</div>
              <div>{getFromLocal?.additionalInformation}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Signatures, Labels or Markings:</div>
              <div>{getFromLocal?.signatures}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Areas of Damage:</div>
              <div>{getFromLocal?.damage}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Has it been restored? If so, to what extent?:</div>
              <div>{getFromLocal?.restored}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Price Paid:</div>
              <div>{getFromLocal?.startBid}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Currency:</div>
              <div>{}</div>
            </div>
          </div>
          <div className="border-b-[1px] mt-6 items-center py-3 flex justify-between">
            <div className="text-2xl ">Images</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts/3'}>
              edit
            </Link>
          </div>
          <div className="flex gap-4 items-center justify-center my-10 text-xl">
            <div>Photos:</div>
            <div className="flex">
              {getFromLocal?.frontImage && <Image src={getFromLocal?.frontImage} alt="a" width={100} height={100} />}
              {getFromLocal?.backImage && <Image src={getFromLocal?.backImage} alt="a" width={100} height={100} />}
              {getFromLocal?.detailImage && <Image src={getFromLocal?.detailImage} alt="a" width={100} height={100} />}
              {getFromLocal?.signatureImage && <Image src={getFromLocal?.signatureImage} alt="a" width={100} height={100} />}
              {getFromLocal?.damageImage && <Image src={getFromLocal?.damageImage} alt="a" width={100} height={100} />}
              {getFromLocal?.additionalImage && <Image src={getFromLocal?.additionalImage} alt="a" width={100} height={100} />}
            </div>
          </div>
          <div className="border-b-[1px] mt-6 items-center py-3 flex justify-between">
            <div className="text-2xl ">Logistics</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts/4'}>
              edit
            </Link>
          </div>
          <div className="flex mt-6 flex-col gap-2 text-xl items-center justify-center">
            <div className="text-center flex gap-4">
              <div>Firstame:</div>
              <div>{getFromLocal?.firstName}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Lastname</div>
              <div>{getFromLocal?.lastName}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Country:</div>
              <div>{getFromLocal?.Country}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>City:</div>
              <div>{getFromLocal?.city}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Email address:</div>
              <div>{getFromLocal?.email}</div>
            </div>
          </div>
          <div className="flex gap-2 w-full justify-center fixed bottom-0 bg-[#ffffff] py-2 left-[50%] translate-x-[-50%]">
            <div>Click “continue” to save your progress for this step</div>
            <Link className="bg-slate-300 text-center py-2 px-4 rounded-lg" href={'/client/addProducts/4'}>
              BACK
            </Link>
            <Button onClick={postToDatabase}>SUBMIT</Button>
          </div>
        </div>
      </div>
    </>
  );
}
