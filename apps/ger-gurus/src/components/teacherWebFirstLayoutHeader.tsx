'use client';

import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button"; // Assuming the Button component is located here

const TeacherWebFirstLayoutHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      className="flex justify-between items-center py-5 px-10"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      {/* Logo */}
      <div className="flex items-center w-60 h-12">
        {/* Make sure LOGO.png is placed inside the public folder */}
        <Image src="/logo.png" width={99} height={29.3} alt="Logo" />
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-green-950">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className={`md:flex gap-6 text-sm text-green-950 items-center font-bold ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
        <li className="hover:text-green-600 cursor-pointer transition-all duration-200">HOW IT WORKS</li>
        <li className="hover:text-green-600 cursor-pointer transition-all duration-200">PRICING</li>
        <li className="hover:text-green-600 cursor-pointer transition-all duration-200">FAQS</li>
        <li className="hover:text-green-600 cursor-pointer transition-all duration-200">BLOG</li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-3">
        {/* Button with cursor-pointer and hover effect */}
        <Button
          variant="teacherButton"
          className="cursor-pointer bg-white text-black border border-black hover:border-slate-500 hover:text-slate-500 transition duration-200"
        >
          LOG IN
        </Button>
        <Button
          variant="teacherButton"
          className="cursor-pointer bg-green-600 hover:bg-green-700 transition duration-200"
        >
          GET FUNDING
        </Button>
      </div>
    </div>
  );
};

export default TeacherWebFirstLayoutHeader;
