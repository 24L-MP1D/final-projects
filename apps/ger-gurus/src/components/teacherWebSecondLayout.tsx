'use client';

import { Pause, Play } from "lucide-react"; // Import Lucide icons
import Image from "next/image";
import { useEffect, useRef, useState, useState as useStateReact } from "react";

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

const TeacherWebSecondLayout: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [isVisible, setIsVisible] = useStateReact(false);
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

  return (
    <div className="bg-zinc-50 flex pt-36">
      <div className="pl-40 h-[790px] relative">
        <video
          ref={videoRef}
          className="rounded-3xl object-cover w-[90%] h-[78%]"
          autoPlay
          muted
          loop
          aria-label="Educational video"
        >
          <source src="/home-video.mp4" type="video/mp4" />
        </video>

        <div
          onClick={handlePlayPause}
          className="absolute top-80 left-[670px] transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="text-green-500 w-8 h-8" />
          ) : (
            <Play className="text-green-500 w-8 h-8" />
          )}
        </div>
      </div>

      <div className="text-emerald-950 font-deacon">
        <div
          ref={textRef}
          className={`text-8xl font-black flex flex-col text-green-600 ${isVisible ? "fade-in-up" : ""}`}
        >
          <h1 className="text-8xl font-black text-green-600">
            DOING GOOD,
          </h1>
          <h1 className="myclass text-8xl font-black text-white">
            TOGETHER.
          </h1>
        </div>
        <div className="mt-14 flex flex-col gap-20">
          <div className="text-2xl w-[749px]">
            “Running a startup apparel business can be difficult; and managing
            cashflow has always been one of our most important challenges. Kikin
            helped us navigate this with their quick and easy application process
            and rapid turn around time. I've already recommended them to a number of
            other businesses we know!”
          </div>
          <div className="flex flex-col">
            <Image src="/verse.png" width={99} height={29.3} alt="Logo" />
            <div className="flex gap-[300px]">
              <p>Michael Vachon, Founder at Citizens of Soil</p>
              <div className="flex gap-6 mt-[-20px]">
                <div className="border rounded-full w-16 h-16 border-green-500 text-xl">
                  <p className="pl-5 pt-4">←</p>
                </div>
                <div className="border rounded-full w-16 h-16 border-green-500 text-xl">
                  <p className="pl-5 pt-4">→</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{globalStyles}</style>
    </div>
  );
};

export default TeacherWebSecondLayout;
