'use client';
import { PiPencilCircleFill, PiVideoDuotone } from 'react-icons/pi';
import { TbWorldHeart } from 'react-icons/tb';

export default function ClientFeature() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 py-20 flex flex-col gap-8 items-center ">
      <div className="text-5xl font-bold text-center text-[#201116]">
        Өөрийн <span className="text-[#FF6375]">мэдлэг, ур чадварыг</span> <span className="text-[#fda801]">бусдад санал болгох,</span> зөвхөн
        <span className="text-[#00B4A9]"> таны хэв маягт тохирсон </span>
        <span className="text-[#ff6375]">вэбсайт бүтээх платформ.</span> 🥋
      </div>
      <div className="grid grid-cols-3 max-w-[1200px] gap-x-6">
        <div className="bg-[#FF6375] w-[384px] h-[612px] rounded-2xl relative overflow-hidden">
          <p className="flex flex-col gap-2 p-7 ">
            <span className="font-bold text-2xl flex ">
              <TbWorldHeart className="text-4xl" />
              Вэбсайт үүсгэх боломж
            </span>
            <span className="text-base font-medium">
              Манай платформ нь таны хүссэн өнгө, загварыг тохируулан, видео хичээлүүдээ байршуулж, бүх тохиргоог өөрийн хэрэгцээнд нийцүүлэн өөрчлөх боломжийг олгоно.
            </span>
          </p>
          <img src="/char11.png" alt="character" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[70%] object-cover transition-transform duration-1000 ease-out hover:scale-110" />
        </div>
        <div className="bg-[#fda801] w-[384px] h-[612px] rounded-2xl relative overflow-hidden">
          <p className="flex flex-col gap-2 p-7 ">
            <span className="font-bold text-2xl flex ">
              <PiVideoDuotone className="text-4xl" />
              Видео хичээлээ удирдах
            </span>
            <span className="text-base font-medium">
              Өөрийн видео хичээлүүдээ хяналтын самбараар хялбархан байршуулж, хуваалцах боломжтой. Та хичээл бүр дээр хяналт тавих, агуулгыг удирдах, ашиглахад хялбар болгож өөрчлөх боломжтой. Энэ нь
              сургалтын агуулгыг удирдах хувийн хэрэгслийг ашиглахад туслах шинэ шийдэл юм.
            </span>
          </p>
          <img src="/char12.png" alt="character" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[70%] object-cover transition-transform duration-1000 ease-out hover:scale-110" />
        </div>
        <div className="bg-[#00B4A9] w-[384px] h-[612px] rounded-2xl relative overflow-hidden">
          <p className="flex flex-col gap-2 p-7 ">
            <span className="font-bold text-2xl flex ">
              <PiPencilCircleFill className="text-4xl" />
              Дизайны шийдэл
            </span>
            <span className="text-base font-medium">
              Манай платформ нь таны хүссэн өнгөний тохиргоог яг тохируулан, тохиромжтой өнгөний хослолуудыг санал болгоно. Та вэбсайт дээрх өнгө, текст, фон болон бусад элементүүдээ оновчтой
              тохируулан, хэрэглэгчдэд хамгийн сэтгэл ханамжтай туршлагыг олгох боломжтой.
            </span>
          </p>
          <img src="/char13.png" alt="character" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[70%] object-cover transition-transform duration-1000 ease-out hover:scale-110" />
        </div>
      </div>
    </section>
  );
}
