'use client';

import { Search, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ThemeBackground from '../(client)/settingswrapper';
import HeaderNavigationMenu from './navigationMenu';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function Component() {
  return (
    <div className="w-6 mx-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-r-none">
            <MenuIcon className="scale-125 w-6 h-6 " />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white  duration-700 inset-y-0 left-0 h-full w-4/4 ">
          <div className="bg-white">
            <Search width={22} height={22} />
            <Input className="border-none focus-visible:ring-0  bg-white " placeholder="Search" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-r-none">
          <Search className="scale-125 w-6 h-6 " />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white  duration-700 inset-y-0 left-0 h-full w-4/4 ">
        <div className="bg-white flex rounded-lg items-center border group focus-within:border-slate-700 pl-3 mt-2 p-1 gap-3 w-11/12">
          <Search width={22} height={22} />
          <Input className="border-none focus-visible:ring-0  bg-white " placeholder="Юу идмээр байнадаа" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Header() {
  const router = useRouter();
  return (
    <div className=" mx-auto min-w-[310px] max-w-[1160px]">
      <div className="flex justify-between items-center w-full lg:hidden">
        <span className="flex gap-4 ">
          <Component />
          <SearchBar />
        </span>
        {/*<Image priority={true} width={50} height={45} alt="logo" src={'/Logo.png'} onClick={() => router.push(`/`)} />*/}
        <p className="font-bold text-[24px] cursor-pointer" onClick={() => router.push(`/`)}>
          Acers
        </p>
        <div className=" lg:hidden  items-center gap-2 flex ">
          <button className="border bg-slate-400 text-white rounded-full leading-3 px-[19px]  py-[11px] hidden md:block" onClick={() => router.push(`/subscribe`)}>
            Subscribe
          </button>
          <button className="px-7">
            <UserCircle width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="hidden lg:flex justify-between w-full items-center">
        {/*<Image priority={true} width={70} height={65} alt="logo" src={'/Logo.png'} onClick={() => router.push(`/`)} />*/}

        <p className="font-extrabold text-[40px] mt-3">Acers</p>
        <div className="flex h-full rounded-lg items-center border group focus-within:border-slate-700 pl-3 mt-4 p-1 gap-3 w-7/12">
          <Search width={22} height={22} />
          <Input className="border-none focus-visible:ring-0" placeholder="Юу идмээр байнадаа ?" />
        </div>
        <div className="flex gap-3 items-center mt-1 ">
          <button className="border border-gray-600 rounded-full font-bold leading-3 px-[19px] py-[11px] " onClick={() => router.push(`/login`)}>
            Нэвтрэх
          </button>
          <button className="border bg-slate-400 text-white rounded-full leading-3 px-[19px]  py-[11px]" onClick={() => router.push(`/subscribe`)}>
            Багц
          </button>
        </div>
        <ThemeBackground />
      </div>
      <HeaderNavigationMenu />
    </div>
  );
}
