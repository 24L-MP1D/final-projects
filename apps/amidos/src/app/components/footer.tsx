'use client';

import { CopyrightIcon } from 'lucide-react';
import Link from 'next/link';
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci';
export default function Footer() {
  const socials = [
    { platforms: <CiFacebook fill="white" />, link: 'https://www.facebook.com/', id: 1 },
    { platforms: <CiInstagram fill="white" />, link: 'https://www.instagram.com/', id: 2 },
    { platforms: <CiTwitter fill="white" />, link: 'https://x.com/', id: 3 },
  ];
  return (
    <div className="bg-[#1A1919] p-28 flex flex-col gap-16 items-center text-center">
      <div className="flex flex-col gap-4">
        <p className="text-white text-lg">AMIDO'S</p>
        <p className="text-white text-sm">ULAANBAATAR | MONGOLIA</p>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-3">
          {socials.map((social) => (
            <div>
              <Link href={social.link} target="_blank" key={social.id}>
                {social.platforms}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-1 items-center">
          <CopyrightIcon size={12} fill="white" />
          <p className="text-[#F7F7F7] text-xs"> 2024 AMIDO’S - Бүх эрх хуулиар хамгаалагдсан</p>
        </div>
      </div>
    </div>
  );
}
