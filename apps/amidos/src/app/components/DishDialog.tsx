'use client';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent } from '@/components/dialog';
import { Food } from '@/lib/types';
import React, { useEffect, useState } from 'react';

interface DishDialogProps {
  dishId: string;
  onClose: () => void;
}

const DishDialog: React.FC<DishDialogProps> = ({ dishId }) => {
  const [dish, setDish] = useState<Food | null>(null);
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchDish = async () => {
      const response = await fetch(`/api/hello/admin/${dishId}`);
      const data = await response.json();
      setDish(data);
      setTotalPrice(data.price);
    };

    fetchDish();
  }, [dishId]);

  const handleQuantityChange = (increment: number) => {
    setSelectedCount((prevCount) => {
      const newCount = Math.max(prevCount + increment, 1);
      if (dish) {
        setTotalPrice(newCount * dish.price);
      }
      return newCount;
    });
  };

  if (!dish) return null;

  return (
    <Dialog>
      <DialogContent>
        <div className="bg-white w-[400px] relative mx-auto">
          <img src={dish.photos} width={300} height={300} alt={dish.name} className="mx-auto w-[250px] h-[250px] object-cover rounded-full" />
          <h1 className="absolute text-[#8B0000] font-bold text-2xl">{dish.price}₮</h1>
          <h1 className="font-bold absolute mt-10 text-2xl">{dish.name}</h1>
          <h2 className="text-xl mt-20 text-wrap text-[#8B0000]">{dish.ingredients}</h2>
          <div className="pt-4 flex gap-2 items-center">
            <button type="button" className="bg-[#FFFFFF] border-[#18181B] border-[1px] rounded-2xl w-8 h-8 font-normal text-lg text-[#09090B]" onClick={() => handleQuantityChange(-1)}>
              -
            </button>
            <div className="text-[#8B0000] text-bold text-xs">{selectedCount}</div>
            <button type="button" className="bg-[#FFFFFF] border-[#18181B] border-[1px] rounded-2xl w-8 h-8 font-normal text-lg text-[#09090B]" onClick={() => handleQuantityChange(1)}>
              +
            </button>
          </div>
          <div className="flex flex-row mt-6 gap-10 items-center text-xl m-6">
            <Button variant="amidos" className="row-1 items-center">
              Сагсанд нэмэх
            </Button>
            <Button variant="amidos2" className="row-1 items-center">
              Захиалах
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishDialog;
