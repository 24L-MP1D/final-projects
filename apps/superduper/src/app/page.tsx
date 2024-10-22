"use client"
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { CardBody, CardContainer, CardItem } from './components/ui/card';

interface Product {
  name: string,
  description: string,
  category: string,
  starting_price: number,
  image_url: string,
}

export default function Index() {
  const [slides, setSlides] = useState<Product[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setSlides(data)
    };
    fetchProducts();
  }, []);

  const images = [
    "https://media.wired.com/photos/66180ed0c1ba76f5ce2ff268/master/w_2240,c_limit/Rolex.jpg",
    "https://media.wired.com/photos/66180ed0c1ba76f5ce2ff268/master/w_2240,c_limit/Rolex.jpg",
    "https://media.wired.com/photos/66180ed0c1ba76f5ce2ff268/master/w_2240,c_limit/Rolex.jpg",
    "https://media.wired.com/photos/66180ed0c1ba76f5ce2ff268/master/w_2240,c_limit/Rolex.jpg",
  ];


  const swiperRef = useRef<SwiperType | null>(null);
  const ref = useRef()
  const [progress, setProgress] = useState(0);


  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newProgress = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
    setProgress(newProgress);
    const totalSlides = images.length;
    const targetSlideIndex = Math.floor(newProgress * totalSlides);
    if (swiperRef.current) {
      swiperRef.current.slideTo(targetSlideIndex);
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="max-w-[1220px] mx-auto w-full">
      <div className='flex'>
        <div className="gap-10 grid py-10">
          <div className="flex gap-20">
            <div className="grid gap-5">
              <div className="text-[#565B60] text-sm">11 - 20 OCTOBER 2024</div>
              <div className="text-[#0033FF] text-5xl font-semibold">Most Wanted</div>
              <div className="text-[#565B60] text-sm">Get your hands on this year's most sought-after objects, from top luxury brands to
                niche finds.
              </div>
              <div className="text-[#0033FF] text-sm">Explore now</div>
            </div>
          </div>
          <div className="flex w-full mt-[100px] h-[40px]">
            <div className="relative h-2 w-full bg-gray-300 mt-4">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{ width: `${progress * 100}%` }}
              ></div>
              <div
                className="absolute top-0 left-0 h-full w-full cursor-pointer"
                onClick={handleProgressClick}
              ></div>
            </div>
            <button
              className='items-center text-[#0033FF] ml-[5px]'
              onClick={handleNextSlide}
            >
              <ChevronRight strokeWidth={1.75} />
            </button>
          </div>
        </div>
        <div className="w-[60%] py-10 pl-10">
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Save swiper instance
            onSlideChange={(swiper) => {
              const newProgress = swiper.activeIndex / (images.length - 1);
              setProgress(newProgress);
            }}
            style={{
              height: "350px",
            }}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  alt={`Slide ${index + 1}`}
                  src={src}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-x-10 max-w-[1220px] w-full'>
        {
          slides.slice(0, 6).map((slide) => (
            <div className=''>
              < CardContainer className="inter-var w-[450px] p-10" >
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {slide.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {slide.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image alt='ds' src={slide.image_url} width={500} height={500} />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {slide.category}
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {slide.starting_price}
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      href="https://twitter.com/mannupaaji"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      Bid now →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer >
            </div>
          ))
        }
      </div>
    </div>
  );
}