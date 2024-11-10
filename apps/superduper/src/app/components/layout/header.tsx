'use client';
import { Button } from '@/components/ui/button';
import * as Ably from 'ably';
import Cookies from 'js-cookie';
import { ChevronDown, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

import { RealtimeNotif } from '@/app/client/layout';
import Image from 'next/image';
import { useAuthStore } from '../auth/useAuthStore';

const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLYKEY || '');

export type notifications = {
  _id: string;
  message: string;
  userId: string;
  productId: string;
  isSeen: boolean;
};

export default function Header() {
  const [favlength, setFavlength] = useState(0);

  const [signin, setSignin] = useState(false);
  const [isSeenNotif, setIsSeenNotif] = useState<notifications[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState<notifications[]>([]);
  const currentUser = useAuthStore((state) => state.currentUser);
  const value = useContext(RealtimeNotif);
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
    const channel = ably.channels.get('notifications');
    await channel.subscribe('new-notification', (message) => {
      setNotifications((prev) => [...prev, message.data]);
    });
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
  console.log(favlength);
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

  const showHeart = () => {
    const favourities = value?.favourite.length;

    if (favourities) return favourities;
    return 0;
  };
  useEffect(() => {
    setFavlength(showHeart());
  }, [value?.favourite]);
  return (
    <div onClick={() => showNotif && setShowNotif(false)} className=" pt-5 flex items-center max-w-[1280px] ">
      <div className="bg-[#1F1F1FF2] py-4 px-6  max-w-[1280px] rounded-2xl flex-1">
        <div className="flex  justify-between">
          <div className="flex items-center gap-16 w-[200px]">
            <div className="flex gpa-1 items-center gap-3">
              <Image src="/logo.png" width={60} height={60} alt="logo" className="rounded-full w-[50px] h-[50px] " />
              <div className="text-white font-bold">Bidscape</div>
            </div>
            <div className="flex flex-1 items-center bg-[#333333] rounded-3xl ml-8">
              <HiMiniMagnifyingGlass className="bg-[#333333] h-8 m-1 ml-3" color="gray" size={24} />
              <input placeholder="Хайх" value={value?.searchValue} onChange={(e) => value?.setSearchValue(e.target.value)} className="px-2 w-[200px] p-2 rounded-3xl bg-[#333333]" />
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <Link href="/client/category" className="flex gap-1 items-center text-white">
              Ангилалууд
              <ChevronDown size={16} color="white" />
            </Link>
            <button onClick={sell} className="bg-[#333333] hover:border-b-[1px] hover:border-black text-white">
              Зарах
            </button>
            <Link href="/Help" className="bg-[#333333] hover:border-b-[1px] hover:border-black text-white">
              Тусламж
            </Link>
          </div>
          <div className="flex gap-4 items-center w-[150px] ">
            <div className="relative">
              <FaRegHeart size={24} color="white" onClick={save} />
              {favlength === 0 ? null : <div className="absolute left-5 bottom-4  bg-red-500 text-white rounded-full w-5 h-5 text-center text-sm">{favlength}</div>}
            </div>
            {signin ? (
              <div className="flex relative p-1">
                <div onClick={() => setShowNotif(true)} className="flex flex-col items-center hover:bg-slate-50 hover:cursor-pointer">
                  <div className="flex relative">
                    <UserRoundPen />
                    {isSeenNotif.length > 0 && <div className="absolute rounded-full bg-red-500 w-5 h-5 text-center text-sm left-4 text-white">{isSeenNotif.length}</div>}
                  </div>
                  <div>{currentUser?.firstName}</div>
                </div>
                {showNotif && (
                  <div className="absolute top-12 left-0 z-50">
                    {notifications.map((notification) => (
                      <div key={notification._id} onClick={() => setShowNotif(false)} className={`p-2 hover:cursor-pointer shadow border ${notification.isSeen ? 'bg-slate-100' : 'bg-red-200'}`}>
                        {notification.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => router.push(`/client/sign-in`)} className="bg-[#333333] rounded-none">
                Нэвтрэх
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
