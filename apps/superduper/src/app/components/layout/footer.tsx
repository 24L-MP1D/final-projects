'use client';

import Link from 'next/link';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { TbCopyright } from 'react-icons/tb';

export default function Footer() {
  return (
    <div className="container pt-[200px] h-[650px] items-center ">
      <div className="flex gap-4 border-y-2 my-10 py-8 items-center justify-center ">
        <div>Bid on over 65,000 special objects everyweek! Selected over 250+ experts</div>
      </div>
      <div className="flex justify-evenly pb-10">
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">About SuperDuper</p>
          <Link href="/about">About Super Duper</Link>
          <Link href="/expert">Our experts</Link>
          <Link href="/carier">Carier</Link>
          <Link href="/press">Press</Link>
          <Link href="/partner">Partnering with SuperDuper</Link>
          <Link href="/collector">Collectors Portal</Link>
        </div>
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">Buy</p>
          <Link href="/buy">How to buy</Link>
          <Link href="/expert">Buyer protection</Link>
          <Link href="/carier">SuperDuper stories</Link>
        </div>
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">Sell</p>
          <Link href="/sell">How to sell</Link>
          <Link href="/sell">Seller tips</Link>
          <Link href="/guide">Submission guidelines</Link>
          <Link href="/sell">Seller terms</Link>
          <Link href="/affiliate">Affiliates</Link>
          <Link href="/collector">Collectors Portal</Link>
        </div>
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">My SuperDuper</p>
          <Link href="/client/sign-in">Sign In</Link>
          <Link href="/client/sign-up">Register</Link>
          <Link href="/help">Help center</Link>
        </div>
      </div>
      <div className="flex justify-between pt-10 mx-10 border-b-2 pb-10">
        <div>english drop down</div>
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
        <Link href="/term">Term of Use</Link>
        <Link href="/privacy">Data Protection & Privacy Notice</Link>
        <Link href="/cookie">Cookei Policy</Link>
        <Link href="/policy">Law Enforcement Policy</Link>
        <Link href="/policy">Other Policies</Link>
        <div className="flex items-center">
          <TbCopyright className="text-black" />
          <p className="text-black">2024</p>
        </div>
      </div>
    </div>
  );
}
