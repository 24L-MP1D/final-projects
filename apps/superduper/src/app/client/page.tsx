'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product, ProductItem } from '../components/productItem';

export default function Index() {
  // Product data codes
  const [products, setProducts] = useState<Product[]>([]);

  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  interface product {
    image: string;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProducts(data);

        // Extract image URLs from the products
        const imageUrls = data.map((product: product) => product.image);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

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
  const [favourite, setFavourite] = useState<string[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('favourites');
    if (storage) setFavourite(JSON.parse(storage));
  }, []);

  const handleFavourite = (productId: string) => {
    let result: string[] = [...favourite];
    if (result.find((id) => id === productId)) {
      result = result.filter((id) => id !== productId);
    } else {
      result.push(productId);
    }

    localStorage.setItem('favourites', JSON.stringify(result));
    setFavourite(result);
  };

  return (
    <div className="max-w-[1220px] mx-auto w-full">
      <div className="flex">
        <div className="gap-10 grid py-10">
          <div className="flex gap-20">
            <div className="grid gap-5">
              <div className="text-[#565B60] text-sm">11 - 20 OCTOBER 2024</div>
              <div className="text-[#0033FF] text-5xl font-semibold">Most Wanted</div>
              <div className="text-[#565B60] text-sm">Get your hands on this years most sought-after objects, from top luxury brands to niche finds.</div>
              <div className="text-[#0033FF] text-sm">Explore now</div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="flex w-full mt-[100px] h-[40px] gap-2">
            {Array.from({ length: products.length })
              .slice(0, 6)
              .map((_, index) => (
                <div key={index} className="relative h-[7px] w-full bg-gray-300 rounded-full">
                  <div className={`absolute top-0 left-0 h-full bg-blue-500 rounded-full`} style={{ width: progress === index ? '100%' : '0%', transition: 'width 0.8s ease-in-out' }}></div>
                  <div className="absolute top-0 left-0 h-full w-full cursor-pointer" onClick={() => handleProgressClick(index)}></div>
                </div>
              ))}
            <Button className="items-center text-[#0033FF] ml-[5px]" onClick={handleNextSlide}>
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
                <Image alt={`Slide ${index + 1}`} src={product.image_url} width={1200} height={600} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {products.slice(0, 6).map((product) => (
          <ProductItem product={product} key={product._id} onClickFavourite={() => handleFavourite(product._id)} isFavourite={!!favourite.find((id) => id === product._id)} />
        ))}
      </div>
    </div>
  );
}
