'use client';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export function Swipersnew() {
  return (
    <div className="text-center py-16">
      <div className="text-[#8B0000] font-semibold text-3xl pb-4">7 ХОНОГИЙН ОНЦЛОХ MЕНЮ</div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Pagination, Scrollbar, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src="/carbonara.jpg" width={600} height={200} alt="Image" />

          <div className="flex flex-col absolute left-[11px] bottom-[13px]">
            <div className="text-white md:text-lg font-bold text-base">Carbonara</div>
            <p className=" text-white md:text-base text-sm">25000₮</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/carbonara.jpg" width={600} height={200} alt="Image" />

          <div className="flex flex-col absolute left-[11px] bottom-[13px]">
            <div className="text-white md:text-lg font-bold text-base">Carbonara</div>
            <p className=" text-white md:text-base text-sm">25000₮</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/carbonara.jpg" width={600} height={200} alt="Image" />

          <div className="flex flex-col absolute left-[11px] bottom-[13px]">
            <div className="text-white md:text-lg font-bold text-base">Carbonara</div>
            <p className=" text-white md:text-base text-sm">25000₮</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/carbonara.jpg" width={600} height={200} alt="Image" />

          <div className="flex flex-col absolute left-[11px] bottom-[13px]">
            <div className="text-white md:text-lg font-bold text-base">Carbonara</div>
            <p className=" text-white md:text-base text-sm">25000₮</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/carbonara.jpg" width={600} height={200} alt="Image" />

          <div className="flex flex-col absolute left-[11px] bottom-[13px]">
            <div className="text-white md:text-lg font-bold text-base">Carbonara</div>
            <p className=" text-white md:text-base text-sm">25000₮</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/carbonara.jpg" width={600} height={200} alt="Image" />

          <div className="flex flex-col absolute left-[11px] bottom-[13px]">
            <div className="text-white md:text-lg font-bold text-base">Carbonara</div>
            <p className=" text-white md:text-base text-sm">25000₮</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
