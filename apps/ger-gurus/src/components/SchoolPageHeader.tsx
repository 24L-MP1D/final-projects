import { useState } from 'react';
 
export const SchoolPageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
 
  return (
    <div className="h-24 flex max-w-[2100px] justify-center">
      <div className="flex p-4 items-center pl-24">
        <div className="flex items-center w-44 h-9">
          <img
            src="https://lh3.googleusercontent.com/yYS9OzapdIxZce4oAUYJ7k3rilW6VwkZO-5qf1QlX3WMKUjODIW8en7RT3JQoj2Zch5um_UaHZLZ3dafIwqX-Q=s0"
            alt="School Logo" width="180" height="36"
          />
        </div>
        <div>
          <div className="w-6 h-6 pl-14 cursor-pointer" onClick={handleMenuClick}>
         
          </div>
        </div>
      </div>
      
        <div className="ml-80 p-4 flex items-center">
          <div className="flex items-center text-lg font-normal">
            <span className="flex pl-3 pr-2 items-center gap-1"><ul>Grow</ul>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg></span>
            <span className="flex pl-3 pr-2 items-center gap-1">visible<ul>Learn</ul>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg></span>
            <span className="flex pl-3 pr-2"><ul>Tools</ul></span>
            <span className="flex pl-3 pr-2"><ul>Join</ul></span>
            <span className="flex pl-3 pr-2"><ul>Reach</ul></span>
          </div>
          <div className="ml-4 p-4 items-center flex">
            <button className="w-36 h-9 bg-orange-500 rounded-2xl"><p className="px-4 py-2 text-white font-normal">Join Forge</p></button>
          </div>
        </div>
      </div>
 
  );
};
 