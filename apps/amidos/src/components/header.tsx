'use client';

import Link from 'next/link';

const navs = [
  { name: 'БИДНИЙ ТУХАЙ', link: '/' },
  { name: 'MЕНЮ', link: '/menu' },
  { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
  { name: 'САГС', link: '/order' },
];
export function Headers() {
  return (
    <div className="flex bg-black gap-4 justify-center p-6 max-w-full m-auto ">
      {navs.map((nav) => (
        <Link className="text-white" key={nav.name} href={nav.link}>
          {nav.name}
        </Link>
      ))}
    </div>
  );
}
