import { useEffect, useState } from 'react';

const ScrollEffect = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Скроллын байрлалыг хянах effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Скроллын байрлал
    };

    // Скроллын үйлдлийг сонсох
    window.addEventListener('scroll', handleScroll);

    // Устгах
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="mx-auto px-10 py-20 max-w-[1280px] overflow-hidden">
      <div
        className="w-full min-h-[640px] p-16 rounded-2xl grid grid-cols-2 relative"
        style={{
          background: 'linear-gradient(100deg, #e1e2e2, #e1e2e2 50%, #abaaa8)',
        }}
      >
        <div className="pt-8 pb-4 flex flex-col gap-2">
          <div className="text-3xl font-bold text-purple-600">Анхны хэрэглэгч</div>
          <div className="text-7xl text-[#201116] font-bold">Who is Pablo Stanley?</div>
          <div className="text-xl">
            As your guide in this course, Pablo Stanley combines his entrepreneurial spirit and design expertise from co-founding Carbon Health and Blush Design, to his roles at Udemy, Lyft, and
            Invision. Celebrated for his Open Source Doodles and Robotos NFTs, Pablo's real passion lies in empowering emerging designers through practical insights and fostering a creative community.
            Join him to explore the depths of design and unlock your creative potential.
          </div>
          <div>icons</div>
        </div>

        {/* Хязгаарлагдсан бүсэд зураг */}
        <div className="absolute right-0 top-0 w-full h-full overflow-hidden">
          <div
            className="w-full h-full object-cover transform transition-all duration-300 ease-in-out"
            style={{
              transform: `translateY(${scrollPosition * 0.1}px)`, // Скролл хийхэд зургийн хөдөлгөөн
            }}
          >
            <img src="/uuganbileg.png" alt="chars" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollEffect;
