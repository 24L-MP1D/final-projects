'use client';

import { useEffect, useState } from 'react';

type Data = {
  _id: string;
  name: string;
  email: string;
};

export const HomePageInfo = () => {
  const [data, setData] = useState<Data[]>([]);

  function loadUser() {
    const token = localStorage.getItem('authtoken') || '';

    fetch(`/api/user`, {
      headers: {
        authtoken: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setData([data]);
        }
      })
      .catch((error) => {
        console.error('Error loading user:', error);
      });
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="flex  max-w-[1440px] mx-auto flex-col items-center gap-12 justify-center">
      {data.length < 1 ? (
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
                href="/login"
                title="Get quote now"
                className="relative inline-flex items-center justify-center px-4 py-2 text-lg text-white bg-white bg-opacity-20 transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
                role="button"
              >
                Нэвтрэх
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div>Loged</div>
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
          <source src={'/study.mp4'} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
