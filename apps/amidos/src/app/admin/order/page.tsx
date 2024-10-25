'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/table';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [specialOrders, setSpecialOrders] = useState<{ [key: string]: boolean }>({});

  const CLOUDINARY_CLOUD_NAME = 'dozicpox6';
  const CLOUDINARY_UPLOAD_PRESET = 'pe3w78vd';

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      setLoading(true);
      fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          alert('An Error Occured While Uploading');
        });
    }
  };

  const addFood = () => {
    const newFood = {
      name,
      ingredients,
      price,
      photos: imageUrl,
    };
    try {
      const response = fetch('/api/hello/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFood),
      });
      toast('Хоол амжилттай нэмэгдлээ');
      console.log('created');
    } catch (error) {
      console.log('error');
    }
  };
  const toSpecial = () => {
    const special = {};
    try {
      const response = fetch('/api/hello/special', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(special),
      });
      toast('Хоолыг онцгой меню руу орууллаа');
      console.log('created');
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
          console.log('Successfully deleted the product');
        } else {
          console.log('Error occurred during deletion');
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

  useEffect(() => {
    fetch('/api/special')
      .then((res) => res.json())
      .then((data) => {
        setSpecialOrders(data);
      });
  }, []);

  return (
    <form className="text-md">
      <div className="bg-slate-100">
        <div className="flex  m-10">
          <LeftBar />
          <div className="  bg-white  p-10 mt-10 ml-10 text-md rounded-lg">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mb-10 text-lg">
                  Хоол нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[600px] bg-white text-center align-items-center  z-50">
                <div className="grid gap-2 p-20">
                  <div className="grid grid-cols-3 align-items-center gap-2  ">
                    <Label htmlFor="width" className="text-lg h-12 text-start ">
                      Хоолны нэр
                    </Label>
                    <Input id="width" className="col-span-2 h-12" onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="width" className="text-lg h-12">
                      Орц
                    </Label>
                    <Input id="width" className="col-span-2 h-12 " onChange={(e) => setIngredients(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="width" className="text-lg h-12">
                      Үнэ
                    </Label>
                    <Input id="width" className="col-span-2 h-12" onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="images" className="text-lg h-12">
                      Зураг
                    </Label>
                    <Input type="file" className="col-span-2 h-12 bg-zinc-100 " id="images" onChange={handleUpload} />
                    {loading && <span className="text-red">Loading...</span>}
                    {imageUrl && <img className="w-50 h-50 ml-24" src={imageUrl} alt="Uploaded" />}
                  </div>
                  {/* <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="width" className="text-lg h-12">
                    
                    </Label>
                    <Input id="width" className="col-span-2 h-12" />
                  </div> */}
                  <Button variant="outline" className="mt-3" onClick={addFood}>
                    Оруулах
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <div>
              <Table className="text-2xl mb-5 mx-auto">
                <TableHeader>
                  <TableRow className="text-center font-bold ">
                    <TableHead className="w-[100px] text-bold ">№</TableHead>
                    <TableHead className="text-bold ">Хоолны нэр, код</TableHead>
                    <TableHead className="text-bold">Орц</TableHead>
                    <TableHead className=" text-bold">Үнэ</TableHead>
                    <TableHead className="text-bold">Онцгой хоол</TableHead>
                    <TableHead className=" text-bold">Зураг</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-lg">
                  {order.map((order: Orders) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium text-black"></TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.ingredients}</TableCell>
                      <TableCell className="text-black font-bold">{order.price}</TableCell>
                      <TableCell className="">
                        <Switch onClick={toSpecial} />
                      </TableCell>
                      <TableCell className="w-80 h-50">
                        <img className=" ml-24 mx-auto w-[150px] h-[150px] object-cover rounded-full items-center" width={150} height={150} src={order.photos} alt={order.name} />
                      </TableCell>
                      <TableCell className="w-80 text-center">
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
