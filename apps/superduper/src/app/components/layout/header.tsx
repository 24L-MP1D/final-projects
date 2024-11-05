'use client';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { ChevronDown, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

import { useAuthStore } from '../auth/useAuthStore';

type notifications = {
  _id: string;
  message: string;
  userId: string;
  productId: string;
  isSeen: boolean;
};

export default function Header() {
  const [signin, setSignin] = useState(false);
  const [isSeenNotif, setIsSeenNotif] = useState<notifications[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState<notifications[]>([]);
  const currentUser = useAuthStore((state) => state.currentUser);

  const loadNotif = async () => {
    const response = await fetch('/api/notifications', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUser?._id,
      }),
    });
    const data = await response.json();
    setNotifications(data);
    setIsSeenNotif(
      data.map((data: notifications) => {
        return !data.isSeen && data;
      })
    );
  };
  useEffect(() => {
    const cookie = Cookies.get('token');

    if (cookie) {
      setSignin(true);
      loadNotif();
    }
  }, [currentUser]);
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
    <div onClick={() => showNotif && setShowNotif(false)} className=" h-28 flex items-center max-w-[1280px]">
      <div id="google_translate_element"></div>
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="w-[55px] h-[55px] bg-[#03f] text-white flex items-center justify-center font-extrabold text-[24px]">СД</div>
          <button className="text-[#03f]" onClick={reload}>
            <p className="font-extrabold">СуперДупер</p>
            <div className="bg-slate-200 h-0.5 w-full"></div>
            <p className="font-extrabold">Дуудлага худалдаа</p>
          </button>
          <Link href="/client/category" className="ml-10 mr-8 flex gap-1 items-center">
            Ангилалууд
            <ChevronDown size={16} color="blue" />
          </Link>
          <div className="flex flex-1 items-center bg-[#f0f1f5]">
            <HiMiniMagnifyingGlass className="bg-[#f0f1f5] h-6 m-1 ml-3" color="blue" size={24} />
            <input placeholder="Хайх.." className="px-2 w-full p-3 bg-[#f0f1f5]" />
          </div>
        </div>
        <div className="flex items-center gap-10 mx-6">
          <button onClick={sell} className="bg-white hover:border-b-[1px] hover:border-black">
          Зарах
          </button>
          <Link href="/Help" className="bg-white hover:border-b-[1px] hover:border-black">
          Тусламж
          </Link>

          <FaRegHeart size={24} color="blue" onClick={save} />

          {signin ? (
            <div className="flex relative p-1">
              <div onClick={() => setShowNotif(true)} className="flex flex-col items-center hover:bg-slate-50 hover:cursor-pointer">
                <div className="flex relative">
                  <UserRoundPen />

                  {isSeenNotif.length > 0 && <div className="absolute rounded-full bg-red-500 w-5 h-5 text-center text-sm left-4 text-white">{isSeenNotif.length}</div>}
                </div>
                <div>{currentUser?.firstname}</div>
              </div>
              {showNotif && (
                <div className="absolute top-12 left-0 z-50">
                  {notifications.map((notification) => (
                    <div onClick={() => setShowNotif(false)} className={`p-2 hover:cursor-pointer shadow border ${notification.isSeen ? 'bg-slate-100' : 'bg-red-200'}`}>
                      {notification.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Button onClick={() => router.push(`/client/sign-in`)} className="bg-[#03f] rounded-none">
              Нэвтрэх
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
