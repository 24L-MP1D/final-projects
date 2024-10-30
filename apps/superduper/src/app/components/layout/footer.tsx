import Link from 'next/link';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Button } from '../ui/button';

export default function Footer() {
  return (
    <div className="bg-pink-100 container mx-auto h-[650px] items-center max-w-[1280px]">
      <div className="flex gap-4 border-y-2 my-10 py-8 items-center justify-between">
        <div className="flex gap-4">
          <Button className="bg-blue-500">Sign Up</Button>
          <Button className="bg-blue-500">Sign In</Button>
        </div>
        <div>Bid on over 65,000 special objects everyweek! Selected over 250+ experts</div>
      </div>
      <div className="flex justify-evenly pb-10">
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">About SuperDuper</p>
          <Link href="/buy">About Super Duper</Link>
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
          <Link href="/buy">How to sell</Link>
          <Link href="/expert">Seller tips</Link>
          <Link href="/carier">Submission guidelines</Link>
          <Link href="/press">Seller terms</Link>
          <Link href="/partner">Affiliates</Link>
          <Link href="/collector">Collectors Portal</Link>
        </div>
        <div className="flex flex-col items-start gap-2 mx-2 text-slate-400">
          <p className="font-semibold mb-4 text-black">My SuperDuper</p>
          <Link href="/buy">Sign In</Link>
          <Link href="/expert">Register</Link>
          <Link href="/carier">Help center</Link>
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
        <Link href="/carier">Term of Use</Link>
        <Link href="/carier">Data Protection & Privacy Notice</Link>
        <Link href="/carier">Cookei Policy</Link>
        <Link href="/carier">Law Enforcement Policy</Link>
        <Link href="/carier">Other Policies</Link>
        <div>C2024</div>
      </div>
    </div>
  );
}
