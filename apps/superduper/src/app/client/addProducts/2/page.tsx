'use client';
import { Input } from '@/src/app/components/ui/Input';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const [titleOfWork, setTitleOfWork] = useState('');
  return (
    <form className="max-w-[50%] mx-auto mt-10">
      <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
        <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
          </div>
          <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
          <div className="p-0.5 border-2 border-[#00253e] rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
          </div>
          <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
          </div>
          <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
          </div>
          <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
          </div>
        </div>
        <div className="flex gap-10 justify-center items-center ">
          <div>Category</div>
          <div>Detail</div>
          <div className="text-[#f3f3f3]">Photos</div>
          <div className="text-[#f3f3f3]">Logistics</div>
          <div className="text-[#f3f3f3]">Review</div>
        </div>
      </div>
      <div className="mt-8 text-center text-[#333] text-[48px]">Tell us about your item</div>

      <header className="text-[#333333] text-2xl mb-8">General</header>

      <div className="flex flex-col gap-8">
        <div>
          <div className="text-[#23448d] text-sm mb-1.5">Item's Country of Origin *</div>
          <div className="flex border-b-[1px]">
            <Input type="text" className="flex-1 border-none" />
            <div className="hover:cursor-pointer">
              <ChevronDown className="w-10 h-10" />
            </div>
          </div>
        </div>
        <div>
          <div className="text-[#23448d] text-sm mb-1.5">Artist *</div>
          <div className="flex border-b-[1px]">
            <Input placeholder="Type to select" type="text" className="flex-1 border-none" />
            <div className="hover:cursor-pointer">
              <ChevronDown className="w-10 h-10" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-[#23448d] text-sm mb-1.5">Title of Work *</div>
            <div>{titleOfWork.length}/100 characters</div>
          </div>
          <div className="flex border-b-[1px]">
            <Input value={titleOfWork} onChange={(e) => setTitleOfWork(e.target.value)} maxLength={100} type="text" className="flex-1 border-none" />
          </div>
        </div>
        <div>
          <div className="text-[#23448d] text-sm mb-1.5">Medium / Material *</div>
          <div className="flex border-b-[1px]">
            <Input placeholder="e.g oil on canvas, an oak table, a pearl necklace" type="text" className="flex-1 border-none" />
          </div>
        </div>
        <div>
          <div className="text-[#23448d] text-sm mb-1.5">Date of Work *</div>
          <div className="flex border-b-[1px]">
            <Input type="text" className="flex-1 border-none" />
          </div>
        </div>
      </div>
      <header className="mt-16 mb-8 text-[#333333] text-2xl">Measurements</header>
    </form>
  );
}
