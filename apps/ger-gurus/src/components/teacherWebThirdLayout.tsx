'use client';

import { Pause, PlayIcon } from 'lucide-react';
import { useState } from 'react';

const globalStyles = `
.myclass {
    text-shadow: 
      1px 1px 0 black, 
      -1px -1px 0 black,
      1px -1px 0 black, 
      -1px 1px black;
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

const TeacherWebThirdLayout: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const videos = [
    { src: '/video.mp4', alt: 'Educational video 1' },
    { src: '/video.mp4', alt: 'Educational video 2' },
    { src: '/video.mp4', alt: 'Educational video 3' },
    { src: '/video.mp4', alt: 'Educational video 4' },
    { src: '/video.mp4', alt: 'Educational video 5' },
  ];

  const handlePlayPause = () => {
    const videoElement = document.getElementById(`video-${currentIndex}`) as HTMLVideoElement;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToNextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const scrollToPreviousVideo = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  // Step-specific data
  const steps = [
    {
      number: '01',
      title: { main: 'Grow with', highlight: 'the flow.' },
      description:
        'We help you preserve your cash, so that you can focus on growing your business and improve cash flow.',
    },
    {
      number: '02',
      title: { main: 'Maximize your', highlight: 'potential.' },
      description:
        'Take your business to the next level with expert insights and personalized guidance.',
    },
  ];

  // Create navigation items dynamically
  const navigationItems = [
    { direction: 'previous', icon: '←', action: scrollToPreviousVideo },
    { direction: 'next', icon: '→', action: scrollToNextVideo },
  ];

  return (
    <div className="h-[600px] px-16 pt-48 font-deacon">
      <div className="flex flex-col gap-32">
        {/* Iterate over steps to create each section */}
        {steps.map((step, index) => (
          <div key={step.number} className="flex gap-80">
            {/* Text and Description Section for each step */}
            <div className="flex flex-col gap-16">
              <div className="bg-green-500 font-semibold rounded-full w-10 h-10 flex items-center justify-center">
                <p className="text-center pt-1">{step.number}</p>
              </div>
              <div className="w-[534px] mt-5">
                <p className="myclass font-bold text-8xl text-white">{step.title.main}</p>
                <p className="font-bold text-8xl text-green-500">{step.title.highlight}</p>
              </div>
              <div className="text-lg w-[676px] text-emerald-950">{step.description}</div>
            </div>

            {/* Video Carousel Section for each step */}
            <div className="pl-40 h-[790px] relative flex flex-col">
              <div className="relative w-full h-[65%]">
                {/* Display the video based on currentIndex */}
                <video
                  id={`video-${currentIndex}`}
                  className="rounded-3xl object-cover w-full h-full transition-opacity duration-500"
                  autoPlay
                  muted
                  loop
                  aria-label={videos[currentIndex].alt}
                  style={{
                    opacity: 1,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                >
                  <source src={videos[currentIndex].src} type="video/mp4" />
                </video>

                {/* Play/Pause Button */}
                <div
                  onClick={handlePlayPause}
                  className="absolute top-60 left-[465px] transform -translate-x-1/2 -translate-y-1/2 bg-green-400 bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="text-white w-8 h-8" />
                  ) : (
                    <PlayIcon className="text-white w-8 h-8" />
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              {navigationItems.map((item) => (
                <div
                  key={item.direction}
                  onClick={item.action}
                  className={`absolute top-60 ${item.direction === 'previous' ? 'left-28' : 'right-[-108px]'} transform -translate-x-1/2 -translate-y-1/2 bg-green-500 bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer`}
                >
                  <div className="border rounded-full w-16 h-16 border-green-500 text-xl flex justify-center items-center">
                    <p className="pt-1 text-black">{item.icon}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherWebThirdLayout;
