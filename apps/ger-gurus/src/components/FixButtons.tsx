'use client';

import { useEffect, useState } from 'react';
import { BsHandIndexThumbFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';

export default function FixButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Дэлгэцийн өндөрийн 50% хүрмэгц товчлуурыг үзэгдэх байдлаар тохируулна
      if (window.scrollY >= window.innerHeight / 2 && window.scrollY < document.documentElement.scrollHeight - window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'fixed bottom-4 opacity-100 translate-y-0 z-50' // Зөөлөн гарч ирэх байрлал
          : 'fixed bottom-0 opacity-0 translate-y-6 pointer-events-none' // Зөөлөн алга болох хөдөлгөөн
      } w-fit mx-auto left-1/2 transform -translate-x-1/2 flex justify-center gap-4 p-1 rounded-full bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-100`}
    >
      <button className="py-5 px-10 border flex items-center hover:border-black/25 gap-3 rounded-full bg-white transition-transform duration-300 ease-in-out hover:translate-y-[-3px] hover:shadow-lg">
        <span className="font-bold">Үнэгүй турших</span>
        <FaPlay />
      </button>

      <button className="py-5 px-20 hover:bg-purple-700 flex items-center gap-3 rounded-full text-white bg-purple-600 transition-transform duration-300 ease-in-out hover:translate-y-[-3px] hover:shadow-xl">
        <span className="font-bold">Эхлэх</span>
        <BsHandIndexThumbFill />
      </button>
    </section>
  );
}
