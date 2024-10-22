'use client';

import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

export default function LeftBar() {
  return (
    <div className="w-[300px] h-[976px] bg-slate-200 pt-6 flex flex-col gap-4 text-[#121316] p-10 relative">
      <Button variant="def2" className="flex items-center justify-start h-10 hover:bg-[#ECEDF0] w-[222px]">
        <div className="w-14 flex justify-center items-center ">{/* <MdWindow className="w-6 h-6" /> */}</div>
        <div className="text-base font-semibold">Хяналтын самбар</div>
      </Button>
      <Link href="/order">
        <Button variant="def2" className="flex items-center justify-start h-10 hover:bg-[#ECEDF0] w-[222px]">
          <div className="w-14 flex justify-center items-center ">{/* <FaRegClipboard className="w-6 h-6" /> */}</div>
          <div className="text-base font-semibold">Захиалга</div>
        </Button>
      </Link>

      <Link href="/income">
        <Button variant="def2" className="flex items-center justify-start h-10 hover:bg-[#ECEDF0] w-[222px]">
          <div className="w-14 flex justify-center items-center ">{/* <ImPriceTags className="w-6 h-6" /> */}</div>
          <div className="text-base font-semibold">Ширээ</div>
        </Button>
      </Link>

      <Link href="/products">
        <Button variant="def2" className="flex items-center justify-start h-10 hover:bg-[#ECEDF0] w-[222px]">
          <div className="w-14 flex justify-center items-center ">{/* <RiListView className="w-6 h-6" /> */}</div>
          <div className="text-base font-semibold">Бүтээгдэхүүн</div>
        </Button>
      </Link>
      <Link href="/settings">
        <Button variant="def2" className="flex items-center justify-start h-10 hover:bg-[#ECEDF0] w-[222px]">
          <div className="w-14 flex justify-center items-center ">{/* <IoMdSettings className="w-6 h-6" /> */}</div>
          <div className="text-base font-semibold">Тохиргоо</div>
        </Button>
      </Link>
    </div>
  );
}
