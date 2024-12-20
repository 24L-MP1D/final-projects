'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState('/restaurant/3.png');
  const images = ['/restaurant/1.png', '/restaurant/2.png', '/restaurant/3.png', '/restaurant/4.png', '/restaurant/5.png', '/restaurant/1.png'];
  const navs = [
    { name: 'БИДНИЙ ТУХАЙ', link: '/' },
    { name: 'MЕНЮ', link: '/menu' },
    { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
    { name: 'ЗАХИАЛГА', link: '/order' },
  ];
  return (
    <>
      <div className="flex bg-black gap-4 justify-center p-6 w-full">
        {navs.map((nav) => (
          <Link className="text-white" key={nav.name} href={nav.link}>
            {nav.name}
          </Link>
        ))}
      </div>
      <div className="m-auto w-[1000px] pb-10 pt-10 flex flex-col items-center">
        <div className="mb-4 ">
          <img className="h-[670px] max-w-full rounded-lg" src={selectedImage} alt="Selected Restaurant" />
        </div>

        <div className="flex gap-1">
          {images.map((src, index) => (
            <div key={index} onClick={() => setSelectedImage(src)} className="cursor-pointer">
              <img className="h-36 max-w-full rounded-lg" src={src} alt={`Restaurant ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
