'use client';
import { Button } from '@/app/components/ui/button';
import { Swipersnew } from '@/components/swiperimage';
import { Food } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import Dialogs from './[id]/page';

export default function Menu() {
  const [food, setFood] = useState<Food[]>([]);
  console.log(food);
  const [special, setSpecial] = useState<Food[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchid = searchParams.get('id');
  const searchvalue = searchParams.get('searchvalue');

  const [oneFoodId, setOneFoodId] = useQueryState('id');

  useEffect(() => {
    fetch(`/api/addFood`)
      .then((res) => res.json())
      .then(setFood)
      .catch((error) => console.error('Error fetching food:', error));
  }, []);

  const choose = (id: string) => {
    router.push(`/lunch?id=${id}`);
  };

  const navs = [
    { name: 'БИДНИЙ ТУХАЙ', link: '/' },
    { name: 'MЕНЮ', link: '/menu' },
    { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
    { name: 'ЗАХИАЛГА', link: '/order' },
    { name: 'ХҮРГЭЛТ', link: '/delivery' },
  ];
  return (
    <div>
      <div className="flex bg-black gap-4 justify-center p-6 w-full">
        {navs.map((nav) => (
          <Link className="text-white" key={nav.name} href={nav.link}>
            {nav.name}
          </Link>
        ))}
      </div>
      <div className="w-full mx-auto flex mt-10 md:mx-auto">
        <div className="relative mx-auto">
          <Dialogs />
          <h1 className="text-[#8B0000] font-semibold text-3xl text-center">СЕТ ХООЛНУУД</h1>
          <div className="mt-10 mx-auto lg:w-full gap-16 mb-20 grid md:grid-cols-2 grid-cols-1 ">
            {food.map((foodItem: Food) => (
              <div key={foodItem._id} className="relative max-w-[800px] max-h-[600px] overflow-hidden  rounded-lg border p-10">
                <Image
                  src={foodItem.photos}
                  width={800}
                  height={800}
                  alt={foodItem.name}
                  className="mx-auto w-[full] h-[full] object-cover aspect-video cursor-pointer rounded-sm"
                  onClick={() => {
                    setOneFoodId(foodItem.id);
                  }}
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-bold  mt-10 text-2xl text-[#8B0000]">{foodItem.name}</h1>
                    <h2 className="text-lg italic text-wrap text-[#52071B]">{foodItem.ingredients}</h2>
                  </div>
                  <h1 className="text-[#342216] text-lg italic font-bold">{foodItem.price}.0</h1>
                </div>

                <div className="flex flex-row mt-6 gap-5 text-xl justify-end ">
                  <Button variant="amidos2" className="row-1">
                    Сагсанд нэмэх
                  </Button>
                  <Button variant="amidos" className="row-1" onClick={() => choose(foodItem.id)}>
                    Сонгох
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Swipersnew />
    </div>
  );
}
