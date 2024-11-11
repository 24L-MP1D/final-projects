'use-client';
import { useEffect, useState } from 'react';
import { useAuthStore } from './components/useAuthStore';

export const HomePageInfo = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  function deleteCookie() {
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn; Secure; SameSite=Lax;';
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn; Secure; SameSite=Lax';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  }
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.origin);
    }
  }, []);
  return (
    <div className="flex  max-w-[1440px] mx-auto flex-col items-center gap-12 justify-center">
      {currentUser ? (
        <div className="flex justify-center items-center">
          <div className="relative inline-flex group">
            <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <a
              onClick={deleteCookie}
              title="Get quote now"
              className="relative bg-white bg-opacity-20 inline-flex items-center justify-center px-4 py-2 text-lg text-white transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
              role="button"
            >
              Log out
            </a>
          </div>
        </div>
      ) : (
        <div className="flex mx-auto gap-7">
          <div className="flex justify-center items-center">
            <div className="relative inline-flex group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href="https://dash.verse.mn/signup"
                title="Get quote now"
                className="relative bg-white bg-opacity-20 inline-flex items-center justify-center px-4 py-2 text-lg text-white transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
                role="button"
              >
                Бүртгүүлэх
              </a>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative inline-flex group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href={`https://dash.verse.mn/login?url=${url}`}
                title="Get quote now"
                className="relative inline-flex items-center justify-center px-4 py-2 text-lg text-white bg-white bg-opacity-20 transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
                role="button"
              >
                Нэвтрэх
              </a>
            </div>
          </div>
        </div>
      )}
      <div className=" relative flex flex-col items-center justify-center gap-[30px]">
        <div className="flex gap-[800px]">
          <div className="w-[200px] h-[150px] shadow-2xl">
            <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="w-[200px] h-[150px] shadow-2xl">
            <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex gap-[960px]">
          <div className="w-[200px] h-[150px] shadow-2xl">
            <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="w-[200px] h-[150px] shadow-2xl">
            <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex gap-[900px]">
          <div className="w-[200px] h-[150px] shadow-2xl">
            <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
          <div className="w-[200px] h-[150px] shadow-2xl">
            <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
              <source src={'/study.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto shadow-2xl rounded-xl absolute mt-80">
        <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
          <source src={'/home-video.mp4'} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
