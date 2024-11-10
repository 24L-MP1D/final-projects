'use client';
import { Food } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export function Swipersnew() {
  const [specialFood, setSpecialFood] = useState<Food[]>([]);
  useEffect(() => {
    fetch('api/special')
      .then((res) => res.json())
      .then((data) => setSpecialFood(data));
  }, []);

  return (
    <div className="text-center py-16">
      {/* <div className="text-[#8B0000] font-semibold text-3xl pb-8">7 ХОНОГИЙН ОНЦЛОХ MЕНЮ</div> */}
      <h1 className="text-7xl italic text-center text-[#4A433E] mb-20">Онцлох Меню</h1>
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
        {specialFood.map((special) => (
          <SwiperSlide key={special._id}>
            <Image src={special.photos} width={600} height={200} alt="Image" className="w-[600px] h-[500px] border-lg" />
            <div className="flex flex-col absolute left-[14px] bottom-[13px]">
              <div className="text-white md:text-lg font-bold lg:text-3xl">{special.name}</div>
              <p className=" text-white lg:text-2xl text-sm">{special.price}</p>
            </div>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
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
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
