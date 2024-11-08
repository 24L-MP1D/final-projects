'use client';

import TeacherWebThirdLayout from '@/components/teacherWebThirdLayout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const globalStyles = `
  @keyframes floatBubbles {
    0% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
    100% { transform: translateY(0); }  
  }

  @keyframes fadeInMoveUp {
    0% { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .hero_h1-white {
    animation: fadeInMoveUp 1s ease-out forwards;
  }

  .hero_h1-green {
    animation: fadeInMoveUp 1s ease-out 0.3s forwards;
  }

  .myclass {
    text-shadow: 
      1px 1px 0 black, 
      -1px -1px 0 black,
      1px -1px 0 black, 
      -1px 1px black;
  }
`;

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const authtoken = urlParams.get('authtoken');
      if (authtoken) {
        localStorage.setItem('authtoken', authtoken);
        window.history.replaceState({}, document.title, '/');
      }
    }
  }, []);

  const bubbleStyle = (duration: number = 5, delay: number = 0): React.CSSProperties => ({
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#43A047',
    opacity: 0.5,
    zIndex: -1,
    pointerEvents: 'none',
    animation: `floatBubbles ${duration}s ease-in-out infinite ${delay}s`,
    boxShadow: '0 0 15px 10px rgba(52, 211, 153, 0.5)',
  });

  return (
    <main>
      <div className="flex justify-between items-center py-5 px-10" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Logo */}
        <div className="flex items-center w-60 h-12">
          <Image src="/verse.png" width={99} height={29.3} alt="Logo" />
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-green-950" aria-expanded={isMenuOpen ? 'true' : 'false'} aria-label="Toggle navigation menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <ul className={`md:flex gap-6 text-base text-green-950 items-center font-bold ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
          <li className="hover:text-green-600 cursor-pointer transition-all duration-200">ХИЧЭЭЛ</li>
          <li className="hover:text-green-600 cursor-pointer transition-all duration-200">БАГШИЙН ТАНИЛЦУУЛГА</li>
        </ul>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Button with cursor-pointer and hover effect */}
          <Button variant="teacherButton" className="cursor-pointer bg-white text-black border border-black hover:border-slate-500 hover:text-slate-500 transition duration-200">
            НЭВТРЭХ
          </Button>
          <Button variant="teacherButton" className="cursor-pointer bg-green-600 hover:bg-green-700 transition duration-200">
            ЗАХИАЛАХ
          </Button>
        </div>
      </div>

      <div className="relative">
        <style>{globalStyles}</style>

        {/* Floating Bubbles */}
        <div className="absolute top-0 left-0 w-full h-[500px] mt-[-145px] overflow-hidden">
          <div style={{ ...bubbleStyle(3, 0), width: '120px', height: '120px', top: '10%', left: '15%' }}></div>
          <div style={{ ...bubbleStyle(4, 1), width: '100px', height: '100px', top: '25%', left: '60%' }}></div>
          <div style={{ ...bubbleStyle(5, 2), width: '90px', height: '90px', top: '80%', left: '30%' }}></div>
          <div style={{ ...bubbleStyle(3, 3), width: '80px', height: '80px', top: '70%', left: '75%' }}></div>
          <div style={{ ...bubbleStyle(4, 4), width: '110px', height: '110px', top: '20%', left: '80%' }}></div>
          <div style={{ ...bubbleStyle(5, 5), width: '70px', height: '70px', top: '55%', left: '15%' }}></div>
          <div style={{ ...bubbleStyle(3, 6), width: '110px', height: '110px', top: '30%', left: '25%' }}></div>
          <div style={{ ...bubbleStyle(4, 7), width: '100px', height: '100px', top: '40%', left: '45%' }}></div>
          <div style={{ ...bubbleStyle(5, 8), width: '150px', height: '150px', top: '68%', left: '89%' }}></div>
          <div style={{ ...bubbleStyle(4, 9), width: '95px', height: '95px', top: '58%', left: '3%' }}></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center mx-auto mt-20" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <div className="text-9xl font-black text-green-600">
            <motion.h1 className="myclass text-9xl font-black text-white hero_h1-white text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              ИРЭЭДҮЙДЭЭ
            </motion.h1>

            <motion.h1 className="text-9xl font-black text-green-600 hero_h1-green text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
              ХӨРӨНГӨ ОРУУЛ
            </motion.h1>
          </div>

          <div className="w-[671px] h-16 mx-auto text-center text-green-950 mt-6">
            <motion.p
              className="text-base mt-6"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 4, ease: 'easeInOut', delay: 0.6, type: 'spring', stiffness: 250, damping: 20 }}
            >
              Манай вебсайт нь боловсролын салбарт шилдэг туршлагуудыг танилцуулж, суралцагчдад чанартай мэдлэгийг хялбархан, хүртээмжтэйгээр хүргэх зорилготой. Бид сургалтын хөтөлбөрүүд, онлайн
              сургалтууд болон боловсролын нөөцүүдийг олон нийтэд хүргэж, сурах процессыг илүү сонирхолтой, үр дүнтэй болгохын тулд инноваци, боловсруулалтыг эрэлхийлж байна.
            </motion.p>

            <div className="mt-6">
              <Button variant="teacherButton" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 ease-in-out cursor-pointer mb-40">
                ЗАХИАЛАХ
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-40 border-green-300 border" />
      </div>
      <TeacherWebThirdLayout />
    </main>
  );
}
