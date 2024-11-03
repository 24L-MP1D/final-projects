'use client';
import Cookies from 'js-cookie';
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
  const cookieValidation = () => {
    const cookie = Cookies.get('token');
    if (!cookie) return alert('first you must sign in');
    router.push('/client/addProducts');
  };
  return (
    <div className="bg-pink-100 container mx-auto h-28 flex items-center max-w-[1280px]">
      <div id="google_translate_element"></div>
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="w-[55px] h-[55px] bg-blue-500 rounded-full text-red-500 flex items-center justify-center font-extrabold text-[24px]">SD</div>
          <div className="text-blue-500">
            <p className="font-extrabold">SuperDuper</p>
            <div className="bg-slate-300 h-1 w-full"></div>
            <p className="font-extrabold">Auction</p>
          </div>
          <Link href="/client/category" className="ml-10 mr-8">
            Category
          </Link>
          <div className="flex flex-1 items-center bg-white">
            <HiMiniMagnifyingGlass className="bg-white h-6 m-1 text-[24px] ml-3" />
            <input placeholder="Search.." className="px-2 w-full p-3" />
          </div>
        </div>
        <div className="flex items-center gap-10 mx-6">
          <Button onClick={cookieValidation}>Sell</Button>
          <Link href="/Help">Help</Link>
          <Link href="/Heart">
            <FaRegHeart className="text-[24px] text-blue-500" />
          </Link>
          <Button onClick={() => router.push(`/client/sign-up`)} className="bg-blue-500">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
