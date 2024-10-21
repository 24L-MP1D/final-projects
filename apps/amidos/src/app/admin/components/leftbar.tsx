'use client';

import { CalendarArrowDown, Handshake, LayoutDashboard, Settings, SquareMenu } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const LeftBar = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');

  return (
    <div className="flex flex-col gap-4 text-base  bg-[#FFFFFF] shadow-xl min-h-screen">
      <Link href={'/admin?select=Хяналтын самбар'} className={`flex py-2 px-4 gap-2 hover:cursor-pointer ${select === 'Хяналтын самбар' && 'bg-[#3a3a8d] text-white'}`}>
        <div>
          <LayoutDashboard />
        </div>
        <div className={`text-[#121316] text-nowrap ${select === 'Хяналтын самбар' && 'text-white'}`}>Хяналтын самбар</div>
      </Link>
      <Link href={'/admin/order?select=Захиaлга'} className={`flex py-2 px-4 gap-2 hover:cursor-pointer ${select === 'Захиaлга' && 'bg-[#3a3a8d] text-white'}`}>
        <div>
          <CalendarArrowDown />
        </div>
        <div className={`text-[#121316] text-nowrap ${select === 'Захиaлга' && 'text-white'}`}>Захиaлга</div>
      </Link>
      <Link href={'/admin/table?select=Ширээ'} className={`flex py-2 px-4 gap-2 hover:cursor-pointer ${select === 'Ширээ' && 'bg-[#3a3a8d] text-white'}`}>
        <div>
          <Handshake />
        </div>
        <div className={`text-[#121316] text-nowrap ${select === 'Ширээ' && 'text-white'}`}>Ширээ</div>
      </Link>

      <Link href={`/admin/products?select=Бүтээгдэхүүн`} className={`flex py-2 px-4 gap-2 hover:cursor-pointer ${select === 'Бүтээгдэхүүн' && 'bg-[#3a3a8d] text-white'}`}>
        <div>
          <SquareMenu />
        </div>
        <div className={`text-[#121316] text-nowrap ${select === 'Бүтээгдэхүүн' && 'text-white'}`}>Бүтээгдэхүүн</div>
      </Link>

      <Link href={'/admin/settings?select=Тохиргоо'} className={`flex py-2 px-4 gap-2 hover:cursor-pointer ${select === 'Тохиргоо' && 'bg-[#3a3a8d] text-white'}`}>
        <div>
          <Settings />
        </div>
        <div className={`text-[#121316] text-nowrap ${select === 'Тохиргоо' && 'text-white'}`}>Тохиргоо</div>
      </Link>
    </div>
  );
};
