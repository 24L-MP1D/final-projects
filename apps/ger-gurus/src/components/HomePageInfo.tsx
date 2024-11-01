export const HomePageInfo = () => {
  return (
    <div className="flex  max-w-[1440px] mx-auto flex-col items-center gap-12 justify-center">
      <div className="flex mx-auto gap-7">
        <div className="flex justify-center items-center">
          <div className="relative inline-flex group">
            <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <a
              href="#"
              title="Get quote now"
              className="relative bg-white bg-opacity-40 inline-flex items-center justify-center px-4 py-2 text-lg text-white transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
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
              href="#"
              title="Get quote now"
              className="relative inline-flex items-center justify-center px-4 py-2 text-lg text-white bg-white bg-opacity-40 transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
              role="button"
            >
              Нэвтрэх
            </a>
          </div>
        </div>
      </div>
      <div className="relative flex gap-[800px]">
        <div className="flex flex-col">
          <div className="w-[200px] h-[150px] shadow-md mt-[-60px] absolute"></div>
          <div className="w-[200px] h-[150px] shadow-md ml-[-60px] mt-[150px] absolute"></div>
          <div className="w-[200px] h-[150px] shadow-md ml-[30px] mt-[400px] absolute"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-[200px] h-[150px] shadow-md"></div>
          <div className="w-[200px] h-[150px] shadow-md"></div>
          <div className="w-[200px] h-[150px] shadow-md"></div>
        </div>
      </div>

      <div className="max-w-[675px] mx-auto shadow-2xl rounded-xl absolute mt-32">
        <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
          <source src={'/study.mp4'} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
