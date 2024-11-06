'use client';

import Link from 'next/link';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { TbCopyright } from 'react-icons/tb';

export default function Footer() {
  return (
    <div className="container pt-[200px] h-[650px] items-center ">
      <div className="flex gap-4 border-y-2 my-10 py-8 items-center justify-center ">
        <div>Долоо хоног бүр 65,000 гаруй тусгай барааны үнийн саналд оролцоорой! 250+ гаруй мэргэжилтэний сонгосон</div>
      </div>
      <div className="flex justify-evenly pb-10">
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">СуперДуперын тухай</p>
          <Link href="/about">СуперДуперын тухай</Link>
          <Link href="/expert">Манай мэргэжилтнүүд</Link>
          <Link href="/carier">Карьер</Link>
          <Link href="/press">Хэвлэл мэдээлэл</Link>
          <Link href="/partner">СуперДупертэй хамтран ажиллах </Link>
          <Link href="/collector">Цуглуулагчдын портал</Link>
        </div>
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">Худалдан авалт</p>
          <Link href="/buy">Хэрхэн худалдан авалт хийх вэ</Link>
          <Link href="/expert">Худалдан авагчийн хамгаалалт</Link>
          <Link href="/carier">СуперДуперын түүхүүд</Link>
        </div>
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">Зарах</p>
          <Link href="/sell">Хэрхэн зарах вэ</Link>
          <Link href="/sell">Худалдагчийн зөвлөгөө</Link>
          <Link href="/guide">Илгээх удирдамж</Link>
          <Link href="/sell">Худалдагчийн нөхцөл</Link>
          <Link href="/affiliate">Хамтарсан байгууллагууд</Link>
          <Link href="/collector">Цуглуулагчдын портал</Link>
        </div>
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">Миний СуперДупер</p>
          <Link href="/client/sign-in">Нэвтрэх</Link>
          <Link href="/client/sign-up">Бүртгүүлэх</Link>
          <Link href="/help">Тусламжийн төв</Link>
        </div>
      </div>
      <div className="flex justify-end pt-10 mx-10 border-b-2 pb-10">
        <div className="flex gap-10">
          <Link href="https://www.facebook.com">
            <FaFacebook className="text-[24px]" />
          </Link>
          <Link href="https://x.com/?lang=en">
            <FaTwitter className="text-[24px]" />
          </Link>
          <Link href="https://www.instagram.com/">
            <BsInstagram className="text-[24px]" />
          </Link>
        </div>
      </div>
      <div className="flex justify-around py-10 text-slate-400">
        <Link href="/term">Ашиглах нөхцөл</Link>
        <Link href="/privacy">Мэдээллийн хамгаалалт ба нууцлалын мэдэгдэл</Link>
        <Link href="/cookie">Күүкиний бодлого</Link>
        <Link href="/policy">Хууль сахиулах бодлого</Link>
        <Link href="/policy">Бусад бодлого</Link>
        <div className="flex items-center">
          <TbCopyright className="text-black" />
          <p className="text-black">2024</p>
        </div>
      </div>
    </div>
  );
}
