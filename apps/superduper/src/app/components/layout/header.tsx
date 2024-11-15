'use client';
import * as Ably from 'ably';
import Cookies from 'js-cookie';
import { Bell, ChevronDown, CircleUser, LogOut, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import '../../styles.css';

import { RealtimeNotif } from '@/app/client/layout';
import { Notification } from '@/components/notifcation';
import { ProductType } from '@/components/productType';
import Image from 'next/image';
import { useAuthStore } from '../auth/useAuthStore';

const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLYKEY || '');

export type notifications = {
  _id: string;
  message: string;
  userId: string;
  productId: string;
  isSeen: boolean;
  productInfo: [ProductType];
};

export default function Header() {
  const [favlength, setFavlength] = useState(0);

  const [signin, setSignin] = useState(false);
  const [isSeenNotif, setIsSeenNotif] = useState<notifications[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState<notifications[]>([]);
  const currentUser = useAuthStore((state) => state.currentUser);
  const value = useContext(RealtimeNotif);
  const [showMessages, setShowMessages] = useState(false);
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
    setIsSeenNotif(data.filter((data: notifications) => data.isSeen == false));
    const channel = ably.channels.get('notifications');
    await channel.subscribe('new-notification', (message) => {
      setNotifications((prev) => [...prev, message.data]);
    });
  };

  useEffect(() => {
    const cookie = Cookies.get('token');
    if (cookie) {
      setSignin(true);
      if (currentUser?._id) loadNotif();
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
    localStorage.removeItem('favourites');
    window.location.reload();
  };

  const jumpProductDetailfromSearch = (id: string) => {
    value?.setSearchValue('');
    router.push(`/client/productDetails/${id}`);
  };
  const notificationUpdate = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
      });
    } catch (err) {
      throw new Error('aldaa notif');
    }
    setShowNotif(false);
    setShowMessages(false);
    loadNotif();
  };
  const firstName = (name: string) => {
    let shortName = '';
    for (let i = 0; i < 4; i++) {
      shortName += name[i];
    }
    return shortName;
  };
  return (
    <div className=" pt-5 flex items-center max-w-[1280px] ">
      <div className="bg-[#1F1F1FF2] py-4 px-6  max-w-[1280px] rounded-2xl flex-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-16 w-[200px]">
            <Link href="/client" className="flex hover:cursor-pointer items-center gap-3">
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
                    <div
                      onClick={() => jumpProductDetailfromSearch(product._id)}
                      key={product._id}
                      className="flex gap-2 hover:cursor-pointer active:bg-slate-200 items-center p-2 border-b border-blue-200"
                    >
                      <div className="flex-1">{product.productName}</div>
                      <div className="">
                        <Image src={product.frontImage || '/'} alt="image" width={100} height={100} className="rounded-full w-16 h-16" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <div onClick={() => value?.setShowCategory(true)} className="flex gap-1 cursor-pointer items-center text-white px-3 xl:px-4  hover:bg-[#3D3D3D] rounded-lg p-2 font-semibold">
              Ангилалууд
              <ChevronDown size={16} color="white" />
            </div>
            <div onClick={sell} className="flex gap-1 cursor-pointer items-center text-white px-3 xl:px-4  hover:bg-[#3D3D3D] rounded-lg p-2 font-semibold">
              Зарах
            </div>
            <Link href="/chatbot" className="flex gap-1 cursor-pointer items-center text-white px-3 xl:px-4  hover:bg-[#3D3D3D] rounded-lg p-2 font-semibold">
              Тусламж
            </Link>
          </div>

          <div className="flex gap-4 items-center w-[150px] mr-10">
            <div className="relative hover:cursor-pointer  ">
              <FaRegHeart size={24} color="white" onClick={save} />
              {favlength === 0 ? null : <div className="absolute left-4 bottom-4 bg-red-500 text-white rounded-full w-5 h-5 text-center text-[13px]">{favlength}</div>}
            </div>
            {signin ? (
              <div className="flex gap-5 items-center p-1 relative">
                <div className="hover:cursor-pointer ">

                  <div onClick={() => (showNotif ? setShowNotif(false) : setShowNotif(true))} className="relative z-50 hover:cursor-pointer">

                    <Bell color="white" />
                    {currentUser?._id && isSeenNotif.length > 0 && (
                      <div className="absolute rounded-full bg-red-500 w-5 h-5 text-center text-sm top-[-12px] left-3 text-white">{isSeenNotif.length}</div>
                    )}
                  </div>
                  {showNotif && <div className="fixed inset-0 bg-black opacity-50"></div>}
                  {showNotif && (
                    <div className="absolute top-12 left-[-250px] rounded-lg bg-white right-[100px] z-50">

                      {notifications.map((notification) => (

                        <div key={notification._id} className="flex gap-4">
                          <Notification loadNotif={loadNotif} notifications={notification} onClose={() => setShowNotif(false)} message={notification.message} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="group relative flex-1">
                  <div className="flex gap-2 hover:cursor-pointer  text-white hover:text-slate-300">
                    <UserRoundPen color="white" />
                    <div className="flex max-w-10">
                      {currentUser?.firstName && firstName(currentUser.firstName)}
                      <ChevronDown />
                    </div>
                  </div>
                  <div className="absolute hidden left-[-100px] top-6 right-0 group-hover:block hover:block text-center hover:cursor-pointer z-50">
                    <Link href={'/client/my-account/seller?seller=sl'} className="border-b rounded-lg border-white p-2 bg-[#1F1F1FF2] text-white flex gap-2">
                      <div>
                        <CircleUser />
                      </div>
                      <div>Профайл</div>
                    </Link>
                    <div onClick={logOut} className="border-b rounded-lg border-white p-2 bg-[#1F1F1FF2] text-white flex gap-2">
                      <div>
                        <LogOut />
                      </div>
                      <div>Гарах</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => router.push(`/client/sign-in`)} className="rounded-2xl hover:cursor-auto font-extralight shadow__btn">
                {' '}
                Нэвтрэх
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
