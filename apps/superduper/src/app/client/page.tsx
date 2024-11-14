'use client';

import '@/app/styles.css';
import { Categories } from '@/components/category';
import { ProductType } from '@/components/productType';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductItem } from '../components/productItem';
import { RealtimeNotif } from './layout';

export default function Index() {
  const [isClick, setClick] = useState(false);
  const value = useContext(RealtimeNotif);
  const [swiperProducts, setSwiperProducts] = useState<ProductType[]>([]);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const [count, setCount] = useState(15);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  interface product {
    image: string;
  }

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products', {
        method: 'PUT',
        body: JSON.stringify({
          searchValue: value?.searchValue,
          limit: count,
          page,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();

      value?.setProducts(data);
      setLoading(false);
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
  const loadSwiperProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setSwiperProducts(data);
  };
  useEffect(() => {
    const storage = localStorage.getItem('favourites');
    if (storage) value?.setFavourite(JSON.parse(storage));
    loadSwiperProducts();
    loadProducts();
  }, [value?.searchValue, page]);

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
  if (!swiperProducts.length)
    return (
      <div className="min-h-screen">
        <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] items-center flex">
          <div className="loader">
            <div className="loader-bar bar-1"></div>
            <div className="loader-bar bar-2"></div>
            <div className="loader-bar bar-3"></div>
            <div className="loader-bar bar-4"></div>
          </div>
          <div className="font-bold text-3xl">Ачаалж байна...</div>
        </div>
      </div>
    );
  return (
    <div className={`max-w-[1280px]  mx-auto w-full`}>
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
            {swiperProducts.slice(0, 6).map((product, index) => (
              <SwiperSlide key={index} className="relative ">
                <Image loading="lazy" alt={`Slide ${index + 1}`} src={product.frontImage} width={1280} height={900} className="w-full h-full object-cover rounded-xl" />
                <div className="absolute top-0 left-0 w-1/2  rounded-xl h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-5">
                  <div className="ml-10">
                    <div className="gap-10 flex flex-col">
                      <div className="flex gap-20 flex-1">
                        <div className="grid gap-5">
                          <div className="text-[#565B60] flex gap-1 text-sm">
                            <div className="text-white">{dayjs(value?.products?.[progress]?.startDate).format('YYYY-MM-DD')}</div>
                            <div>-</div>
                            <div className="text-white">{dayjs(value?.products?.[progress]?.endDate).format('YYYY-MM-DD')}</div>
                          </div>
                          <div className="text-white text-5xl font-semibold">{value?.products?.[progress]?.productName}</div>
                          <div className="text-white text-sm">{value?.products?.[progress]?.additionalInformation}</div>
                          <div className="text-white text-sm">{value?.products?.[progress]?.category}</div>
                        </div>
                      </div>
                      <div className="flex w-[300px] gap-2 items-center">
                        {Array.from({ length: swiperProducts.length })
                          .slice(0, 6)
                          .map((_, index) => (
                            <div key={index} className="relative h-[7px] w-full bg-gray-300 rounded-full">
                              <div
                                className={`absolute top-0 left-0 h-full bg-[#306fcd] rounded-full`}
                                style={{ width: progress === index ? '100%' : '0%', transition: 'width 0.8s ease-in-out' }}
                              ></div>
                              <div className="absolute top-0 left-0 h-full w-full cursor-pointer" onClick={() => handleProgressClick(index)}></div>
                            </div>
                          ))}
                        <Button className="items-center text-[#1c4480] bg-white  ml-[5px] hover:bg-[#73a3ec]" onClick={handleNextSlide}>
                          <ChevronRight strokeWidth={1.75} width={30} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2  rounded-xl h-full flex flex-col justify-center items-center  text-white p-5">
                  <div className="p-3 rounded-3xl h-fit bg-white/10 backdrop-blur-xl w-[450px]  mt-12 md:mt-0">
                    <div className="py-3 px-3">
                      <Button className="rounded-2xl border-8 w-[400px] h-[50px] border-[#f8f3f8]  hover:cursor-auto font-mono shadow">Хялбар дуудлага худалдаа</Button>
                      <div className="bg-[#f4f5fa] rounded-2xl mt-5 p-4 ">
                        <div className="grid grid-cols-2 ">
                          <Link
                            href={`/client/productDetails/${product._id}`}
                            className="h-32  cursor-pointer flex flex-col justify-center items-center rounded-xl hover:border-2 hover:bg-white transition-all duration-300 hover:border-[#93C5FD] group w-full"
                          >
                            <div className="flex justify-center hover:bg-blue-200 items-center w-16 p-3 rounded-full border group-hover/item:bg-surfaceInverse transition-all duration-300 bg-[#E0F2FE] shadow-[inset_0_0_4px_0_rgba(59,130,246,1)] group-hover/item:shadow-[0_0_8px_0_rgba(59,130,246,1)]">
                              <Image src="/bid.png" alt="bid" width={36} height={36} className="" />
                            </div>
                            <div className="mt-3 font-semibold flex items-center transition-all duration-300 text-xs md:text-sm text-neutral group-hover/item:-translate-x-2 text-textHigh text-black text-center transform group-hover:-translate-x-1">
                              Дуудлага худалдаанд оролцох
                              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-1" />
                            </div>
                          </Link>

                          <Link
                            href={`/client/addProducts`}
                            className="h-32  cursor-pointer flex flex-col justify-center items-center rounded-xl hover:border-2 hover:bg-white transition-all duration-300 hover:border-[#93C5FD] group w-full"
                          >
                            <div className="flex justify-center hover:bg-white items-center w-16 p-3 rounded-full border group-hover/item:bg-surfaceInverse transition-all duration-300 bg-[#E0F2FE] shadow-[inset_0_0_4px_0_rgba(59,130,246,1)] group-hover/item:shadow-[0_0_8px_0_rgba(59,130,246,1)]">
                              <Image src="/add.png" alt="bid" width={36} height={36} className="" />
                            </div>
                            <div className="mt-3 font-semibold flex items-center transition-all duration-300 text-xs md:text-sm text-neutral group-hover/item:-translate-x-2 text-textHigh text-black text-center transform group-hover:-translate-x-1">
                              Дуудлага худалдаа явуулах
                              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-x-1" />
                            </div>
                          </Link>
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

      {value?.products.length && (
        <div>
          <div className="grid grid-cols-3 gap-10 mt-[30px] w-full">
            {value?.products.slice(0, 20).map((product) => (
              <ProductItem isClick={isClick} product={product} favourite={value?.favourite || []} key={product._id} onClickFavourite={() => handleFavourite(product._id)} />
            ))}
          </div>
          {value.products.length >= count * page && (
            <div className="flex justify-center mt-10">
              <Button
                disabled={loading}
                onClick={() => {
                  setPage(page + 1);
                }}
                className="flex items-center gap-1 shadow__btn"
              >
                {loading && <Image src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}

                <div className="flex items-center gap-1 shadow__btn"> Цааш үзэх</div>
              </Button>
            </div>
          )}
          {value.showCategory && <div className="fixed inset-0 bg-slate-500 opacity-50"></div>}

          <Categories />

        </div>
      )}
    </div>
  );
}
