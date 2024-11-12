'use client';

export default function ClientCategory() {
  return (
    <section className="mx-auto px-10 py-20 max-w-[1280px] flex flex-col gap-8">
      <div className="text-5xl text-[#201116] font-bold ">What will you learn? 🎓</div>
      <div className="grid grid-cols-4 grid-rows-4 gap-6 [1200px] h-[1200px] ">
        <div className="col-span-2 row-span-2 w-[100%] h-[100%] bg-yellow-400 rounded-2xl">1</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">2</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">3</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">4</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">5</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">6</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">7</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">8</div>
        <div className="w-[100%] h-[100%] bg-yellow-400 rounded-2xl">9</div>
      </div>
    </section>
  );
}
