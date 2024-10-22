'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/table';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Orders } from '@/lib/types';
import { Label } from '@radix-ui/react-label';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LeftBar from '../components/leftbar';

export default function Order() {
  const [order, setOrder] = useState<Orders[]>([]);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState('');

  const addFood = () => {
    const newFood = {
      name,
      ingredients,
      price,
      photos,
    };
    try {
      const response = fetch('/api/hello/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFood),
      });
      toast('Хоол амжилттай нэмэгдлээ.');
    } catch (error) {
      console.log('error');
    }
  };

  const handleDeleteFood = (id: string) => {
    fetch(`/api/hello/admin/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          setOrder(order.filter((food) => food._id !== id));
        } else {
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    fetch('/api/hello/admin')
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, []);

  return (
    <form className="text-md w-full">
      <div className="bg-slate-100 ">
        <div className="flex m-10 m-10 w-full">
          <LeftBar />
          <div className="w-[1200px] h-[500px] bg-white  p-10 mt-10 ml-10 text-md rounded-lg">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mb-10 text-lg">
                  Хоол нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[600px] bg-white text-center align-items-center   z-50">
                <div className="grid gap-2 p-20">
                  <div className="grid grid-cols-3 align-items-center gap-2  ">
                    <Label htmlFor="width" className="text-lg h-12 text-start ">
                      Хоолны нэр
                    </Label>
                    <Input id="width" className="col-span-2 h-12" onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="width" className="text-lg text-start h-12">
                      Орц
                    </Label>
                    <Input id="width" className="col-span-2 h-12 " onChange={(e) => setIngredients(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="width" className="text-lg h-12 text-start ">
                      Үнэ
                    </Label>
                    <Input id="width" className="col-span-2 h-12" onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="width" className="text-lg h-12 text-start ">
                      Зураг
                    </Label>
                    <Input className="col-span-2 h-12 bg-zinc-100 " onChange={(e) => setPhotos(e.target.value)} />
                  </div>
                  <Button variant="outline" className="mt-3" onClick={addFood}>
                    Оруулах
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <div>
              <Table className="text-2xl mb-5">
                <TableHeader>
                  <TableRow className="text-start font-bold ">
                    <TableHead className="w-[100px] text-bold ">№</TableHead>
                    <TableHead className="text-bold  ">Хоолны нэр, код</TableHead>
                    <TableHead className="text-bold">Орц</TableHead>
                    <TableHead className=" text-bold">Үнэ</TableHead>
                    <TableHead className="text-bold">Төлөв</TableHead>
                    <TableHead className=" text-bold">Зураг</TableHead>
                    <TableHead className=" text-bold">Устгах</TableHead>
                    <TableHead className=" text-bold">Шилдэг</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-lg">
                  {order.map((order: Orders) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium text-black"></TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.ingredients}</TableCell>
                      <TableCell className="text-black font-bold">{order.price}</TableCell>
                      <TableCell className=""></TableCell>
                      <TableCell className="">зураг</TableCell>
                      <TableCell className="">
                        <Button onClick={() => handleDeleteFood(order._id)}>Устгах</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
