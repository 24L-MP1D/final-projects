'use client';

import Image from "next/image";
import { Button } from "./ui/button";

export default function TeacherWebFirstLayoutHeader() {
  return (
    <div className="flex py-5 px-10 justify-between border-b border-green-950" style={{ fontFamily: 'Roboto, sans-serif' }}>
       <div className="w-60 h-12 items-center flex">
         <Image src="/LOGO.png" width={99} height={29.3} alt="Logo" />
       </div>

      <ul className="flex gap-6 text-sm text-green-950 items-center font-bold">
        <li>HOW IT WORKS</li>
        <li>PRICING</li>
        <li>FAQS</li>
        <li>BLOG</li>
      </ul>

      <div className="flex gap-3">
        <Button variant={"teacherButton"}>
          LOG IN    
        </Button>
        <Button variant={"teacherButton"} className="bg-green-600">
          GET FUNDING
        </Button>
      </div>
    </div>
  );
}
