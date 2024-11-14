'use client';
import { useAuthStore } from '@/components/components/useAuthStore';
import FlowText from '@/components/FlowText';
import FooterOfSchool from '@/components/footerOfSchool';
import { LoginByDialog } from '@/components/LoginByDialog';
import LogoGallery from '@/components/LogoGallery';
import TeacherWebSecondLayout from '@/components/teacherWebSecondLayout';
import TeacherWebThirdLayout from '@/components/teacherWebThirdLayout';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/fetcher';
import { motion } from 'framer-motion';
import { CircleUser } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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

interface CurrentSchool {
  ownerName: string;
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<string>('light');
  const [domain, setDomain] = useState<string>();
  const inputRef = useRef<HTMLDivElement>(null);
  const [currentSchool, setCurrentSchool] = useState<CurrentSchool>();

  console.log({ currentSchool });

  async function getCurrentSchool() {
    try {
      const response = await fetcher().get(`api/currentSchool`);
      setCurrentSchool(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentSchool();
    const hostname = window.location.hostname;
    setDomain(hostname);
    const currentHostname = hostname === 'localhost' ? process.env.CURRENT_HOST : hostname;
    console.log(currentHostname);
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme || 'light');

    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme || 'light');

      window.addEventListener('storage', handleThemeChange);

      return () => {
        window.removeEventListener('storage', handleThemeChange);
      };
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const deleteCookie = () => {
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn;  Secure; SameSite=Lax';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn;  Secure; SameSite=Lax';
    window.location.reload();
  };

  const bubbleStyle = (duration: number = 5, delay: number = 0): React.CSSProperties => ({
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0.5,
    zIndex: 10,
    pointerEvents: 'none',
    animation: `floatBubbles ${duration}s ease-in-out infinite ${delay}s`,
    boxShadow: theme === 'dark' ? '0 0 15px 10px rgba(52, 211, 153, 0.5)' : '0 0 15px 10px rgba(100, 255, 118, 0.5)',
    backgroundColor: theme === 'dark' ? '#43A047' : '#A5D6A7',
  });

  return (
    <main className="max-w-[1600px] mx-auto relative bg-base-100">
      <div className="flex justify-between items-center py-5 px-10">
        {/* Logo */}
        {/* {loading && <div>loading...</div>}
        {domain && !loading && <div>{domain} -н сургууль</div>} */}
        <div className="flex items-center w-60 h-12">
          <Image priority={true} src="/verse.png" width={99} height={29.3} alt="Logo" />
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
          <li className="hover:text-green-600 cursor-pointer transition-all duration-200">БАГШИЙН ТУХАЙ</li>
        </ul>
        {/* Buttons */}
        <div className="flex gap-3 relative">
          <LoginByDialog onOpen={open} setOpen={setOpen} />
          {currentUser ? (
            <div className="flex items-center">
              <CircleUser size={30} onClick={toggleDropdown} className="cursor-pointer" />
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <ul className="flex flex-col">
                    <li onClick={deleteCookie} className="p-2 hover:bg-gray-100 cursor-pointer">
                      Гарах
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className="text-black bg-white hover:bg-gray-200 border border-black hover:border-slate-500 btn">
              НЭВТРЭХ
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <style>{globalStyles}</style>

        {/* Floating Bubbles */}
        <div className="absolute top-24 left-0 w-full h-[500px] mt-[-145px] overflow-hidden">
          <div style={{ ...bubbleStyle(3, 0), width: '120px', height: '120px', top: '20%', left: '0%' }}></div>
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
        <div className="flex flex-col items-center mx-auto mt-20">
          <div className="text-9xl font-black text-green-600">
            <motion.h1 className="myclass text-9xl font-black text-white hero_h1-white text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              {currentSchool?.ownerName}-н вэбсайтад
            </motion.h1>

            <motion.h1 className="text-9xl font-black text-green-600 hero_h1-green text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
              тавтай морилно уу !
            </motion.h1>
          </div>

          <div className="w-[671px] h-16 mx-auto text-center mt-6">
            <motion.p
              className="text-base mt-6"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 4, ease: 'easeInOut', delay: 0.6, type: 'spring', stiffness: 250, damping: 20 }}
            >
              Манай вебсайт нь дижитал артын салбарт шилдэг туршлагуудыг танилцуулж, суралцагчдад чанартай мэдлэгийг хялбархан, хүртээмжтэйгээр хүргэх зорилготой...
            </motion.p>

            <div className="mt-6">
              {/* VIDEO IS HERE
              <iframe
                src="https://player.vimeo.com/video/1029540703?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                width="720"
                height="900"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="42.Ажил #2"
              ></iframe> */}
              <Button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg btn cursor-pointer scale-75">ЗАХИАЛАХ</Button>
            </div>
          </div>
        </div>
        <div className="mt-40 border-green-500 border-t" />
      </div>
      <TeacherWebThirdLayout />
      <FlowText />
      <TeacherWebSecondLayout />
      <LogoGallery />
      <FooterOfSchool />
    </main>
  );
}
