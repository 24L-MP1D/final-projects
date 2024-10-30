import Image from 'next/image';
import { CgMenu } from 'react-icons/cg';
import Nav from './nav';

export const SchoolPageHeader = () => {
  return (
    <div className="p-4 min-[480px]:p-, min-[768px]:p-12 min-[1279]:p-16 flex justify-between items-center">
      <div className=" relative">
        <div className="absolute -inset-2 rounded-lg bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-sky-600 via-blue-600 to-purple-600 opacity-50 blur-2xl"></div>
        <div className="relative flex flex-col gap-1 w-full  items-center justify-center border-none rounded-lg bg-transparent">
          <Image src={'/logo.png'} alt="school-logo" width={40} height={40} />
          <p className="font-bold text-xs bg-gradient-to-b from-teal-500 via-purple-500 to-red-500 text-transparent bg-clip-text">GER GURUS</p>
        </div>
      </div>

      <Nav />

      <div className="relative inline-flex group">
        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <CgMenu className="w-8 h-8 relative inline-flex items-center justify-center transition-all duration-200 text-white" />
      </div>
    </div>
  );
};
