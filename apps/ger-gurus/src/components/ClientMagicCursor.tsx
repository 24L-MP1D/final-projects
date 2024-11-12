'use client';

import { useState } from 'react';
import { FaPlay } from 'react-icons/fa6';

export default function MagneticPlayButton() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorPos({ x: 0, y: 0 });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isHovered) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      setCursorPos({ x, y });
    }
  };

  return (
    <div
      className="relative w-3xl h-[432px] aspect-video bg-transparent flex items-center justify-center overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <button
        type="button"
        title="Play Video"
        className="absolute bg-black/20 text-white/70 text-5xl rounded-full flex justify-center items-center w-32 h-32 transform transition-transform duration-700 ease-out"
        style={{
          transform: isHovered ? `translate(${cursorPos.x / 12}px, ${cursorPos.y / 12}px)` : 'translate(0, 0)',
        }}
      >
        <FaPlay className="ml-2" />
      </button>
    </div>
  );
}
