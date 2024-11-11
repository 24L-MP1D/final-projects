'use client';

export default function ClientFeature() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 py-20 flex flex-col gap-8 items-center ">
      <div className="text-5xl font-bold text-center text-[#201116]">
        Unlock <span className="text-[#FF6375]">your creative potential,</span> <span className="text-[#fda801]">connect with others,</span> and{' '}
        <span className="text-[#00B4A9]">stand out from the crowd.</span> 🥋
      </div>
      <div className="grid grid-cols-3 max-w-[1200px] gap-x-6">
        <div className="bg-red-600 w-[384px] h-[612px] rounded-2xl"></div>
        <div className="bg-yellow-400 w-[384px] h-[612px] rounded-2xl"></div>
        <div className="bg-pink-500 w-[384px] h-[612px] rounded-2xl"></div>
      </div>
    </section>
  );
}
