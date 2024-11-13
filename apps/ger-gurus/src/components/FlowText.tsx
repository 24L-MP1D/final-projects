'use client';

import { useEffect, useRef, useState } from 'react';

export default function FlowText() {
  const [colors, setColors] = useState<string[]>([]);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const halfScreenHeight = window.innerHeight / 2;
      const newColors = linesRef.current.map((line) => {
        if (line) {
          const rect = line.getBoundingClientRect();
          return rect.top > halfScreenHeight && rect.bottom > halfScreenHeight ? 'text-[#566053]' : 'text-[#4CAF50]';
        }
        return 'text-[#566053]';
      });
      setColors(newColors);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textLines = ['DO IT FOR THE PLANET', 'DO IT FOR YOUR BUSINESS', 'THE BETTER YOUR ESG', 'SCORE GETS, THE BIGGER', 'THE DISCOUNTS'];

  return (
    <div className="h-[60vh] pt-[20vh]">
      <div className="text-center font-black font-[Deacon] mt-4">
        {textLines.map((line, index) => (
          <p
            key={index}
            ref={(el) => {
              linesRef.current[index] = el;
            }}
            className={`text-stroke ${colors[index] || 'text-[#2E7D32]'} transition-colors duration-500 text-[74px] font-black leading-none`}
          >
            {line}
          </p>
        ))}
      </div>
      <div className="mt-44 border-green-500 border-t" />
    </div>
  );
}
