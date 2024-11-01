import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <div className="bg-pink-100 container mx-auto h-28 flex items-center max-w-[1280px]">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="w-[55px] h-[55px] bg-blue-500 rounded-full text-red-500 flex items-center justify-center font-extrabold text-[24px]">SD</div>
          <div className="text-blue-500">
            <p className="font-extrabold">SuperDuper</p>
            <div className="bg-slate-300 h-1 w-full"></div>
            <p className="font-extrabold">Auction</p>
          </div>
          <Link href='/client/category' className="ml-10 mr-8">
            Category
          </Link>
          <div className="flex flex-1 items-center bg-white">
            <HiMiniMagnifyingGlass className="bg-white h-6 m-1 text-[24px] ml-3" />
            <input placeholder="Search.." className="px-2 w-full p-3" />
          </div>
        </div>
        <div className="flex items-center gap-10 mx-6">
          <Link href="/Sell">Sell</Link>
          <Link href="/Help">Help</Link>
          <Link href="/Heart">
            <FaRegHeart className="text-[24px] text-blue-500" />
          </Link>
          <Button className="bg-blue-500">Sign Up</Button>
        </div>
      </div>
    </div>
  );
}
