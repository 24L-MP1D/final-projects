'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/table';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Food } from '@/lib/types';
import { Label } from '@radix-ui/react-label';
import { Heart, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LeftBar from '../components/leftbar';
export default function Order() {
  const [order, setOrder] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [special, setSpecial] = useState(false);
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

  const addFood = (data: any) => {
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
      console.log('created');
    } catch (error) {
      console.log('error');
    }
  };

  const handleEditFood = (selectedItem: Food) => {
    if (selectedItem) {
      setSelectedFood(selectedItem);
      setName(selectedItem.name);
      setIngredients(selectedItem.ingredients);
      setPrice(selectedItem.price);
      setImageUrl(selectedItem.photos);
    } else {
      // Handle the case where no item is found (optional)
      console.log('Item not found');
    }
  };

  const handleDeleteFood = (_id: string) => {
    fetch(`/api/hello/admin/${_id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          setOrder(order.filter((food) => food._id !== _id));
          toast('Successfully deleted the product');
        } else {
          console.log('Error occurred during deletion');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const updateFood = async () => {
    if (!selectedFood) return;
    const updatedFood = {
      name,
      ingredients,
      price,
      photos: imageUrl,
      key: 0,
    };

    try {
      const response = await fetch(`/api/hello/admin/${selectedFood._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFood),
      });

      if (response.ok) {
        toast('Хоол амжилттай шинэчиллээ');
        const updatedOrder = await response.json();
        setOrder(order.map((food) => (food._id === updatedOrder._id ? updatedOrder : food)));
        setSelectedFood(null);
      } else {
        toast.error('Шинэчлэлд алдаа гарлаа');
      }
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };

  const handleSpecialFood = async (foodId: string) => {
    try {
      await fetch(`/api/special/${foodId}`, {
        method: 'POST',
      });
      toast.success('Food added to special items!');
    } catch (error) {
      console.error('Error adding special food:', error);
      toast.error('Error a  dding to special items');
    }
  };
  const handleRemoveSpecial = async (foodId: string) => {
    try {
      await fetch(`/api/special/${foodId}`, {
        method: 'DELETE',
      });
      toast.success('Food removed from special list!');
    } catch (error) {
      console.error('Error removing special food:', error);
      toast.error('Error removing to special items');
    }
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
        setSpecial(data);
      });
  }, []);

  return (
    <div className="text-md">
      <div className="bg-slate-100">
        <div className="flex m-10">
          <LeftBar />
          <div className="bg-white  p-10 mt-10 ml-10 text-md rounded-lg mx-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="mb-10 text-lg">
                  Хоол нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[600px] bg-white text-center align-items-center  z-50">
                <div className="grid gap-2 p-20">
                  <div className="grid grid-cols-3 align-items-center gap-2 text-center">
                    <Label htmlFor="width" className="text-lg h-12 text-start ">
                      Хоолны нэр
                    </Label>
                    <Input id="width" className="col-span-2 h-12" onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 text-center gap-2 ">
                    <Label htmlFor="width" className="text-lg h-12">
                      Орц
                    </Label>
                    <Input id="width" className="col-span-2 h-12 " onChange={(e) => setIngredients(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 text-center gap-2 ">
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
                  <div className="grid grid-cols-3 align-items-center gap-2 ">
                    <Label htmlFor="width" className="text-lg h-12">
                      Төлөв
                    </Label>
                    <Input id="width" className="col-span-2 h-12" />
                  </div>
                  <Button variant="outline" className="mt-3" onClick={addFood}>
                    Оруулах
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <div>
              <Table className="text-xl mb-5">
                <TableHeader>
                  <TableRow className="text-center font-bold text-wrap">
                    <TableHead className="text-bold ">№</TableHead>
                    <TableHead className="text-bold ">Хоолны нэр, код</TableHead>
                    <TableHead className="text-bold">Орц</TableHead>
                    <TableHead className=" text-bold">Үнэ</TableHead>
                    <TableHead className=" text-bold">Зураг</TableHead>
                    <TableHead className="text-bold">Засах</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-md">
                  {order.map((order: Food) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium text-black"></TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.ingredients}</TableCell>
                      <TableCell className="text-black font-bold">{order.price}</TableCell>
                      <TableCell className="w-50 h-50">
                        <img className=" mx-auto w-[50px] h-[50px] object-cover rounded-full items-center" width={150} height={150} src={order.photos} alt={order.name} />
                      </TableCell>
                      <TableCell className="text-center align-middle">
                        <Dialog>
                          <DialogTrigger asChild className="">
                            <Button variant="default3">
                              <Pencil onClick={() => handleEditFood(order)} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[600px] bg-white text-center align-items-center z-50">
                            <div className="grid gap-2 p-20">
                              <div className="grid grid-cols-3 align-items-center gap-2  ">
                                <Label htmlFor="width" className="text-lg h-12 text-start ">
                                  Хоолны нэр
                                </Label>
                                <Input id="width" className="col-span-2 h-12" defaultValue={selectedFood?.name || ''} onChange={(e) => setName(e.target.value)} />
                              </div>
                              <div className="grid grid-cols-3 text-center gap-2 ">
                                <Label htmlFor="width" className="text-lg h-12">
                                  Орц
                                </Label>
                                <Input id="width" className="col-span-2 h-12 " defaultValue={selectedFood?.ingredients || ''} onChange={(e) => setIngredients(e.target.value)} />
                              </div>
                              <div className="grid grid-cols-3 text-center gap-2 ">
                                <Label htmlFor="width" className="text-lg h-12">
                                  Үнэ
                                </Label>
                                <Input id="width" className="col-span-2 h-12" onChange={(e) => setPrice(e.target.value)} defaultValue={selectedFood?.price || ''} />
                              </div>
                              {/* <div className="grid grid-cols-3 align-items-center gap-2 ">
                                <Label htmlFor="images" className="text-lg h-12">
                                  Зураг
                                </Label>
                                <Input type="file" className="col-span-2 h-12 bg-zinc-100 " id="images" onChange={handleUpload} defaultValue={selectedFood?.photos || ''} />
                                {loading && <span className="text-red">Loading...</span>}
                                {imageUrl && <img className="w-50 h-50 ml-24" src={imageUrl} alt="Uploaded" />}
                              </div> */}
                              <div className="grid grid-cols-3 align-items-center gap-2 ">
                                <Label htmlFor="width" className="text-lg h-12">
                                  <Switch />
                                </Label>
                                <Input id="width" className="col-span-2 h-12" />
                              </div>
                              <Button variant="outline" className="mt-3" onClick={updateFood}>
                                Шинэчлэх
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell className=" text-center align-middle">
                        <Button className="hover:bg/40 bg-slate-600">
                          <Trash onClick={() => handleDeleteFood(order._id)} />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center align-middle flex-col">
                        <Button>
                          <Heart onClick={() => handleSpecialFood(order._id)} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
