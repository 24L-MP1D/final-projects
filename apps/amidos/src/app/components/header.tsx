'use client';

import Link from 'next/link';

const navs = [
  { name: 'БИДНИЙ ТУХАЙ', link: '' },
  { name: 'MЕНЮ', link: '/menu' },
  { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
  { name: 'ЗАХИАЛГА', link: '/order' },
  { name: 'ХҮРГЭЛТ', link: '/delivery' },
];
export default function Header() {
  return (
    <div className="flex gap-7 pt-10 z-10">
      {navs.map((nav) => (
        <Link href={nav.link} className="text-white" key={nav.name}>
          {nav.name}
        </Link>
      ))}
    </div>
  );
}
