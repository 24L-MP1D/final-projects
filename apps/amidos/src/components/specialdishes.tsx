'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { EmblaPluginType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';


type PropType = {
  plugins?: EmblaPluginType[];
};

export default function Specialdishes() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const specialdishes = [
    { url: '/carbonara.jpg', price: 21000, name: 'Carbonara' },
    { url: '/pasta.jpg', price: 15000, name: 'Pasta' },
    { url: '/pizza.jpeg', price: 25000, name: 'Pizza' },
  ];

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {specialdishes.map((special, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    // <Carousel
    //   setApi={setApi}
    //   plugins={[
    //     Autoplay({
    //       delay: 2000,
    //       stopOnInteraction: false,
    //       stopOnMouseEnter: true,
    //     }),
    //   ]}
    // >
    //   <CarouselContent>
    //     {specialdishes.map((special) => (
    //       <CarouselItem>
    //         <div className="w-[471px] h-[391px] aspect-video overflow-hidden relative shadow-2xl" key={special.name}>
    //           <Image src={special.url} alt="Image of food" width={471} height={391} className="w-full h-full object-cover" />
    //           <div className="text-white absolute bottom-1 left-4">
    //             <p className="text-xl font-semibold">{special.name}</p>
    //             <p>{special.price}₮</p>
    //           </div>
    //         </div>
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    // </Carousel>
  );
}
