'use client';

import { useEffect, useRef, useState } from 'react';

export default function FlowText({ flow }: { flow: string | undefined }) {
  const [colors, setColors] = useState<string[]>([]);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const text = flow || 'ГАРАГИЙН ТӨЛӨӨ хийгээрэй БИЗНЕСИЙНХЭЭ ТӨЛӨӨ хийгээрэй. ТАНЫ ESG ОНОО САЙХАН АВАХ тусам ХӨНГӨЛӨЛТ ТӨЛӨӨ БОЛНО.';

  // Splitting text into lines of approximately 23 characters
  const textLines = text.split(' ').reduce(
    (acc: string[], word) => {
      const currentLine = acc[acc.length - 1];
      if (!currentLine || currentLine.length + word.length < 23) {
        acc[acc.length - 1] = (currentLine ? currentLine + ' ' : '') + word;
      } else {
        acc.push(word);
      }
      return acc;
    },
    ['']
  );

  useEffect(() => {
    const handleScroll = () => {
      const halfScreenHeight = window.innerHeight / 2;
      const newColors = textLines.map((_, index) => {
        const line = textRef.current?.children[index] as HTMLElement | null;
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
  }, [textLines]);

  return (
    <div className="h-[60vh] pt-[20vh] text-center font-black font-[Deacon] mt-4">
      <p ref={textRef} className="text-stroke transition-colors duration-500 text-[74px] font-black leading-none">
        {textLines.map((line, index) => (
          <span key={index} className={`${colors[index] || 'text-[#2E7D32]'}`} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </p>
      <div className="mt-44 border-green-500 border-t" />
    </div>
  );
}
