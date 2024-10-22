import { ChevronDown, Heart } from 'lucide-react';

export default function Header() {
  return (
    <div className="pt-[8px]">
      <div className=" font-mono w-auto h-[58px] mx-[36px] flex gap-2 items-center p-0">
        <div className="bg-blue-700 w-[179px] h-[52px] justify-start"></div>
        <div className="font-mono text-sm  left-4">Categories</div>
        <ChevronDown className="w-4 h-4 text-blue-700  left-4" />
        <div className="search-container  left-[35px] ">
          <input type="text" className="search-input w-[581px] h-[52px] h-p-0 border-gray-700 bg-gray-400 rounded-md px-4 py-2" placeholder="Search..." />
          {/* <Search className="absolute top-2" /> */}
        </div>
        <div className="flex gap-4 place-items-center w-[268.56px] h-[68px]  left-[35px] mx-0">
          <a href="/sell" className="text-sm">
            Sell
          </a>
          <a href="/help" className="text-sm">
            Help
          </a>
          <Heart className="w-[36px] h-[68px] " />
          <button className="bg-blue-700 text-white w-[87.31px] h-[52px] text-sm">Sign in</button>
        </div>
      </div>
    </div>
  );
}
