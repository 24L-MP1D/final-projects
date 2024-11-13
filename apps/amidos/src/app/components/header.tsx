'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const navs = [
  { name: 'БИДНИЙ ТУХАЙ', link: '' },
  { name: 'MЕНЮ', link: '/menu' },
  { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
  { name: 'ЗАХИАЛГА', link: '/order' },
  { name: 'ХҮРГЭЛТ', link: '/delivery' },
];
export default function Header() {
  return (
    <div className="z-10">
      <div className=" hidden md:flex md:gap-7 md:pt-10 ">
        {navs.map((nav) => (
          <Link href={nav.link} className="text-white" key={nav.name}>
            {nav.name}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="mt-6 mr-4">
              <Menu size={40} color="white" className="md:hidden" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="text-2xl text-black mb-5">Цэс</div>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className=" flex flex-col gap-4">
              {navs.map((nav) => (
                <Link href={nav.link} className="text-black" key={nav.name}>
                  {nav.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
