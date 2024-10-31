export const HomePageInfo = () => {
  return (
    <div className="flex justify-center p-20">
      <div className="relative h-[300px] w-[700px]">
        <video className="videoTag overflow-hidden rounded-xl" autoPlay loop muted>
          <source src={'/home-video.mp4'} type="video/mp4" />
        </video>
        <div className="absolute font-bold justify-center top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex gap-7">
            <div className="flex justify-center items-center">
              <div className="relative inline-flex group">
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <a
                  href="#"
                  title="Get quote now"
                  className="relative bg-white inline-flex items-center justify-center px-4 py-2 text-lg text-black transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
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
                  className="relative inline-flex items-center justify-center px-4 py-2 text-lg text-white transition-all duration-200 bg-transparent border-solid border-2 border-gradient-to-r from-violet-200 to-pink-200 font-serif rounded-full  focus:ring-0 focus:ring-offset-2 "
                  role="button"
                >
                  Нэвтрэх
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
