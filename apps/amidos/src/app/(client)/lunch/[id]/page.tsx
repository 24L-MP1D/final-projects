'use client';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent } from '@/components/dialog';
import { Food } from '@/lib/types';
import { X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export default function Dialogs() {
  const [food, setFood] = useState<Food[]>([]);
  const [oneFoodId, setOneFoodId] = useQueryState('id');
  const [loading, setLoading] = useState(true);
  const [loadingbutton, setLoadingbutton] = useState(false);
  const [special, setSpecial] = useState<Food[]>([]);
  const searchParams = useSearchParams();
  const searchid = searchParams.get('id');
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [open, setOpen] = useState(false);
  const specialdishes = [
    { url: '/carbonara.jpg', price: 21000, name: 'Carbonara' },
    { url: '/pasta.jpg', price: 15000, name: 'Pasta' },
    { url: '/pizza.jpeg', price: 25000, name: 'Pizza' },
  ];

  function close() {
    setOneFoodId(null);
  }

  const order = (selectedFood: Food | null) => {
    setLoadingbutton(true);
    const id = selectedFood?.id;
    const name = selectedFood?.name;
    const price = selectedFood?.price;
    const image = selectedFood?.photos;
    localStorage.setItem('order', JSON.stringify([{ id: id, name: name, price: price, image: image, quantity: selectedCount }]));
    window.location.href = '/buystepone';
    setLoadingbutton(false);
  };
  const handleQuantityChange = (increment: number) => {
    if (selectedCount < 10) {
      setSelectedCount((prevCount) => prevCount + 1);
    }
  };

  const handleQuantitylowChange = () => {
    if (selectedCount > 1) {
      setSelectedCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    if (searchid) {
      fetch(`/api/getonefood/${searchid}`)
        .then((res) => res.json())
        .then((data) => setSelectedFood(data))
        .catch((error) => console.error('Error fetching specific food:', error))
        .finally(() => setLoading(false));
    }
  }, [searchid]);

  const navs = [
    { name: 'ЗАХИАЛГА', link: '/order' },
    { name: 'ЗАХИАЛГА', link: '/food' },
    { name: 'MЕНЮ', link: '/lunch' },
    { name: 'ХҮРГЭЛТ', link: '/delivery' },
  ];
  return (
    <>
      {loading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        <div>
          <div className="w-full mx-auto flex mt-20 md:mx-auto">
            <div className="relative mx-auto">
              <Dialog open={searchid ? true : false}>
                <DialogContent>
                  <div className="bg-white relative m-auto flex flex-col">
                    <button onClick={() => close()} className="self-end mb-6">
                      <X className="h-4 w-4" />
                    </button>
                    <div className="w-full h-full overflow-hidden rounded-sm">
                      <img src={selectedFood?.photos} width={300} height={300} alt="Food photo" className="mx-auto w-full h-full object-cover aspect-video" />
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <h1 className="text-[#8B0000] font-bold text-3xl mt-4">{selectedFood?.name}</h1>
                        <h1 className="text-lg italic text-[#52071B]">{selectedFood?.ingredients}</h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="pt-4 flex gap-2 items-center">
                        <button type="button" className="bg-[#FFFFFF] border-[#18181B] border-[1px] rounded-2xl w-8 h-8 font-normal text-lg text-[#09090B]" onClick={() => handleQuantitylowChange()}>
                          -
                        </button>
                        <div className="text-[#8B0000] font-bold text-xs">{selectedCount}</div>
                        <button type="button" className="bg-[#FFFFFF] border-[#18181B] border-[1px] rounded-2xl w-8 h-8 font-normal text-lg text-[#09090B]" onClick={() => handleQuantityChange(1)}>
                          +
                        </button>
                      </div>
                      <h1 className="font-bold text-lg italic text-[#342216] pr-4">{selectedFood?.price}.0</h1>
                    </div>

                    <Button variant="amidos" className="self-end text-xl mt-4 " onClick={() => order(selectedFood)}>
                      {loadingbutton ? 'Уншиж байна' : ' Захиалах'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
