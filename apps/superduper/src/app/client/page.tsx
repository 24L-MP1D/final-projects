'use client';

import { ProductType } from '@/components/productType';
import { Button } from '@/components/ui/button';
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


  interface product {
    image: string;
  }

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
      <div className="grid grid-cols-2 mt-5">
        <div className="gap-10 grid ">
          <div className="flex gap-20">
            <div className="grid gap-5">
              <div className="text-[#565B60] text-sm">{products?.[progress]?.startDate}-{products?.[progress]?.endDate}</div>
              <div className="text-[#0033FF] text-5xl font-semibold">{products?.[progress]?.productName}</div>
              <div className="text-[#565B60] text-sm">{products?.[progress]?.additionalInformation}</div>
              <div className="text-[#0033FF] text-sm">{products?.[progress]?.category}</div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="flex w-full mt-[120px] h-[40px] gap-2 items-center">
            {Array.from({ length: products.length })
              .slice(0, 6)
              .map((_, index) => (
                <div key={index} className="relative h-[7px] w-full bg-gray-300 rounded-full">
                  <div className={`absolute top-0 left-0 h-full bg-blue-500 rounded-full`} style={{ width: progress === index ? '100%' : '0%', transition: 'width 0.8s ease-in-out' }}></div>
                  <div className="absolute top-0 left-0 h-full w-full cursor-pointer" onClick={() => handleProgressClick(index)}></div>
                </div>
              ))}
            <Button className="items-center text-[#0033FF] bg-white hover:bg-white ml-[5px]" onClick={handleNextSlide}>
              <ChevronRight strokeWidth={1.75} />
            </Button>
          </div>
        </div>

        <div className="w-full">
          <Swiper
            className='rounded-xl'
            direction={'vertical'}
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
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Save swiper instance
            onSlideChange={(swiper) => setProgress(swiper.activeIndex)} // Update progress
            style={{
              height: '360px',
            }}
          >
            {products.slice(0, 6).map((product, index) => (
              <SwiperSlide key={index}>
                <Image loading="lazy" alt={`Slide ${index + 1}`} src={product.frontImage} width={1200} height={600} className="w-full h-full object-cover hover:cursor-pointer rounded-xl" />
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
