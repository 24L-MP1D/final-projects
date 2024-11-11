'use client';

import { useEffect, useState } from 'react';
import { BsHandIndexThumbFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { useAuthStore } from './components/useAuthStore';

export default function ClientHeader() {
  const currentUser = useAuthStore((state) => state.currentUser);

  function deleteCookie() {
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn; domain=localhost; Secure; SameSite=Lax;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn; domain=localhost; Secure; SameSite=Lax';
    window.location.reload();
  }
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.origin);
    }
  }, []);
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
    <main className="max-w-[1440px] mx-auto flex flex-col items-center p-20 gap-5 text-[#201116]">
      <div className="font-extrabold text-8xl text-center">
        <span className="block">Create</span>
        <span className="block">
          y<span className="text-[66px]">❤️</span>ur own
        </span>
        <span className="block"> Verse </span>
      </div>
      <div className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      <div className="flex gap-6 text-lg font-medium">
        <button className="py-5 px-10 border flex items-center gap-3 rounded">
          <span>Watch Preview</span>
          <FaPlay />
        </button>
        <button className="py-5 px-10 flex items-center gap-3 rounded text-white bg-purple-600">
          <span>Get Create Now</span>
          <BsHandIndexThumbFill />
        </button>
      </div>
      <div className="relative flex flex-col items-center justify-center mt-[-80px] gap-[70px]">
        <div className="flex gap-[700px]">
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(-${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex gap-[800px]">
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(-${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex gap-[750px]">
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(-${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="max-w-48 rounded-xl shadow-2xl transform transition-transform duration-1000 ease-out" style={{ transform: `translate(${translateY}px, -${translateY}px)` }}>
            <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="max-w-3xl mx-auto shadow-2xl rounded-xl mt-[140px] absolute">
          <video className="videoTag aspect-video object-cover overflow-hidden w-[100%] rounded-xl" autoPlay loop muted>
            <source src={'/home-video.mp4'} type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  );
}