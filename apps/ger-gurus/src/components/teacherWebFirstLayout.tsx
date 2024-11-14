'use client';

import { motion } from 'framer-motion';
import TeacherWebFirstLayoutHeader from './teacherWebFirstLayoutHeader';
import { Button } from './ui/button';

// Defining global styles
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

// Defining the bubbleStyle function with faster animation
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

// Component function for TeacherWebFirstLayout
const TeacherWebFirstLayout: React.FC = () => {
  return (
    <div className="relative">
      <style>{globalStyles}</style>

      {/* Header Component */}
      <TeacherWebFirstLayoutHeader />

      {/* Floating Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
          <motion.h1 className="myclass text-9xl font-black text-white hero_h1-white ml-14" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            FINANCING
          </motion.h1>

          <motion.h1 className="text-9xl font-black text-green-600 hero_h1-green" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            THE FUTURE
          </motion.h1>
        </div>

        <div className="w-[471px] h-16 mx-auto text-center text-green-950 mt-8">
          <motion.p
            className="text-base mt-6"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 4, ease: 'easeInOut', delay: 0.6, type: 'spring', stiffness: 250, damping: 20 }}
          >
            Pay suppliers faster, manage invoices, and extend cash for longer. Get access to funding without giving up equity, so that you can focus on growing your company.
          </motion.p>

          <div className="mt-6">
            <Button variant="teacherButton" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 ease-in-out cursor-pointer mb-40">
              GET FUNDING
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal Rule */}
      <div className="mt-40 border-green-950" />
    </div>
  );
};

export default TeacherWebFirstLayout;
