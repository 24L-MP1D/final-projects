'use client';

import { BsHandIndexThumbFill } from 'react-icons/bs';
import { FaPhone } from 'react-icons/fa6';
import { GrInstagram } from 'react-icons/gr';

import Link from 'next/link';
import { FaSquareFacebook } from 'react-icons/fa6';

export default function ClientFooter() {
  return (
    <section className="max-w-[1440px] mx-auto flex flex-col font-inter items-center gap-10 p-20">
      <div className="text-5xl font-bold"> Бидэнтэй холбоо барих</div>
      <div>
        <button className="py-7 text-2xl px-24 hover:bg-purple-700 flex items-center gap-3 rounded-full text-white bg-purple-600 transition-transform duration-300 ease-in-out hover:translate-y-[-3px] hover:shadow-xl">
          <Link href={'/signup'}>
            <span className="font-bold">Эхлэх</span>
          </Link>{' '}
          <BsHandIndexThumbFill />
        </button>
      </div>
      <div className="flex gap-5 font-bold">
        <button className="flex items-center gap-1" onClick={() => (window.location.href = 'https://www.instagram.com/pineconemongolia/')}>
          <GrInstagram className="text-xl" />
          Instagram
        </button>
        <button className="flex items-center gap-1" onClick={() => (window.location.href = 'https://www.facebook.com/pinecone.academy.mongolia  ')}>
          <FaSquareFacebook className="text-xl" />
          facebook
        </button>
        <button className="flex items-center gap-1">
          <FaPhone className="text-xl" />
          phone
        </button>
      </div>
      <div className="text-base">Pinecone academy, Inc. Бүх эрх хуулиар хамгаалагдсан 2024 он</div>
    </section>
  );
}
