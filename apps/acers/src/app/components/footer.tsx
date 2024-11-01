'use client';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

export default function Footer() {
  const router = useRouter();
  return (
    <div className=" mx-auto min-w-[310px] max-w-[1160px]">
      <div className="bg-slate-100 content-center h-full">
        <div className="md:flex justify-around gap-5 mx-auto my-auto px-5 h-full mt-5">
          <div className="content-center">
            <p className="font-serif text-2xl ">Get Our Newsletter</p>
            <p className="text-slate-500">Get recipes, tips and NYT special offers delivered straight to your inbox.</p>
            <p className="text-slate-500 mb-2">Opt out or contact us anytime. See our Privacy Policy.</p>
          </div>
          <div>
            <Input type="text" placeholder="Enter your Email" className="mb-3" />
            <button className="border border-gray-600 rounded-full font-bold leading-3 px-[19px] py-[11px] w-full bg-slate-400" onClick={() => router.push(`/login`)}>
              Log In
            </button>
          </div>
          <div className=" gap-10 content-center">
            <p className="text-base font-bold mb-2">Follow Us</p>
            <div className="flex gap-5 mb-3">
              <span className="border rounded-full w-10 h-10 flex justify-center items-center">
                <Instagram />
              </span>
              <span className="border rounded-full w-10 h-10 flex justify-center items-center">
                <Facebook />
              </span>
              <span className="border rounded-full w-10 h-10 flex justify-center items-center">
                <Youtube />
              </span>
              <span className="border rounded-full w-10 h-10 flex justify-center items-center">
                <Twitter />
              </span>
              <a></a>
              <a></a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-black h-[410px] flex flex-col gap-5 py-5">
        <div className="w-[1000px] mx-auto flex justify-between">
          <div className="text-white h-[317px]">
            <p className="text-xs">About Us</p>
            <p className="w-[598px] text-lg text-start">
              New York Times Cooking offers subscribers recipes, advice and inspiration for better everyday cooking. From easy weeknight dinners to holiday meals, our recipes have been tested and
              perfected to meet the needs of home cooks of all levels.{'Subscribe'} for full access.
            </p>
          </div>
          <div className="text-white flex gap-10">
            <div className="flex flex-col gap-3">
              <ul className="flex flex-col gap-4">
                <p className="font-bold">LEARN MORE</p>
                <li>About Us</li>
                <li>FAQ</li>
                <li>NYTimes.com/food</li>
              </ul>
              <ul className="flex flex-col gap-4">
                <p className="font-bold">SHOP</p>
                <li>Gift Subscription</li>
                <li>Merchandise</li>
                <span className="border-b "></span>
                <li>Send Us Feedback</li>
              </ul>
            </div>
            <div>
              <ul className="flex flex-col gap-2">
                <p className="font-bold">RECIPES</p>
                <li className="pt-1">What to Cook This Week</li>
                <li>Weeknight</li>
                <li>Pasta</li>
                <li>Dinner</li>
                <li>Healthy</li>
                <li>Vegetarian</li>
                <li>Vegan</li>
                <li>Thanksgiving</li>
                <li>Christmas</li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="w-[1000px] mx-auto flex text-white gap-3">
          <li>© 2024 The New York Times Company</li>
          <li className="border-r-2"></li>
          <li>Terms of Service</li>
          <li className="border-r-2"></li>
          <li>Privacy Policy</li>
          <li className="border-r-2"></li>
          <li>California Notices</li>
          <li className="border-r-2"></li>
          <li> Your Privacy Choices</li>
        </ul>
      </div> */}
    </div>
  );
}
