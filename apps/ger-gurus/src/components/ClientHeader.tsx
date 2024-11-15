'use client';

import { useEffect, useState } from 'react';
import { BsHandIndexThumbFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';

export default function ClientHeader() {
  // const currentUser = useAuthStore((state) => state.currentUser);

  // function deleteCookie() {
  //   document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn; Secure; SameSite=Lax;';
  //   document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn; Secure; SameSite=Lax';
  //   window.location.reload();
  // }
  // const [url, setUrl] = useState('');

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setUrl(window.location.origin);
  //   }
  // }, []);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateY = scrollPos / 20;
  return (
    <main className="max-w-[1440px] mx-auto flex flex-col font-inter items-center p-20 gap-5 text-[#201116]">
      <div className="font-extrabold text-8xl text-center">
        <span className="block">Өөрийн</span>
        <span className="block">
          Ерт<span className="text-[66px]">❤️</span>нцийг
        </span>
        <span className="block"> Бүтээе </span>
      </div>
      <div className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      <div className="flex gap-6 text-lg font-medium z-10">
        <button className="py-5 px-10 border hover:border-black/25 flex items-center gap-3 rounded transition-transform duration-300 ease-in-out hover:translate-y-[-3px] hover:shadow-lg">
          <span className="font-bold">Бидний тухай</span>
          <FaPlay />
        </button>

        <button className="py-5 px-20 flex items-center gap-3 rounded text-white hover:bg-purple-700 bg-purple-600 transition-transform duration-300 ease-in-out hover:translate-y-[-3px] hover:shadow-xl">
          <span className="font-bold">Эхлэх</span>
          <BsHandIndexThumbFill />
        </button>
      </div>
      <div className="relative flex flex-col items-center justify-center mt-[-80px] gap-[70px]">
        <div className="flex gap-[700px]">
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(-${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/vid1.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/vid2.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex gap-[800px]">
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(-${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/vid3.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/vid4.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex gap-[750px]">
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(-${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/vid5.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/vid6.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="w-[768px] mx-auto shadow-2xl rounded-xl mt-[140px] absolute">
          <iframe
            className="videoTag aspect-video  object-cover overflow-hidden w-[100%] h-[100%] rounded-xl"
            src="https://www.youtube.com/embed/kKLVGoadRvk?autoplay=1&loop=1&mute=1&playlist=kKLVGoadRvk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* 
        <div className="absolute z-10 mt-[140px]">
          <MagneticPlayButton />
        </div> */}
      </div>
    </main>
  );
}
