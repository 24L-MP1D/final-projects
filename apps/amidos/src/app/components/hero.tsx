'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from './header';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <div className="h-[100vh] w-full aspect-video relative overflow-hidden flex fex-col">
      <Image src="/restaurant.jpeg" alt="Image of restaurant" width={1440} height={820} className="h-full w-full object-cover" />
      <div className="absolute top-0 right-0 left-0 flex justify-center">
        <Header />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-md pt-16 pb-20 px-20 flex flex-col text-center gap-10">
          <div className="flex flex-col text-center gap-7">
            <div className="text-white text-6xl font-bold">AMIDO'S</div>
            <label className="input input-bordered flex items-center gap-2 bg-white px-2 rounded-lg">
              <input type="text" className="grow p-2 " placeholder="Хайлт.." />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </label>
          </div>
          <div className="flex gap-2">
            <Link href="/tablebook">
              <Button className="bg-white hover:bg-slate-300 text-[#52071B] text-sm">ШИРЭЭ ЗАХИАЛГА</Button>
            </Link>
            <Link href="/delivery">
              <Button className="bg-[#C41D4A] hover:bg-[#8B0000]">ХООЛ ХҮРГЭЛТ</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
