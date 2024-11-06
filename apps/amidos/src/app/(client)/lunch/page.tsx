'use client';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/dialog';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Food } from '@/lib/types';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export default function Menu() {
  const [food, setFood] = useState<Food[]>([]);

  const [special, setSpecial] = useState<Food[]>([]);
  const specialdishes = [
    { url: '/carbonara.jpg', price: 21000, name: 'Carbonara' },
    { url: '/pasta.jpg', price: 15000, name: 'Pasta' },
    { url: '/pizza.jpeg', price: 25000, name: 'Pizza' },
  ];

  const [oneFoodId, setOneFoodId] = useQueryState('id');
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedFood, setSelectedFood] = useState<Food[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/api/addFood')
      .then((res) => res.json())
      .then(setFood)
      .catch((error) => console.error('Error fetching food:', error));
  }, []);

  useEffect(() => {
    fetch('/api/special')
      .then((res) => res.json())
      .then((data) => {
        setSpecial(data);
      });
  }, []);

  const handleAddToCart = (foodItem: Food) => {
    const existingCart: Array<any> = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = existingCart.findIndex((item) => item.id === foodItem._id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += selectedCount;
    } else {
      const item = {
        id: foodItem._id,
        name: foodItem.name,
        price: foodItem.price,
        ingredients: foodItem.ingredients,
        photos: foodItem.photos,
        quantity: selectedCount,
      };
      existingCart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setTotalPrice((prev) => prev + foodItem.price * selectedCount);
    alert('Сагсанд амжилттай нэмлээ');
  };

  const navs = [
    { name: 'ЗАХИАЛГА', link: '/food' },
    { name: 'MЕНЮ', link: '/lunch' },
    { name: 'ХҮРГЭЛТ', link: '/delivery' },
  ];
  function handleQuantityChange(arg0: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <div className="flex justify-center gap-7 pt-10 z-10 mx-auto">
        {navs.map((nav) => (
          <Link href={nav.link} className="text-[#38060C] items-center text-2xl" key={nav.name}>
            {nav.name}
          </Link>
        ))}
      </div>
      <div className="w-full mx-auto flex mt-20 md:mx-auto">
        <div className="relative mx-auto">
          <h1 className="text-7xl italic text-center underline underline-1 mb-20">Онцлох Меню</h1>

          <Carousel className="w-full lg:max-w-md max-w-sm mb-20  md:basis-1/2 lg:basis-1/3 mx-auto">
            <Carousel className="w-full lg:max-w-md max-w-sm mb-20 md:basis-1/2 lg:basis-1/3 mx-auto">
              <CarouselContent>
                {/* {special.map((specialDish: Food) => (
                  <CarouselItem key={specialDish._id}>

          // <Carousel className="w-full lg:max-w-md max-w-sm mb-20 md:basis-1/2 lg:basis-1/3 mx-auto">
          //   <CarouselContent>
          //     {Array.from({ length: 5 }).map((_, index) => (
          //       <CarouselItem key={index}>
          //         <div className="p-1">

          //           <Card>
          //             <CardContent className="flex aspect-square items-center justify-center p-6">
          //               <span className="text-4xl font-semibold">{index + 1}</span>
          //               <img src={specialDish.photos} alt={specialDish.name} className="w-full h-full object-cover" />
          //               <h2 className="text-lg font-bold">{specialDish.name}</h2>
          //               <p className="text-lg">{specialDish.price}₮</p>
          //             </CardContent>
          //           </Card>
          //         </div>
          //       </CarouselItem>
          //     ))}
          //   </CarouselContent>
          //         </CarouselItem>
          //       ))} */}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <h1 className="text-7xl italic text-center mb-10 mx-auto underline underline-1 text-[#4A433E]">Lunch set</h1>
          <div className="mt-20 mx-auto lg:w-[1300px] flex flex-col lg:flex lg:flex-wrap lg:flex-row gap-6 mb-20">
            {food.map((foodItem: Food) => (
              <div key={foodItem._id} className="relative w-[400px] h-[600px] border-2 border-[#8B0000] rounded-sm p-10">
                <Dialog open={open}>
                  <img
                    src={foodItem.photos}
                    width={300}
                    height={300}
                    alt={foodItem.name}
                    className="mx-auto w-[300px] h-[300px] object-cover rounded-full cursor-pointer"
                    onClick={() => {
                      setSelectedFood(foodItem);
                      setOneFoodId(foodItem._id);
                      setOpen(true);
                    }}
                  />
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    {selectedFood && (
                      <div className="bg-white w-[400px] relative mx-auto p-4">
                        <button onClick={() => setOpen(false)}>
                          <X className="h-4 w-4" />
                        </button>
                        <img src={selectedFood.photos} width={300} height={300} alt={selectedFood.name} className="mx-auto w-[250px] h-[250px] object-cover rounded-full" />
                        <h1 className="absolute text-[#8B0000] font-bold text-2xl">{selectedFood.price}₮</h1>
                        <h1 className="font-bold absolute mt-10 text-2xl">{selectedFood.name}</h1>
                        <h2 className="text-xl mt-20 text-wrap text-[#8B0000]">{selectedFood.ingredients}</h2>
                        <div className="pt-4 flex gap-2 items-center">
                          <button type="button" className="bg-[#FFFFFF] border-[#18181B] border-[1px] rounded-2xl w-8 h-8 font-normal text-lg text-[#09090B]" onClick={() => handleQuantityChange(-1)}>
                            -
                          </button>
                          <div className="text-[#8B0000] font-bold text-xs">{selectedCount}</div>
                          <button type="button" className="bg-[#FFFFFF] border-[#18181B] border-[1px] rounded-2xl w-8 h-8 font-normal text-lg text-[#09090B]" onClick={() => handleQuantityChange(1)}>
                            +
                          </button>
                        </div>
                        <div className="flex mt-6 gap-6 items-center text-xl   ">
                          <Button variant="amidos" size="lgg" onClick={() => handleAddToCart(foodItem)}>
                            Сагсанд нэмэх
                          </Button>
                          <Button variant="amidos2" size="lgg">
                            Захиалах
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <h1 className="absolute text-[#8B0000] font-bold text-2xl">{foodItem.price}k</h1>
                <h1 className="font-bold absolute mt-10 text-3xl">{foodItem.name}</h1>
                <h2 className="text-2xl mt-24 text-wrap mb-8">{foodItem.ingredients}</h2>
                <div className="flex flex-row mt-4 ml-2 items-center text-2xl gap-10">
                  <Button variant="amidos" size="xxl" className="row-1 " onClick={() => handleAddToCart(foodItem)}>
                    Сагсанд нэмэх
                  </Button>
                  <Button variant="amidos2" size="xxl" className="row-1">
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
