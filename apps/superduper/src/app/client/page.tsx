'use client';

import { ProductType } from '@/components/productType';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductItem } from '../components/productItem';
import { RealtimeNotif } from './layout';

export default function Index() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isClick, setClick] = useState(false);
  const value = useContext(RealtimeNotif);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        body: JSON.stringify({
          searchValue: value?.searchValue,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgressClick = (e: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(e);
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Favourite codes

  useEffect(() => {
    const storage = localStorage.getItem('favourites');
    if (storage) value?.setFavourite(JSON.parse(storage));
    loadProducts();
  }, [value?.searchValue]);

  const handleFavourite = (productId: string) => {
    let result: string[] = [];
    if (value?.favourite) result = [...value?.favourite];
    if (result.find((id) => id === productId)) {
      result = result.filter((id) => id !== productId);
      setClick(false);
    } else {
      result.push(productId);
      setClick(true);
    }

    localStorage.setItem('favourites', JSON.stringify(result));

    value?.setFavourite(result);
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full">
      <div className="grid grid-cols-2 mt-0.5">
        <div className="w-[1280px] h-full">
          <Swiper
            className="rounded-xl w-full"
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setProgress(swiper.activeIndex)}
            style={{
              height: '700px',
            }}
          >
            {products.slice(0, 6).map((product, index) => (
              <SwiperSlide key={index} className="relative ">
                <Image loading="lazy" alt={`Slide ${index + 1}`} src={product.frontImage} width={1280} height={900} className="w-full h-full object-cover rounded-xl" />
                <div className="absolute top-0 left-0 w-1/2  rounded-xl h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-5">
                  <div className="ml-10">
                    <div className="gap-10 flex flex-col">
                      <div className="flex gap-20 flex-1">
                        <div className="grid gap-5">
                          <div className="text-[#565B60] flex gap-1 text-sm">
                            <div className="text-white">{dayjs(products?.[progress]?.startDate).format('YYYY-MM-DD')}</div>
                            <div>-</div>
                            <div className="text-white">{dayjs(products?.[progress]?.endDate).format('YYYY-MM-DD')}</div>
                          </div>
                          <div className="text-white text-5xl font-semibold">{products?.[progress]?.productName}</div>
                          <div className="text-white text-sm">{products?.[progress]?.additionalInformation}</div>
                          <div className="text-white text-sm">{products?.[progress]?.category}</div>
                        </div>
                      </div>

                      <div className="flex w-[300px] gap-2 items-center">
                        {Array.from({ length: products.length })
                          .slice(0, 6)
                          .map((_, index) => (
                            <div key={index} className="relative h-[7px] w-full bg-gray-300 rounded-full">
                              <div
                                className={`absolute top-0 left-0 h-full bg-[#5ba3f5] rounded-full`}
                                style={{ width: progress === index ? '100%' : '0%', transition: 'width 0.8s ease-in-out' }}
                              ></div>
                              <div className="absolute top-0 left-0 h-full w-full cursor-pointer" onClick={() => handleProgressClick(index)}></div>
                            </div>
                          ))}
                        <Button className="items-center text-[#0033FF] bg-white hover:bg-white ml-[5px]" onClick={handleNextSlide}>
                          <ChevronRight strokeWidth={1.75} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2  rounded-xl h-full flex flex-col justify-center items-center  text-white p-5">
                  <div className="p-3 rounded-3xl h-fit bg-white/10 backdrop-blur-xl w-[450px]  mt-12 md:mt-0">
                    <div className="py-3 px-3">
                      <Button className="rounded-2xl border-8 w-[400px] h-[50px] border-[#f8f3f8] bg-[#79b3f4] ">Хялбар үйлчилгээ</Button>
                      <div className="bg-[#f4f5fa] rounded-2xl mt-3 p-4 ">
                        <div className="grid grid-cols-2">
                          <div className="h-32  cursor-pointer flex flex-col justify-center items-center rounded-xl hover:border-2 hover:bg-white transition-all duration-300 hover:border-[#93C5FD] group w-full">
                            <div className="flex justify-center hover:bg-white items-center w-16 p-3 rounded-full border group-hover/item:bg-surfaceInverse transition-all duration-300 bg-[#E0F2FE] shadow-[inset_0_0_4px_0_rgba(59,130,246,1)] group-hover/item:shadow-[0_0_8px_0_rgba(59,130,246,1)]">
                              <Image src="/bid.png" alt="bid" width={36} height={36} className="" />
                            </div>
                            <div className="mt-3 font-semibold flex items-center transition-all duration-300 text-xs md:text-sm text-neutral group-hover/item:-translate-x-2 text-textHigh text-black text-center transform group-hover:-translate-x-1">
                              Дуудлага худалдаанд оролцох
                              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-1" />
                            </div>
                          </div>
                          <div className="h-32  cursor-pointer flex flex-col justify-center items-center rounded-xl hover:border-2 hover:bg-white transition-all duration-300 hover:border-[#93C5FD] group w-full">
                            <div className="flex justify-center hover:bg-white items-center w-16 p-3 rounded-full border group-hover/item:bg-surfaceInverse transition-all duration-300 bg-[#E0F2FE] shadow-[inset_0_0_4px_0_rgba(59,130,246,1)] group-hover/item:shadow-[0_0_8px_0_rgba(59,130,246,1)]">
                              <Image src="/chat.png" alt="bid" width={36} height={36} className="" />
                            </div>
                            <div className="mt-3 font-semibold flex items-center transition-all duration-300 text-xs md:text-sm text-neutral group-hover/item:-translate-x-2 text-textHigh text-black text-center transform group-hover:-translate-x-1">
                              Чат бот-оос асуух
                              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-0.5" size={18} />
                            </div>
                          </div>
                          <div className="h-32  cursor-pointer flex flex-col justify-center items-center rounded-xl hover:border-2 hover:bg-white transition-all duration-300 hover:border-[#93C5FD] group w-full">
                            <div className="flex justify-center hover:bg-white items-center w-16 p-3 rounded-full border group-hover/item:bg-surfaceInverse transition-all duration-300 bg-[#E0F2FE] shadow-[inset_0_0_4px_0_rgba(59,130,246,1)] group-hover/item:shadow-[0_0_8px_0_rgba(59,130,246,1)]">
                              <Image src="/add.png" alt="bid" width={36} height={36} className="" />
                            </div>
                            <div className="mt-3 font-semibold flex items-center transition-all duration-300 text-xs md:text-sm text-neutral group-hover/item:-translate-x-2 text-textHigh text-black text-center transform group-hover:-translate-x-1">
                              Дуудлага худалдаа явуулах
                              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-1" />
                            </div>
                          </div>
                          <div className="h-32  cursor-pointer flex flex-col justify-center items-center rounded-xl hover:border-2 hover:bg-white transition-all duration-300 hover:border-[#93C5FD] group w-full">
                            <div className="flex justify-center hover:bg-white items-center w-16 p-3 rounded-full border group-hover/item:bg-surfaceInverse transition-all duration-300 bg-[#E0F2FE] shadow-[inset_0_0_4px_0_rgba(59,130,246,1)] group-hover/item:shadow-[0_0_8px_0_rgba(59,130,246,1)]">
                              <Image src="/add.png" alt="bid" width={36} height={36} className="" />
                            </div>
                            <div className="mt-3 font-semibold flex items-center transition-all duration-300 text-xs md:text-sm text-neutral group-hover/item:-translate-x-2 text-textHigh text-black text-center transform group-hover:-translate-x-1">
                              Дуудлага худалдаа явуулах
                              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-[30px] w-full">
        {products.slice(0, 20).map((product) => (
          <ProductItem isClick={isClick} product={product} favourite={value?.favourite || []} key={product._id} onClickFavourite={() => handleFavourite(product._id)} />
        ))}
      </div>
    </div>
  );
}
