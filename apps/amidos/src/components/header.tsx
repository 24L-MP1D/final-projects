'use client';

import Link from 'next/link';

const navs = [
  { name: 'БИДНИЙ ТУХАЙ', link: '/' },
  { name: 'MЕНЮ', link: '/menu' },
  { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
  { name: 'ЗАХИАЛГА', link: '/order' },
  { name: 'ХҮРГЭЛТ', link: '/delivery' },
];
export function Headers() {
  return (
    <div className="flex bg-black gap-4 justify-center p-6 max-w-[900px] m-auto">
      {navs.map((nav) => (
        <Link className="text-white" key={nav.name} href={nav.link}>
          {nav.name}
        </Link>
      ))}
    </div>
  );
}
