'use client';
import { Button } from '@/app/components/ui/button';
import Hero from '@/components/hero';
import { Swipersnew } from '@/components/swiperimage';
import { Food } from '@/lib/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
export default function Menu() {
  const [food, setFood] = useState<Food[]>([]);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchvalue');
  const specialdishes = [
    { url: '/carbonara.jpg', price: 21000, name: 'Carbonara' },
    { url: '/pasta.jpg', price: 15000, name: 'Pasta' },
    { url: '/pizza.jpeg', price: 25000, name: 'Pizza' },
  ];
  if (searchValue) {
    useEffect(() => {
      fetch(`/api/hello/admin?searchvalue=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          setFood(data);
        });
    }, []);
  } else {
    useEffect(() => {
      fetch('/api/hello/admin')
        .then((res) => res.json())
        .then((data) => {
          setFood(data);
        });
    }, []);
  }

  const navs = [
    { name: 'ЗАХИАЛГА', link: '/order' },
    { name: 'MЕНЮ', link: '/lunch' },
    { name: 'ХҮРГЭЛТ', link: '/delivery' },
  ];
  return (
    <div>
      <div className="flex justify-center gap-7 pt-10 z-10  ">
        {navs.map((nav) => (
          <Link href={nav.link} className="text-[#38060C] items-center text-2xl" key={nav.name}>
            {nav.name}
          </Link>
        ))}
      </div>
      <Swipersnew />
      <div className="w-full mx-auto flex mt-20 md:mx-auto">
        <div className="relative mx-auto ">
          <h1 className="text-7xl italic text-center mb-10 mx-auto text-[#4A433E]">Lunch set</h1>

          <div className="mt-20 mx-auto lg:w-[1200px] flex flex-col lg:flex lg:flex-wrap lg:flex-row  gap-16 mb-20">
            {food.map((food: Food) => (
              <div key={food._id} className="w-[320px] h-[380px] border-2 border-[#8B0000]  absoulte rounded-sm p-10 ">
                <div className="rounded-full width={150} height={150}">
                  <img src={food.photos} width={150} height={150} alt={food.name} className="mx-auto w-[150px] h-[150px] object-cover rounded-full items-center" />
                </div>
                <h1 className=" absolute text-[#8B0000] font-bold text-2xl">{food.price}</h1>
                <h1 className="font-bold absolute mt-10 text-2xl">{food.name}</h1>
                <h2 className="text-xl mt-20 text-wrap">{food.ingredients}</h2>
                <div className="flex flex-row mt-4 gap-5 items-center text-xl">
                  <Button variant="amidos" className="row-1 ">
                    Сагсанд нэмэх
                  </Button>
                  <Button variant="amidos2" className="row-1">
                    Захиалах
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
        
      
    </div>
  );
}
