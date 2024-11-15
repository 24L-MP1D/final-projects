'use client';

import { useEffect, useRef, useState as useStateReact } from 'react';

const globalStyles = `
.myclass {
    text-shadow: 
      1px 1px 0 black, 
      -1px -1px 0 black,
      1px -1px 0 black, 
      -1px 1px black;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

/* Custom font import */
@font-face {
  font-family: 'Deacon';
  src: url('/fonts/Deacon-Regular.woff2') format('woff2'),
       url('/fonts/Deacon-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.font-deacon {
  font-family: 'Deacon', sans-serif;
}
`;

const TeacherWebSecondLayout: React.FC<{ intro: string; desc: string | undefined }> = ({
  intro = 'Default intro', // Provide a default if intro is undefined
  desc,
}) => {
  const pages = [
    {
      header: intro,
      paragraph: desc,
      image: '10.jpg',
    },
  ];
  const [currentPage, setCurrentPage] = useStateReact(0); // Track the current page index
  const [isVisible, setIsVisible] = useStateReact(false);
  const [isAnimationInProgress, setIsAnimationInProgress] = useStateReact(false); // Track animation state
  const textRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer to trigger fadeInUp animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Trigger the animation when element is visible
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const goToNextPage = () => {
    if (isAnimationInProgress) return; // Prevents triggering multiple animations at once
    setIsAnimationInProgress(true);
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length); // Cycle to next page
  };

  const goToPrevPage = () => {
    if (isAnimationInProgress) return; // Prevents triggering multiple animations at once
    setIsAnimationInProgress(true);
    setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length); // Cycle to previous page
  };

  // Reset the visibility and animation state after a new page is set
  useEffect(() => {
    setIsVisible(false); // Reset visibility to trigger animation on page change
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimationInProgress(false); // Allow for next animation
    }, 500); // Wait for a short period before re-enabling animation
    return () => clearTimeout(timer);
  }, [currentPage]);

  const { header, paragraph, image } = pages[currentPage]; // Get current page content

  return (
    <div className="flex mt-48 max-w-[1500px] mx-auto">
      <div className="text-emerald-950 font-deacon">
        <div ref={textRef} className={`text-8xl font-black flex flex-col text-green-600 ${isVisible ? 'fade-in-up' : ''}`}>
          <h1 className="text-7xl font-black text-green-600">{header}</h1>
        </div>
        <div className="mt-14 flex flex-col gap-20">
          <div className="text-1xl w-[749px]">{paragraph}</div>
          <div className="flex flex-col">
            <div className="flex gap-[300px]">
              <p className="text-green-500">Сургууль</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-40 transition-all ease-in-out duration-500">
        <img src={image} className="rounded-3xl object-cover" alt="Page image" />
      </div>
      <style jsx>{globalStyles}</style>
    </div>
  );
};

export default TeacherWebSecondLayout;
