import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { SignUp } from '../signUp';

export default function Header() {
  return (
    <div className="container mx-auto h-28 flex items-center max-w-[1280px]">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="w-[55px] h-[55px] bg-blue-500 rounded-full text-red-500 flex items-center justify-center font-extrabold text-[24px]">SD</div>
          <div className="text-blue-500">
            <p className="font-extrabold">SuperDuper</p>
            <div className="bg-slate-300 h-1 w-full"></div>
            <p className="font-extrabold">Auction</p>
          </div>
          <Link href="/S" className="ml-10 mr-8">
            Category
          </Link>
          <div className="flex flex-1 items-center bg-slate-200">
            <HiMiniMagnifyingGlass className="h-6 m-1 text-[24px] ml-3" />
            <input placeholder="Search.." className="px-2 outline-none w-full p-3 bg-slate-200 border-none" />
          </div>
        </div>
        <div className="flex items-center gap-10 mx-6">
          <Link href="/Sell">Sell</Link>
          <Link href="/Help">Help</Link>
          <Link href="/Heart">
            <FaRegHeart className="text-[24px] text-blue-500" />
          </Link>
          <SignUp />
        </div>
      </div>
    </div>
  );
}
