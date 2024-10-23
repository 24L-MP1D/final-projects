'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

export default function Header() {
  const router = useRouter();
  return (
    <div className=" mx-auto w-[1160px]">
      <div className="flex justify-between ">
        <div className="w-48 flex justify-center">
          <Image width={70} height={65} alt="logo" src={'/Logo.png'} onClick={() => router.push(`/`)} />
        </div>
        <div className="flex h-full rounded-lg items-center w-[740px] border group focus-within:border-slate-700 pl-3 mt-4 p-1 gap-3 ">
          <Search width={22} height={22} />
          <Input className="border-none focus-visible:ring-0" placeholder="What's you gonna eat?" />
        </div>
        <div className="flex flex-row gap-1 items-center">
          <span>
            <button className="border border-gray-600 rounded-full font-bold leading-4 px-4  py-2 " onClick={() => router.push(`/login`)}>
              Log In
            </button>
          </span>
          <span>
            <button className="border bg-red-600 text-white rounded-full leading-4 px-4  py-2" onClick={() => router.push(`/subscribe`)}>
              Subscribe
            </button>
          </span>
        </div>
      </div>
      <div className="flex gap-5 h-12">
        <button className="font-bold">Want to Cook</button>
        <button className="font-bold">Recipes</button>
        <button className="font-bold">Ingredients</button>
        <button className="font-bold">Ocassions</button>
        <button className="font-bold">About</button>
      </div>
    </div>
  );
}
