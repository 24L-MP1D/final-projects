'use client';

import { useState } from 'react';

export default function Test() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        <div
          style={{ backgroundImage: 'url(1.jpg)', opacity: selectedIndex === 1 ? 1 : 0, transform: selectedIndex === 1 ? 'scale(1)' : 'scale(1.1)' }}
          className="absolute saturate-[.75] inset-0 bg-cover scale-110 hover:scale-100 transition-transform ease-out duration-[2000ms]"
        ></div>
        <div
          style={{ backgroundImage: 'url(2.jpg)', opacity: selectedIndex === 2 ? 1 : 0, transform: selectedIndex === 2 ? 'scale(1)' : 'scale(1.1)' }}
          className="absolute saturate-[.75] inset-0 bg-cover scale-110 hover:scale-100 transition-transform ease-out duration-[2000ms]"
        ></div>
        <div
          style={{ backgroundImage: 'url(11.jpg)', opacity: selectedIndex === 3 ? 1 : 0, transform: selectedIndex === 3 ? 'scale(1)' : 'scale(1.1)' }}
          className="absolute saturate-[.75] inset-0 bg-cover scale-100 transition-transform ease-out duration-[2000ms]"
        ></div>
        <div
          style={{ backgroundImage: 'url(4.jpg)', opacity: selectedIndex === 4 ? 1 : 0, transform: selectedIndex === 4 ? 'scale(1)' : 'scale(1.1)' }}
          className="absolute saturate-[.75] inset-0 bg-cover scale-110 hover:scale-100 transition-transform ease-out duration-[2000ms]"
        ></div>
      </div>
      <div className="absolute m-auto left-0 right-0 top-0 bottom-0 h-4/6 w-1/4 bg-cover overflow-hidden" style={{ backgroundImage: `url(${selectedIndex}.jpg)` }}></div>
      <div className="flex flex-col gap-96 justify-center items-center absolute text-white font-serif text-9xl m-auto left-0 right-0 top-0 bottom-0 ">
        <div className="flex gap-96">
          <p className="hover:text-[#f0b579]" onMouseEnter={() => setSelectedIndex(1)}>
            Image 1
          </p>
          <p className="hover:text-[#f0b579]" onMouseEnter={() => setSelectedIndex(2)}>
            Image 2
          </p>
        </div>
        <div className="flex gap-96 ">
          <p className="hover:text-[#f0b579]" onMouseEnter={() => setSelectedIndex(3)}>
            Image 3
          </p>
          <p className="hover:text-[#f0b579]" onMouseEnter={() => setSelectedIndex(4)}>
            Image 4
          </p>
        </div>
      </div>
    </div>
  );
}
