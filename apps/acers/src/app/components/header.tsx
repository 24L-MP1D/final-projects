'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function Component() {
  return (
    <div className="grid place-items-center text-center">
      <div className="mx-auto w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Button variant="outline" size="icon" className="w-10 h-10">
            <MenuIcon className="hidden scale-125 w-6 h-6 lg:block" />
            <XIcon className="scale-125 w-6 h-6 hidden lg:block" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Button variant="outline" size="icon" className="w-10 h-10">
            <MenuIcon className="hidden scale-125 w-6 h-6 lg:block" />
            <XIcon className="scale-125 w-6 h-6 hidden lg:block" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <div className="border border-gray-200 rounded-lg shadow-sm dark:border-gray-800">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-r-none">
                <MenuIcon className="hidden scale-125 w-6 h-6 lg:block" />
                <XIcon className="scale-125 w-6 h-6 hidden lg:block" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="grid gap-4 p-4">
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/50 focus:bg-gray-100/50 dark:bg-gray-800 dark:hover:bg-gray-800/50 dark:focus:bg-gray-800/50"
                  prefetch={false}
                >
                  Item 1
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/50 focus:bg-gray-100/50 dark:bg-gray-800 dark:hover:bg-gray-800/50 dark:focus:bg-gray-800/50"
                  prefetch={false}
                >
                  Item 2
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/50 focus:bg-gray-100/50 dark:bg-gray-800 dark:hover:bg-gray-800/50 dark:focus:bg-gray-800/50"
                  prefetch={false}
                >
                  Item 3
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
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

function XIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Header() {
  const router = useRouter();
  return (
    <div>
      {/* <div className="flex justify-between gap-3">
        <div>
          <Image width={70} height={65} alt="logo" src={'/Logo.png'} onClick={() => router.push(`/`)} />
        </div>
        <div className="flex h-full rounded-lg items-center w-[740px] border group focus-within:border-slate-700 pl-3 mt-4 p-1 gap-3 ">
          <Search width={22} height={22} />
          <Input className="border-none focus-visible:ring-0" placeholder="What's you gonna eat?" />
        </div>
        <div className="flex flex-row gap-1 items-center mt-1">
          <button className="border border-gray-600 rounded-full font-bold leading-3 px-[19px] py-[11px] " onClick={() => router.push(`/login`)}>
            Log In
          </button>
          <button className="border bg-slate-400 text-white rounded-full leading-3 px-[19px]  py-[11px]" onClick={() => router.push(`/subscribe`)}>
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex gap-5 h-12">
        <button className="font-bold">Want to Cook</button>
        <button className="font-bold">Recipes</button>
        <button className="font-bold">Ingredients</button>
        <button className="font-bold">Ocassions</button>
        <button className="font-bold">About</button>
      </div> */}
      <div className="flex flex-col gap-5 mx-auto lg:w-[904px] ">
        <span className="flex justify-between">
          <div>
            <Image width={70} height={65} alt="logo" src={'/Logo.png'} onClick={() => router.push(`/`)} />
          </div>
          <div className="flex h-full rounded-lg items-center w-7/12 border group focus-within:border-slate-700 pl-3 mt-4 p-1 gap-3 bg-slate-200">
            <Search width={22} height={22} />
            <Input className="border-none focus-visible:ring-0 :border-none bg-slate-200" placeholder="What's you gonna eat?" />
          </div>
          <div className="flex flex-row gap-1 items-center mt-1">
            <button className="border border-gray-600 rounded-full font-bold leading-3 px-[19px] py-[11px] " onClick={() => router.push(`/login`)}>
              Log In
            </button>
            <button className="border bg-slate-400 text-white rounded-full leading-3 px-[19px]  py-[11px]" onClick={() => router.push(`/subscribe`)}>
              Subscribe
            </button>
          </div>
        </span>
        <span className="flex gap-5 h-10">
          <button className="font-bold">Want to Cook</button>
          <button className="font-bold">Recipes</button>
          <button className="font-bold">Ingredients</button>
          <button className="font-bold">Ocassions</button>
          <button className="font-bold">About</button>
        </span>
      </div>
      {/* <div className="flex gap-5 h-10">
        <button className="font-bold">Want to Cook</button>
        <button className="font-bold">Recipes</button>
        <button className="font-bold">Ingredients</button>
        <button className="font-bold">Ocassions</button>
        <button className="font-bold">About</button>
      </div> */}
      <Component />
    </div>
  );
}
