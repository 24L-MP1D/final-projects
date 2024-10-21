import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Products from "./components/products";

export default function Index() {
  return (
    <div className="max-w-[1220px] mx-auto w-full">
      <div className="grid p-10 gap-10">
        <div className="flex gap-20">
          <div className="grid gap-5">
            <div className="text-[#565B60] text-xs">11 - 20 OCTOBER 2024</div>
            <div className="text-[#0033FF] text-5xl font-semibold">Most Wanted</div>
            <div className="text-[#565B60] text-xs">Get your hands on this year's most sought-after objects, from top luxury brands to
              niche finds.
            </div>
            <div className="text-[#0033FF] text-xs">Explore now</div>
            <div className="flex gap-1 mt-[70px]  items-center">
              <button className="h-[4px] w-[70px] bg-[#0033FF]"></button>
              <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
              <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
              <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
              <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
              <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
              <button><ChevronRight size={20} strokeWidth={2} className="text-[#0033FF]" /></button>
            </div>
          </div>
          <div>
            <Image alt="" src="/images/img.png" width={600} height={300} />
          </div>
        </div>
        <div className="flex">
          <Products />
        </div>
      </div>
    </div>
  );
}
