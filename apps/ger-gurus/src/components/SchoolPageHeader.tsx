import Image from 'next/image';
import { TbMenuDeep } from 'react-icons/tb';
import Nav from './nav';

export const SchoolPageHeader = () => {
  return (
    <div className="p-4 min-[480px]:p-, min-[768px]:p-12 min-[1279]:p-16 flex justify-between items-center">
      <div className="flex flex-col items-center">
        <Image src={'/logo.png'} alt="school-logo" width={100} height={100} />
        <p className="mt-[-10px] bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent font-semibold font-serif">VERSE</p>
      </div>

      <Nav />

      <div className="relative inline-flex group">
        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <TbMenuDeep className="w-12 h-12 relative inline-flex items-center justify-center transition-all duration-200 text-white" />
      </div>
    </div>
  );
};
