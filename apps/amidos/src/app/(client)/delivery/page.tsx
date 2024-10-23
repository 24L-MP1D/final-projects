import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Orders() {
  const orders = [
    {
      orderid: 12,
      createdAt: '2024.12.20',
      address: 'Twin tower 12th floor',
      contact: 99907768,
      orderedfoods: [
        { foodname: 'Pasta', foodquantity: 2, id: 12389, image: '/pasta.jpg' },
        { foodname: 'Carbonara', foodquantity: 1, id: 123890, image: '/carbonara.jpg' },
      ],
      totalprice: 55000,
    },
    {
      orderid: 20,
      createdAt: '2024.12.31',
      address: 'Gurvan gol 3rd floor',
      contact: 99907767,
      orderedfoods: [
        { foodname: 'Pasta', id: 123, foodquantity: 2, image: '/pasta.jpg' },
        { foodname: 'Carbonara', foodquantity: 2, id: 1234, image: '/carbonara.jpg' },
      ],
      totalprice: 100000,
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      {orders.map((order) => (
        <div className="bg-white border border-gray-300 px-20 py-14 rounded-lg flex flex-col gap-8" key={order.orderid}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <p className="text-2xl text-[#8B0000]">ЗАХИАЛГЫН ДУГААР:</p>
                <p className="text-2xl text-[#342216]">{order.orderid}</p>
              </div>
              <div className="text-xl text-[#342216] font-normal">{order.createdAt}</div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {order.orderedfoods?.map((orderedfood) => (
                <div className="border border-gray-300 flex justify-between flex-1 rounded-xl py-4 px-6 items-center" key={orderedfood.id}>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <p className="text-lg text-[#342216] font-bold">Захиалсан хоол:</p>
                      <p className="text-lg text-[#342216] font-normal">{orderedfood.foodname}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-lg text-[#342216] font-bold">Тоо ширхэг:</p>
                      <p className="text-lg text-[#342216] font-normal">{orderedfood.foodquantity}</p>
                    </div>
                  </div>
                  <div className="max-w-24 max-h-24 aspect-square overflow-hidden rounded-lg">
                    <Image src={orderedfood.image} alt="Image of food" width={200} height={200} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex gap-2">
                  <p className="text-base text-[#342216] font-bold">Хаяг:</p>
                  <div className="text-base text-[#342216] font-normal">{order.address}</div>
                </div>
                <div className="flex gap-2">
                  <p className="text-base text-[#342216] font-bold">Холбогдох утас:</p>
                  <div className="text-base text-[#342216] font-normal">{order.contact}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-xl text-[#342216] font-bold">Нийт дүн:</p>
                <div className="text-xl text-[#342216] font-normal">{order.totalprice}₮</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 self-end">
            <Link href="/homepage">
              <Button className="bg-white hover:bg-slate-300 text-[#52071B] text-sm border border-[#52071B]">БУЦАХ</Button>
            </Link>
            <Link href="/buy">
              <Button className="bg-[#C41D4A] hover:bg-[#8B0000]">ТӨЛБӨР ТӨЛӨХ</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
