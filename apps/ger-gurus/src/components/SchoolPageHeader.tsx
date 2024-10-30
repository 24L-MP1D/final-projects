import Image from 'next/image';
import { CgMenuGridO } from 'react-icons/cg';

export const SchoolPageHeader = () => {
  return (
    <div className="p-4 min-[480px]:p-8 min-[768px]:p-12 min-[1279]:p-16 flex justify-between items-end">
      <div className="flex flex-col gap-1 items-center">
        <Image src={'/logo.png'} alt="school-logo" width={40} height={40} />
        <p className="font-bold text-xs">GER GURUS</p>
      </div>
      <div className="flex gap-7">
        <div className="flex justify-center items-center">
          <div className="relative inline-flex group">
            <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <a
              href="#"
              title="Get quote now"
              className="relative inline-flex items-center justify-center px-4 py-2 text-lg text-white transition-all duration-200 bg-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
              role="button"
            >
              эхлүүлэх
            </a>
          </div>
        </div>
        <div>
          <CgMenuGridO className="w-24 h-24 bg-gradient-to-b from-teal-500 via-purple-500 to-red-500 text-transparent bg-clip-text" />
        </div>
      </div>
    </div>
  );
};
