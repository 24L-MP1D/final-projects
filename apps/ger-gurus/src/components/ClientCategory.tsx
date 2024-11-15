'use client';

export default function ClientCategory() {
  return (
    <section className="mx-auto px-10 py-20 max-w-[1280px] flex flex-col gap-8">
      <div className="text-5xl text-[#201116] font-bold ">Бид танд санал болгож байна 🎓</div>
      <div className="grid grid-cols-4 gap-6 [1200px] text-[30px] h-[600px] ">
        <div className="col-span-2 row-span-2 w-[100%] h-[100%] overflow-hidden  relative group rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center  transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:rotate-3 group-hover:brightness-110"
            style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/656b54ed82c62b584cca65ee/65c797b12db77572a7419eba_Card%20Presale%20Benefits.webp)' }}
          ></div>
          <p className="relative z-10 p-6 text-black font-bold">Бүтээлчээр өөрийн хэв маягийг тодорхойл</p>
        </div>
        <div className="w-[100%] h-[100%] overflow-hidden relative group  rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center  transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:rotate-3 group-hover:brightness-110"
            style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/656b54ed82c62b584cca65ee/65c797b14638042dae2d64f2_Card%20Presale%20Benefits-1.webp)' }}
          ></div>
          <p className="relative z-10 p-6 text-black font-bold">Үсгийн фонтын чөлөөт сонголт</p>
        </div>
        <div className="w-[100%] h-[100%] overflow-hidden relative group rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center  transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:rotate-3 group-hover:brightness-110"
            style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/656b54ed82c62b584cca65ee/65c797b0de35e6f50066b069_Card%20Presale%20Benefits-3.webp)' }}
          ></div>
          <p className="relative z-10 p-6 text-black font-bold">Таны хэв маягт тохирсон өнгө, загварын шийдэл</p>
        </div>
        <div className="w-[100%] h-[100%] overflow-hidden relative group rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center  transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:rotate-3 group-hover:brightness-110"
            style={{ backgroundImage: 'url(/piggys.jpg)' }}
          ></div>
          <p className="relative z-10 p-6 text-black font-bold">Төлбөрийн уян хатан нөхцөл</p>
        </div>
        <div className="w-[100%] h-[100%] overflow-hidden relative group rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center  transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:rotate-3 group-hover:brightness-110"
            style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/656b54ed82c62b584cca65ee/65c797b189cca18d71e05f24_Card%20Presale%20Benefits-7.webp)' }}
          ></div>
          <p className="relative z-10 p-6 text-black font-bold">Контентоо удирдах хялбар тохиргоо</p>
        </div>
      </div>
    </section>
  );
}
