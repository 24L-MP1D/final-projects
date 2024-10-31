'use client';
import { Food } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function OneFood() {
  const [oneFood, setOneFood] = useState([]);
  useEffect(() => {
    fetch('/api/hello/admin')
      .then((res) => res.json())
      .then((data) => {
        setOneFood(data);
      });
  }, []);
  <div>
    <div className="mt-20 mx-auto lg:w-[1200px] flex flex-col  lg:flex lg:flex-wrap lg:flex-row  gap-16 mb-20">
      {oneFood.map((food: Food) => (
        <div key={food._id} className="w-[320px] h-[380px] border-2 border-[#8B0000]/80  absoulte rounded-sm p-10 ">
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
  </div>;
}
