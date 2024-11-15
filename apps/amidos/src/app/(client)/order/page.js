"use client";
import { Headers } from '@/components/header';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function Menu() {
    const [orderedItem, setOrderedItem] = useState([]);
    const [loadingbutton, setLoadingbutton] = useState(false);
    const [total, setTotal] = useState(0)
    // const [selectedFood, setSelectedFood] = useState(null);
  
    useEffect(() => {
      const order = localStorage.getItem('order');
  
      if (order) {
        try {
          const orders = JSON.parse(order); 
          const total = Array.from(orders).reduce((acc, cur) => acc + cur.quantity * cur.price ,0);
          setTotal(total)
          setOrderedItem(orders);
        } catch (error) {
          console.error('Error parsing order from localStorage:', error);
          setOrderedItem([]); 
        }
      } else {
        setOrderedItem([]); 
      }
    }, []);

    function order(){
      window.location.href = '/buystepone';
    }
  return (
    <>
      <Headers />
      <div className="w-[800px] py-6 px-6 mt-20 flex flex-col gap-4 rounded-2xl mb-[230px] mx-auto ml-20">
            <div className="flex gap-2 items-center">
              <span className="text-4xl font-bold text-[#8B0000]">Сагс</span>
              <span className="text-gray-400"></span>
            </div>
            <div className="flex flex-col gap-4 border-dashed border-b-2 py-6">
              {orderedItem?.map((order) => (
                <div className="flex gap-6">
                  <img className="w-[300px] h-[500px]" src={order.photos}></img>
                  <div className="flex flex-col gap-1 pb-1">
                    <span className="text-2xl  font-normal text-[#52071B]">{order.name}</span>
                    <div className="text-xl mt-2 font-normal text-[#342216]">
                      {order.quantity}ш * {order.price}к
                    </div>
                    <div className=" text-4xl mt-4 font-bold text-[#52071B]">{order.quantity * order.price},000₮</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between pb-8">
              <span className="text-4xl font-normal text-[#52071B] ">Нийт төлөх дүн:</span>
              <span className="text-4xl font-bold text-[#52071B]">{total}₮</span>
            </div>
            <Button variant="amidos" className="self-end text-xl mt-4 " onClick={() => order()}>
                      {loadingbutton ? 'Уншиж байна' : ' Захиалах'}
            </Button>
          </div>
    </>
  );
}
