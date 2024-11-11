'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Buysteptwo() {
  const navs = [
    { name: 'БИДНИЙ ТУХАЙ', link: '/' },
    { name: 'MЕНЮ', link: '/menu' },
    { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
    { name: 'ЗАХИАЛГА', link: '/order' },
    { name: 'ХҮРГЭЛТ', link: '/delivery' },
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
      <div className="flex justify-center">
        <Image src="/code.svg" alt="QR image" width={500} height={500} />;
      </div>
    </>
  );
}
