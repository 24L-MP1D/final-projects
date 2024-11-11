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
        {specialFood.map((special) => (
          <SwiperSlide key={special._id}>
            <Image src={special.photos} width={600} height={200} alt="Image" className="max-h-[300px] aspect-video object-cover" />

            <div className="flex flex-col absolute left-[11px] bottom-[13px]">
              <div className="text-white md:text-2xl font-bold text-base self-start">{special.name}</div>
              <p className=" text-white md:text-xl text-sm self-start">{special.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
