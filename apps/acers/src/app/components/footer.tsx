'use client';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

export default function Footer() {
  const router = useRouter();
  return (
    <div className=" mx-auto min-w-[310px] max-w-[1160px]">
      <div className="bg-slate-100 content-center h-full">
        <div className="sm:flex justify-around gap-5 mx-auto my-auto px-5 h-full ">
          <div className="content-center mt-10">
            <p className="font-serif text-2xl ">Get Our Newsletter</p>
            <p className="text-slate-500">Get recipes, tips and NYT special offers delivered straight to your inbox.</p>
            <p className="text-slate-500 mb-2">Opt out or contact us anytime. See our Privacy Policy.</p>
          </div>
          <div>
            <Input type="text" placeholder="Enter your Email" className="mb-2" />
            <button className="border border-gray-600 rounded-full font-bold leading-3 px-[19px] py-[11px] w-full bg-slate-400 " onClick={() => router.push(`/signUp`)}>
              Log In
            </button>
          </div>
          <div className=" gap-10 content-center">
            <p className="text-base font-bold mb-2">Follow Us</p>
            <div className="flex gap-5 mb-2">
              <span className="border rounded-full w-10 h-10 flex justify-center items-center border-slate-600">
                <Instagram className="text-slate-600" />
              </span>
              <span className="border rounded-full w-10 h-10 flex justify-center items-center border-slate-600">
                <Facebook className="text-slate-600" />
              </span>
              <span className="border rounded-full w-10 h-10 flex justify-center items-center border-slate-600">
                <Youtube className="text-slate-600" />
              </span>
              <span className="border rounded-full w-10 h-10 flex justify-center items-center border-slate-600">
                <Twitter className="text-slate-600" />
              </span>
              <a></a>
              <a></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-[1000px] md:flex flex-col gap-5 py-5">
        <div className="mx-auto lg:flex justify-between px-5">
          <div className="text-white max-h-[340px] min-w-[200px] mb-10">
            <p className="text-base font-bold mb-2">About Us</p>
            <p className=" text-base text-start">
              New York Times Cooking offers subscribers recipes, advice and inspiration for better everyday cooking. From easy weeknight dinners to holiday meals, our recipes have been tested and
              perfected to meet the needs of home cooks of all levels.{'Subscribe'} for full access.
            </p>
          </div>
          <div className="text-white md:flex justify-around gap-10">
            <div className="md:flex flex-col gap-3">
              <ul className="md:flex flex-col gap-4 mb-10">
                <p className="font-bold mb-2">LEARN MORE</p>
                <li className="mb-2">About Us</li>
                <li className="mb-2">FAQ</li>
                <li className="mb-2">NYTimes.com/food</li>
              </ul>
              <ul className="flex flex-col gap-4 mb-5">
                <p className="font-bold mb-2">SHOP</p>
                <li className="mb-2">Gift Subscription</li>
                <li className="mb-2">Merchandise</li>
                <span className="border-b mb-2 w-5"></span>
                <li>Send Us Feedback</li>
              </ul>
            </div>
            <div>
              <ul className="flex flex-col gap-2 mb-5">
                <p className="font-bold mb-2">RECIPES</p>
                <li className="pt-1">What to Cook This Week</li>
                <li className="mb-2">Weeknight</li>
                <li className="mb-2">Pasta</li>
                <li className="mb-2">Dinner</li>
                <li className="mb-2">Healthy</li>
                <li className="mb-2">Vegetarian</li>
                <li className="mb-2">Vegan</li>
                <li className="mb-2">Thanksgiving</li>
                <li className="mb-2">Christmas</li>
              </ul>
            </div>
          </div>
        </div>
        {/* <ul className=" mx-auto flex text-white gap-3">
          <li>© 2024 The New York Times Company</li>
          <li className="border-r-2"></li>
          <li>Terms of Service</li>
          <li className="border-r-2"></li>
          <li>Privacy Policy</li>
          <li className="border-r-2"></li>
          <li>California Notices</li>
          <li className="border-r-2"></li>
          <li> Your Privacy Choices</li>
        </ul> */}
      </div>
    </div>
  );
}
