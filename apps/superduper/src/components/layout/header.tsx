import { ChevronDown, Heart } from 'lucide-react';

export default function Header() {
  return (
    <div className="pt-[8px]">
      <div className="flex gap-[20px] font-mono w-auto h-[58px] mx-[36px] items-center p-0">
        <div className="bg-blue-700 w-[179px] h-[52px] justify-start"></div>
        <div className="flex items-center font-mono text-sm  left-4">Categories<ChevronDown className="w-[15px] h-[15px] text-blue-700  left-4" /></div>
        <div className="search-container flex  justify-center text-center">
          <input type="text" className="search-input w-[581px] h-[52px] h-p-0  bg-gray-200 rounded-md px-4 py-2 text-xs" placeholder="Search for brand, model, artist... " />
        </div>
        <div className="flex gap-[30px] place-items-center w-[268.56px] h-[68px]  relative left-[45px] mx-0 place-content-center">
          <a href="/sell" className="text-sm">
            Sell
          </a>
          <a href="/help" className="text-sm">
            Help
          </a>
          <Heart className="w-[25px] h-[30px] text-blue-700" />
          <button className="bg-blue-700 text-white w-[87.31px] h-[52px] text-sm">Sign in</button>
        </div>
      </div>
    </div>
  );
}
