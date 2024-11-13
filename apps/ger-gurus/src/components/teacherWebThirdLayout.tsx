'use client';

import { Pause, PlayIcon } from 'lucide-react';
import { useState } from 'react';

const TeacherWebThirdLayout: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({
    'free-0': true,
    'free-1': true,
    'free-2': true,
    'new-0': true,
    'new-1': true,
    'new-2': true,
  });

  const freeVideos = [
    { id: 1, src: '/home-video.mp4', alt: 'Video 1' },
    { id: 2, src: '/home-video.mp4', alt: 'Video 2' },
    { id: 3, src: '/home-video.mp4', alt: 'Video 3' },
  ];

  const newVideos = [
    { id: 1, src: '/home-video.mp4', alt: 'Video 1' },
    { id: 2, src: '/home-video.mp4', alt: 'Video 2' },
    { id: 3, src: '/home-video.mp4', alt: 'Video 3' },
  ];

  const freeTexts = [
    { title: 'Video 1' },
    { title: 'Video 2' },
    { title: 'Video 3' },
  ];

  const newTexts = [
    { title: 'Video 1' },
    { title: 'Video 2' },
    { title: 'Video 3' },
  ];

  const handlePlayPause = (section: string, index: number) => {
    const videoId = `${section}-${index}`;
    const videoElement = document.getElementById(videoId) as HTMLVideoElement;

    if (videoElement) {
      if (isPlaying[videoId]) {
        videoElement.pause();
      } else {
        videoElement.play();
      }

      setIsPlaying(prevState => ({
        ...prevState,
        [videoId]: !prevState[videoId],
      }));
    }
  };

  return (
    <div className="h-[600px] p-8 font-deacon max-w-[1600px] mx-auto">
      {/* Free Lessons Section */}
      <div className="mb-8">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-700">ШИНЭ ХИЧЭЭЛҮҮД</h1>
        </div>

        <div className="flex gap-8 justify-center">
          {freeVideos.map((video, index) => (
            <div key={video.id} className="relative">
              <video
                id={`free-${index}`}
                className="rounded-md shadow-sm w-[450px]"
                muted
                loop
                aria-label={video.alt}
              >
                <source src={video.src} type="video/mp4" />
              </video>

              <div className="text-center mt-2 text-gray-600">{freeTexts[index]?.title}</div>

              <div
                onClick={() => handlePlayPause('free', index)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-lg cursor-pointer"
              >
                {isPlaying[`free-${index}`] ? (
                  <Pause className="text-green-600 w-6 h-6" />
                ) : (
                  <PlayIcon className="text-green-600 w-6 h-6" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Lessons Section */}
      <div>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-700">ҮНЭГҮЙ ХИЧЭЭЛҮҮД</h1>
        </div>

        <div className="flex gap-6 justify-center">
          {newVideos.map((video, index) => (
            <div key={video.id} className="relative">
              <video
                id={`new-${index}`}
                className="rounded-md shadow-sm w-[450px]"
                muted
                loop
                aria-label={video.alt}
              >
                <source src={video.src} type="video/mp4" />
              </video>

              <div className="text-center mt-2 text-gray-600">{newTexts[index]?.title}</div>

              <div
                onClick={() => handlePlayPause('new', index)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-lg cursor-pointer"
              >
                {isPlaying[`new-${index}`] ? (
                  <Pause className="text-green-600 w-6 h-6" />
                ) : (
                  <PlayIcon className="text-green-600 w-6 h-6" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 border-green-300 border"/>
    </div>
  );
};

export default TeacherWebThirdLayout;
