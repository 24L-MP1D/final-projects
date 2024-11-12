'use client';
import { Button } from '@/components/ui/button';
import * as Ably from 'ably';
import Cookies from 'js-cookie';
import { Bell, ChevronDown, CircleUser, LogOut, UserRoundPen } from 'lucide-react';
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

  const showHeart = () => {
    const favourities = value?.favourite.length;

    if (favourities) return favourities;
    return 0;
  };
  useEffect(() => {
    setFavlength(showHeart());
  }, [value?.favourite]);
  const logOut = () => {
    Cookies.remove('token');
    window.location.reload();
  };
  return (
    <div onClick={() => showNotif && setShowNotif(false)} className=" pt-5 flex items-center max-w-[1280px] ">
      <div className="bg-[#1F1F1FF2] py-4 px-6  max-w-[1280px] rounded-2xl flex-1">
        <div className="flex  justify-between">
          <div className="flex items-center gap-16 w-[200px]">
            <Link href={'/client'} className="flex gpa-1 items-center gap-3">
              <Image src="/logo.png" width={60} height={60} alt="logo" className="rounded-full w-[50px] h-[50px] " />
              <div className="text-white font-bold">Bidscape</div>
            </Link>
            <div className="flex flex-1 relative items-center bg-[#333333] rounded-3xl ml-8">
              <HiMiniMagnifyingGlass className="bg-[#333333] h-8 m-1 ml-3" color="gray" size={24} />
              <input
                placeholder="Хайх"
                value={value?.searchValue}
                onChange={(e) => value?.setSearchValue(e.target.value)}
                className="px-2 w-[200px] text-white outline-none p-2 rounded-3xl bg-[#333333]"
              />
              {value?.searchValue && (
                <div className="absolute z-50 bg-white w-full max-h-[500px] overflow-y-scroll top-10 rounded-xl">
                  {value?.products.map((product) => (
                    <Link href={`/client/productDetails/${product._id}`} key={product._id} className="flex gap-2 items-center p-2 border-b border-blue-200">
                      <div className="flex-1">{product.productName}</div>
                      <div className="">
                        <Image src={product.frontImage || '/'} alt="image" width={100} height={100} className="rounded-full w-16 h-16" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <div onClick={() => value?.setShowCategory(true)} className="flex gap-1 cursor-pointer items-center text-white">
              Ангилалууд
              <ChevronDown size={16} color="white" />
            </div>
            <button onClick={sell} className="bg-[#333333] hover:border-b-[1px] hover:border-black text-white">
              Зарах
            </button>
            <Link href="/chatbot" className="bg-[#333333] hover:border-b-[1px] hover:border-black text-white">
              Тусламж
            </Link>
          </div>
          <div className="flex gap-4 items-center w-[150px] ">
            <div className="relative hover:cursor-pointer">
              <FaRegHeart size={24} color="white" onClick={save} />
              {favlength === 0 ? null : <div className="absolute left-5 bottom-4  bg-red-500 text-white rounded-full w-5 h-5 text-center text-sm">{favlength}</div>}
            </div>
            {signin ? (
              <div className="flex relative gap-5 items-center p-1">
                <div onClick={() => setShowNotif(true)} className="hover:cursor-pointer">
                  <div className="relative ">
                    <Bell color="white" />
                    {isSeenNotif.length > 0 && <div className="absolute rounded-full bg-red-500 w-5 h-5 text-center text-sm top-[-5px] left-0 text-white">{isSeenNotif.length}</div>}
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
                <div className="group relative">
                  <div className="flex gap-2 hover:cursor-pointer text-white hover:text-slate-300">
                    <UserRoundPen color="white" />
                    <div className="flex">
                      {currentUser?.firstName}
                      <ChevronDown />
                    </div>
                  </div>
                  <div className="absolute hidden left-[-100px] top-6 right-0 group-hover:block hover:block text-center hover:cursor-pointer z-50">
                    <Link href={'/client/my-account/seller?seller=sl'} className="border-b rounded-lg border-white p-2 bg-[#1F1F1FF2] text-white flex gap-2">
                      <div>
                        <CircleUser />
                      </div>
                      <div>Account</div>
                    </Link>
                    <div onClick={logOut} className="border-b rounded-lg border-white p-2 bg-[#1F1F1FF2] text-white flex gap-2">
                      <div>
                        <LogOut />
                      </div>
                      <div>Sign-out</div>
                    </div>
                  </div>
                </div>
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
