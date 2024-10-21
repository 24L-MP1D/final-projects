"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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
  return (
    // <Swiper className='mt-[100px] h-[500px] w-[500px]'
    //   modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}

    //   scrollbar={{ draggable: true }}
    // >
    //   {slides.slice(0, 5).map((slide) => (
    //     <div>
    //       <SwiperSlide><Image alt='' src={slide.image_url} width={100} height={100} /></SwiperSlide>
    //     </div>
    //   ))}
    // </Swiper>
    <div className='grid grid-cols-4'>
      {
        slides.slice(0, 8).map((slide) => (
          <div>
            < CardContainer className="inter-var" >
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
  );
};

// export default function Index() {
//   return (
//     <div className="max-w-[1220px] mx-auto w-full">
//       <div className="grid p-10 gap-10">
//         <div className="flex gap-20">
//           <div className="grid gap-5">
//             <div className="text-[#565B60] text-xs">11 - 20 OCTOBER 2024</div>
//             <div className="text-[#0033FF] text-5xl font-semibold">Most Wanted</div>
//             <div className="text-[#565B60] text-xs">Get your hands on this year's most sought-after objects, from top luxury brands to
//               niche finds.
//             </div>
//             <div className="text-[#0033FF] text-xs">Explore now</div>
//             <div className="flex gap-1 mt-[70px]  items-center">
//               <button className="h-[4px] w-[70px] bg-[#0033FF]"></button>
//               <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
//               <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
//               <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
//               <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
//               <button className="h-[4px] w-[70px] bg-[#D2D9E1]"></button>
//               <button><ChevronRight size={20} strokeWidth={2} className="text-[#0033FF]" /></button>
//             </div>
//           </div>
//           <div>
//             <Image alt="" src="/images/img.png" width={600} height={300} />
//           </div>
//         </div>
//         <div>
//           <Products />
//         </div>
//       </div>
//     </div>
//   );
// }
