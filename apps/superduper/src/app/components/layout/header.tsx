import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <div className="bg-cyan-200 container mx-auto h-20 flex items-center">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="w-[35px] h-[35px] bg-red-500 rounded-full text-center">Live</div>
          <div className="text-red-500">Auction</div>
          <Link href="/S">Category</Link>
          <div className="flex flex-1 items-center bg-white">
            <HiMiniMagnifyingGlass className="bg-white h-6 m-1" />
            <input placeholder="search.." className="px-2 w-full" />
          </div>
        </div>
        <div className="flex items-center gap-10 mx-4">
          <Link href="/Sell">Sell</Link>
          <Link href="/Help">Help</Link>
          <Link href="/Heart">
            <FaRegHeart />
          </Link>
          <Button className="bg-slate-500">Sign Up</Button>
        </div>
      </div>
    </div>
  );
}
