'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product, ProductItem } from '../components/productItem';
import { RealtimeNotif } from './layout';

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isClick, setClick] = useState(false);
  const value = useContext(RealtimeNotif)
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);


  interface product {
    image: string;
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      console.log(data);
      setProducts(data);

      // Extract image URLs from the products
    } catch (error) {
      console.error('Error fetching products:', error);
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
    fetchProducts();
  }, []);

  const handleFavourite = (productId: string) => {

    let result: string[] = [];
    if (value?.favourite) result = [...value?.favourite];
    if (result.find((id) => id === productId)) {
      result = result.filter((id) => id !== productId);
      setClick(false)
    } else {
      result.push(productId);
      setClick(true)
    }

    localStorage.setItem('favourites', JSON.stringify(result));

    value?.setFavourite(result);
  };

  return (
    <div className="max-w-[1220px] mx-auto w-full">
      <div className="flex">
        <div className="gap-10 grid py-10">
          <div className="flex gap-20">
            <div className="grid gap-5">
              <div className="text-[#565B60] text-sm">2024 оны 10-р сарын 11-20</div>
              <div className="text-[#0033FF] text-5xl font-semibold">Хамгийн их хүсдэг</div>
              <div className="text-[#565B60] text-sm">Энэ жилийн хамгийн эрэлттэй тансаг зэрэглэлийн брэндүүдээс эхлээд чамин олдворуудыг өөрийн болгоорой.</div>
              <div className="text-[#0033FF] text-sm">Яг одоо судлаарай</div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="flex w-full mt-[100px] h-[40px] gap-2 items-center">
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

        <div className="w-[60%] py-10 pl-10">
          <Swiper
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
                <Image alt={`Slide ${index + 1}`} src={product.frontImage} width={1200} height={600} className="w-full h-full object-cover hover:cursor-pointer" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 w-full">
        {products.slice(0, 20).map((product) => (
          <ProductItem isClick={isClick} product={product} favourite={value?.favourite || []} key={product._id} onClickFavourite={() => handleFavourite(product._id)} />
        ))}
      </div>
    </div>
  );
}
