'use client';

import { ProductType } from '@/components/productType';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [getFromLocal, setGetFromLocal] = useState<ProductType>();
  const [loadding, setLoading] = useState(false);

  const postToDatabase = async () => {
    try {
      if (getFromLocal) {
        setLoading(true);

        localStorage.setItem('addProduct', JSON.stringify(getFromLocal));

        setLoading(false);
        router.push('/client/addProducts/6');
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
    addProductObject.status = 'Pending';
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
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5  rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5  rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5 rounded-full border-2 border-[#00253e]">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
          </div>

          <div className="flex gap-5 relative left-[-50px] items-center">
            <div>Ангилал</div>
            <div>Дэлгэрэнгүй</div>
            <div>Зураг</div>
            <div className="ml-3">Логистик</div>
            <div className="ml-5">Хянан үзэх</div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#333] text-[48px] mb-16">Мэдээллийг хянан үзэх</div>
        <div>
          <div className="border-b-[1px] items-center py-3 flex justify-between">
            <div className="text-2xl ">Ангилал</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts'}>
              засварлах
            </Link>
          </div>
          <div className="text-center my-10 text-xl">Ангилал: {getFromLocal?.category}</div>
          <div className="border-b-[1px] mb-8 items-center py-3 flex justify-between">
            <div className="text-2xl">Дэлгэрэнгүй</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts/2'}>
              засварлах
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-xl items-center justify-center">
            <div className="text-center flex gap-4">
              <div>Бүтээгдэхүүний нэр:</div>
              <div>{getFromLocal?.productName}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Тухайн зүйлийн гарал үүслийн улс:</div>
              <div>{getFromLocal?.Country}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Нэмэлт мэдээлэл:</div>
              <div>{getFromLocal?.additionalInformation}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Гарын үсэг, шошго эсвэл тэмдэглэгээ:</div>
              <div>{getFromLocal?.signatures}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Гэмтэлтэй хэсэг:</div>
              <div>{getFromLocal?.damage}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Тухайн бараа сэргээгдсэн үү? Хэрэв тийм бол ямар хэмжээгээр?:</div>
              <div>{getFromLocal?.restored}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Төлсөн үнэ:</div>
              <div>{getFromLocal?.startBid}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Валют:</div>
              <div>{}</div>
            </div>
          </div>
          <div className="border-b-[1px] mt-6 items-center py-3 flex justify-between">
            <div className="text-2xl ">Зураг</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts/3'}>
              засварлах
            </Link>
          </div>
          <div className="flex gap-4 items-center justify-center my-10 text-xl">
            <div>Зураг</div>
            <div className="flex gap-1">
              {getFromLocal?.frontImage && <Image className="object-cover rounded-lg border" src={getFromLocal?.frontImage} alt="a" width={100} height={100} />}
              {getFromLocal?.backImage && <Image className="object-cover rounded-lg border" src={getFromLocal?.backImage} alt="a" width={100} height={100} />}
              {getFromLocal?.detailImage && <Image className="object-cover rounded-lg border" src={getFromLocal?.detailImage} alt="a" width={100} height={100} />}
              {getFromLocal?.signatureImage && <Image className="object-cover rounded-lg border" src={getFromLocal?.signatureImage} alt="a" width={100} height={100} />}
              {getFromLocal?.damageImage && <Image className="object-cover rounded-lg border" src={getFromLocal?.damageImage} alt="a" width={100} height={100} />}
              {getFromLocal?.additionalImage && <Image className="object-cover rounded-lg border" src={getFromLocal?.additionalImage} alt="a" width={100} height={100} />}
            </div>
          </div>
          <div className="border-b-[1px] mt-6 items-center py-3 flex justify-between">
            <div className="text-2xl ">Логистик</div>
            <Link className="text-2xl py-2 px-4 bg-slate-100 active:bg-red-200 border-[1px] hover:bg-red-500 rounded-lg" href={'/client/addProducts/4'}>
              засварлах
            </Link>
          </div>
          <div className="flex mt-6 flex-col gap-2 text-xl items-center justify-center">
            <div className="text-center flex gap-4">
              <div>Нэр:</div>
              <div>{getFromLocal?.firstName}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Овог:</div>
              <div>{getFromLocal?.lastName}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Улс:</div>
              <div>{getFromLocal?.Country}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Хот:</div>
              <div>{getFromLocal?.city}</div>
            </div>
            <div className="text-center flex gap-4">
              <div>Имэйл хаяг:</div>
              <div>{getFromLocal?.email}</div>
            </div>
          </div>
          <div className="flex gap-2 w-full justify-center fixed bottom-0 bg-[#ffffff] py-2 left-[50%] translate-x-[-50%]">
            <div>"Үргэлжлүүлэх" дээр дарж энэ алхамын явцаа хадгална уу</div>
            <Link className="bg-slate-300 text-center py-2 px-4 rounded-lg" href={'/client/addProducts/4'}>
              БУЦАХ
            </Link>
            <Button onClick={postToDatabase}>{loadding ? <Image className="animate-spin" src={'/images/spinner.svg'} height={50} width={50} alt="loading" /> : <div>ҮРГЭЛЖЛҮҮЛЭХ</div>}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
