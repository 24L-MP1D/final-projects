'use client';

import { motion } from 'framer-motion';
import { Pause, PlayIcon } from 'lucide-react';
import { useState } from 'react';

const TeacherWebThirdLayout: React.FC = () => {
  const [currentIndexFree, setCurrentIndexFree] = useState(4); // Start from the 5th video (index 4) for free lessons
  const [currentIndexNew, setCurrentIndexNew] = useState(4); // Start from the 5th video (index 4) for new lessons
  const [isPlaying, setIsPlaying] = useState<boolean[]>(new Array(9).fill(true)); // Track play/pause state for each video

  // Videos data for each section
  const freeVideos = [
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 1' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 2' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 3' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 4' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 5' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 6' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 7' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 8' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 9' },
    { src: '/home-video.mp4', alt: 'Үнэгүй хичээл 10' },
  ];

  const newVideos = [
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 1' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 2' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 3' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 4' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 5' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 6' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 7' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 8' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 9' },
    { src: '/home-video.mp4', alt: 'Шинэ хичээл 10' },
  ];

  // Titles for each video section (for free lessons)
  const freeTexts = [
    { title: 'Алгебр', subtitle: 'Үндсэн ойлголтууд' },
    { title: 'Геометр', subtitle: 'Гэрэлт угол' },
    { title: 'Тригонометр', subtitle: 'Синус, Косинус' },
    { title: 'Калкулус', subtitle: 'Нэгтгэл' },
    { title: 'Шууд тооцоолол', subtitle: 'Энгийн тэгшитгэл' },
    { title: 'Алгебр', subtitle: 'Үндсэн ойлголтууд' },
    { title: 'Геометр', subtitle: 'Гэрэлт угол' },
    { title: 'Тригонометр', subtitle: 'Синус, Косинус' },
    { title: 'Калкулус', subtitle: 'Нэгтгэл' },
    { title: 'Шууд тооцоолол', subtitle: 'Энгийн тэгшитгэл' },
  ];

  // Titles for each video section (for new lessons)
  const newTexts = [
    { title: 'Психология', subtitle: 'Нэмэлт хичээл' },
    { title: 'Хими', subtitle: 'Органик химийн үзүүлэлтүүд' },
    { title: 'Физик', subtitle: 'Динамик ба статик' },
    { title: 'Математик', subtitle: 'Шинэ арга барил' },
    { title: 'Хүмүүнлэгийн шинжлэх ухаан', subtitle: 'Нийгмийн асуудлууд' },
    { title: 'Психология', subtitle: 'Нэмэлт хичээл' },
    { title: 'Хими', subtitle: 'Органик химийн үзүүлэлтүүд' },
    { title: 'Физик', subtitle: 'Динамик ба статик' },
    { title: 'Математик', subtitle: 'Шинэ арга барил' },
    { title: 'Хүмүүнлэгийн шинжлэх ухаан', subtitle: 'Нийгмийн асуудлууд' },
  ];

  // Handle play/pause functionality
  const handlePlayPause = (index: number) => {
    const videoElement = document.getElementById(`video-${index}`) as HTMLVideoElement;
    if (videoElement) {
      if (isPlaying[index]) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      const updatedPlayState = [...isPlaying];
      updatedPlayState[index] = !isPlaying[index];
      setIsPlaying(updatedPlayState);
    }
  };

  // Scroll to the next or previous video in the slider
  const scrollToNextVideo = (slider: 'free' | 'new') => {
    if (slider === 'free') {
      setCurrentIndexFree((prevIndex) => (prevIndex + 1) % freeVideos.length);
    } else {
      setCurrentIndexNew((prevIndex) => (prevIndex + 1) % newVideos.length);
    }
  };

  const scrollToPreviousVideo = (slider: 'free' | 'new') => {
    if (slider === 'free') {
      setCurrentIndexFree((prevIndex) => (prevIndex - 1 + freeVideos.length) % freeVideos.length);
    } else {
      setCurrentIndexNew((prevIndex) => (prevIndex - 1 + newVideos.length) % newVideos.length);
    }
  };

  return (
    <div className="h-[600px] px-16 py-8 font-deacon flex flex-col gap-4">
      <div className="flex flex-col gap-32">
        {/* Free Lessons Section */}
        <div className="relative w-full flex justify-center flex-col gap-3">
          <div className="font-black flex gap-3">
            <motion.h1
              className="myclass text-4xl font-black text-white hero_h1-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              ШИНЭ 
            </motion.h1>
            <motion.h1
              className="text-4xl font-black text-green-600 hero_h1-green"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              ХИЧЭЭЛҮҮД
            </motion.h1>
          </div>

          {/* Navigation Arrows */}
          {['left', 'right'].map((direction, idx) => {
            const isLeft = direction === 'left';
            const handleClick = isLeft ? () => scrollToPreviousVideo('free') : () => scrollToNextVideo('free');
            const arrow = isLeft ? '←' : '→';
            const positionClass = isLeft ? 'left-[-30px]' : 'right-[-30px]';
            return (
              <div
                key={direction}
                className={`absolute top-1/2 ${positionClass} transform -translate-y-1/2 z-10`}
              >
                <div
                  onClick={handleClick}
                  className="bg-green-500 bg-opacity-70 hover:bg-opacity-100 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
                >
                  <div className="border rounded-full w-16 h-16 border-green-500 text-xl flex justify-center items-center">
                    <p className="pt-1 text-black">{arrow}</p>
                  </div>
                </div>
              </div>
            );
          })}


          {/* Free Lessons Video Slider */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex gap-[20px] transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndexFree % freeVideos.length) * 25}%)`, // Adjusted calculation for 4 videos per view
              }}
            >
              {freeVideos.map((video, index) => (
                <div
                  key={video.src}
                  className="relative w-[25%] min-w-[25%] h-[65%] rounded-3xl overflow-hidden"
                >
                  <div className="relative w-full h-full flex flex-col gap-3">
                    <video
                      id={`video-${index}`}
                      className="rounded-3xl object-cover w-full h-full transition-opacity duration-500"
                      autoPlay
                      muted
                      loop
                      aria-label={video.alt}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    <div className="font-black flex gap-3 pl-6">
                      <motion.h2
                        className="myclass text-2xl font-black text-white hero_h1-white"
                        initial={{ opacity: 0, y: 50, x: 100 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 1 }}
                      >
                        {freeTexts[index]?.title}
                      </motion.h2>
                      <motion.h2
                        className="text-2xl font-black text-green-600 hero_h1-green"
                        initial={{ opacity: 0, y: 50, x: 100 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      >
                        {freeTexts[index]?.subtitle}
                      </motion.h2>
                    </div>

                    <div
                      onClick={() => handlePlayPause(index)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
                    >
                      {isPlaying[index] ? (
                        <Pause className="text-white w-8 h-8" />
                      ) : (
                        <PlayIcon className="text-white w-8 h-8" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* New Lessons Section */}
        <div className="relative w-full flex justify-center flex-col gap-3">
          <div className="font-black flex gap-3">
            <motion.h1
              className="myclass text-4xl font-black text-white hero_h1-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              ҮНЭГҮЙ 
            </motion.h1>
            <motion.h1
              className="text-4xl font-black text-green-600 hero_h1-green"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              ХИЧЭЭЛҮҮД
            </motion.h1>
          </div>

          {/* Navigation Arrows */}
          {['left', 'right'].map((direction, idx) => {
            const isLeft = direction === 'left';
            const handleClick = isLeft ? () => scrollToPreviousVideo('new') : () => scrollToNextVideo('new');
            const arrow = isLeft ? '←' : '→';
            const positionClass = isLeft ? 'left-[-30px]' : 'right-[-30px]';
            return (
              <div
                key={direction}
                className={`absolute top-1/2 ${positionClass} transform -translate-y-1/2 z-10`}
              >
                <div
                  onClick={handleClick}
                  className="bg-green-500 bg-opacity-70 hover:bg-opacity-100 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
                >
                  <div className="border rounded-full w-16 h-16 border-green-500 text-xl flex justify-center items-center">
                    <p className="pt-1 text-black">{arrow}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* New Lessons Video Slider */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex gap-[20px] transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndexNew % newVideos.length) * 25}%)`, // Adjusted calculation for 4 videos per view
              }}
            >
              {newVideos.map((video, index) => (
                <div
                  key={video.src}
                  className="relative w-[25%] min-w-[25%] h-[65%] rounded-3xl overflow-hidden"
                >
                  <div className="relative w-full h-full flex flex-col gap-3">
                    <video
                      id={`video-${index + 5}`}
                      className="rounded-3xl object-cover w-full h-full transition-opacity duration-500"
                      autoPlay
                      muted
                      loop
                      aria-label={video.alt}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    <div className="font-black flex gap-3 pl-6">
                      <motion.h2
                        className="myclass text-2xl font-black text-white hero_h1-white"
                        initial={{ opacity: 0, y: 50, x: 100 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 1 }}
                      >
                        {newTexts[index]?.title}
                      </motion.h2>
                      <motion.h2
                        className="text-2xl font-black text-green-600 hero_h1-green"
                        initial={{ opacity: 0, y: 50, x: 100 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      >
                        {newTexts[index]?.subtitle}
                      </motion.h2>
                    </div>

                    <div
                      onClick={() => handlePlayPause(index + 5)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
                    >
                      {isPlaying[index + 5] ? (
                        <Pause className="text-white w-8 h-8" />
                      ) : (
                        <PlayIcon className="text-white w-8 h-8" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherWebThirdLayout;
