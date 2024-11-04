'use client';
import Cookies from 'js-cookie';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegHeart } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '../ui/button';

export default function Header() {
  // useEffect(() => {
  //   const existingScript = document.getElementById('google-translate-script');
  //   if (!existingScript) {
  //     const googleTranslateScript = document.createElement('script');
  //     googleTranslateScript.id = 'google-translate-script';
  //     googleTranslateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //     googleTranslateScript.async = true;
  //     document.body.appendChild(googleTranslateScript);
  //   }

  //   window.googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  //   };
  //   return () => {
  //     delete (window as any).googleTranslateElementInit;
  //   };
  // }, []);
  const router = useRouter();
  const sell = () => {
    const cookie = Cookies.get('token');
    if (!cookie) return router.push('/client/sign-in');
    router.push('/client/addProducts');
  };
  const save = () => {
    const cookie = Cookies.get('token');
    if (!cookie) return router.push('/client/sign-in');
    router.push('/client/save');
  };
  const reload = () => {
    router.push('/client');
  };
  return (
    <div className=" h-28 flex items-center max-w-[1280px]">
      <div id="google_translate_element"></div>
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="w-[55px] h-[55px] bg-[#03f] text-white flex items-center justify-center font-extrabold text-[24px]">SD</div>
          <button className="text-[#03f]" onClick={reload}>
            <p className="font-extrabold">SuperDuper</p>
            <div className="bg-slate-200 h-0.5 w-full"></div>
            <p className="font-extrabold">Auction</p>
          </button>
          <Link href="/client/category" className="ml-10 mr-8 flex gap-1 items-center">
            Categories
            <ChevronDown size={16} color="blue" />
          </Link>
          <div className="flex flex-1 items-center bg-[#f0f1f5]">
            <HiMiniMagnifyingGlass className="bg-[#f0f1f5] h-6 m-1 ml-3" color="blue" size={24} />
            <input placeholder="Search.." className="px-2 w-full p-3 bg-[#f0f1f5]" />
          </div>
        </div>
        <div className="flex items-center gap-10 mx-6">
          <button onClick={sell} className="bg-white hover:border-b-[1px] hover:border-black">
            Sell
          </button>
          <Link href="/Help" className="bg-white hover:border-b-[1px] hover:border-black">
            Help
          </Link>

          <FaRegHeart size={24} color="blue" onClick={save} />

          <Button onClick={() => router.push(`/client/sign-in`)} className="bg-[#03f] rounded-none">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
