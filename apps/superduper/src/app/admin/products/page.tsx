'use client';
import { AdminLayout } from '@/components/adminLayout';
import { AdminMessageSendDialog } from '@/components/adminMessageSendDialog';
import { DatePickerWithRange } from '@/components/dateRange';
import { FeedBackInput } from '@/components/feedBack';
import { ProductType } from '@/components/productType';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import dayjs from 'dayjs';
import { ChevronDown, Search, Send, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Toaster } from 'sonner';
import { Context } from '../layout';
const Home = () => {
  const value = useContext(Context);

  const [CheckBoxArray, setCheckBoxArray] = useState<string[]>([]);

  const [products, setProducts] = useState<ProductType[]>([]);

  const [open, setOpen] = useState(false);

  const [productId, setProductId] = useState<string>('');

  const [feedBackInput, setFeedBackInput] = useState(false);

  const [show, setShow] = useState(false);

  const [date, setDate] = React.useState<DateRange | undefined>();

  const [searchValue, setSearchValue] = useState('');

  const loadProduct = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtbyStatus = async (status: string) => {
    try {
      setShow(false);
      console.log('adssa');
      const response = await fetch(`/api/products?status=${status}&startDate=${date?.from}&endDate=${date?.to}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      if (confirm('are you sure ?')) {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        if (response.status == 200) {
          alert('successfully deleted');
        }
      }
      loadProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const showOneProduct = (id: string) => {
    const oneProduct = products.filter((product) => product._id === id);
    setProducts(oneProduct);
  };

  const CheckboxFunc = (id: string) => {
    if (CheckBoxArray.includes(id)) {
      setCheckBoxArray(() => CheckBoxArray.filter((item) => item !== id));
    } else {
      const newArray = [...CheckBoxArray];
      newArray.push(id);
      setCheckBoxArray(newArray);
    }
  };

  useEffect(() => {
    if (date?.from && date.to) {
      filtbyStatus('');
    } else {
      loadProduct();
    }
    value?.setLayoutAside('Products');
  }, [date]);
  if (!products.length) return <div>loading</div>;
  return (
    <AdminLayout>
      <div onClick={() => show && setShow(false)}>
        <div className="flex gap-2 items-center mt-6 mb-2">
          {CheckBoxArray.length > 0 && <Button>Delete Many</Button>}
          <div className="flex justify-center max-w-[140px] w-full relative gap-3 items-center ">
            <div onClick={() => setShow(true)} className="flex gap-2 hover:cursor-pointer border-2 w-full p-2 items-center justify-center rounded-lg cursor-pointer">
              <div>Status</div>
              <div>
                <ChevronDown />
              </div>
            </div>

            {show && (
              <div className="flex hover:cursor-pointer flex-col border rounded-lg gap-2 absolute top-10 w-full left-0 bg-white z-50">
                <div onClick={() => filtbyStatus('Pending')} className=" py-2 border-b w-full text-center">
                  Pending
                </div>
                <div onClick={() => filtbyStatus('Accept')} className="py-2 border-b w-full text-center">
                  Accept
                </div>
                <div onClick={() => filtbyStatus('Deny')} className="py-2 border-b w-full text-center">
                  Deny
                </div>
              </div>
            )}
          </div>

          <div>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <div className="max-w-[300px] relative items-center flex gap-2 w-full px-4 py-2 rounded-lg bg-slate-100">
            <Search width={20} height={20} />
            <input className="flex-1 bg-slate-100 outline-none border-0" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder="Product Name..." />
            {searchValue && (
              <div className="absolute top-10 z-50 left-0 w-full">
                {products.map((product) => {
                  return (
                    product.productName.toLowerCase().includes(searchValue.toLowerCase()) && (
                      <div
                        onClick={() => {
                          showOneProduct(product._id);
                          setSearchValue(product.productName);
                        }}
                        className="px-3 py-2 flex gap-2 items-center hover:cursor-pointer active:bg-slate-100 bg-slate-50 border"
                      >
                        <div className="overflow-hidden rounded-full w-10 h-10">
                          <Image src={product.frontImage} width={50} height={50} alt="zurag" className="object-cover" />
                        </div>
                        <div>{product.productName}</div>
                      </div>
                    )
                  );
                })}
              </div>
            )}
          </div>
          <Button className="active:bg-slate-600" onClick={loadProduct}>
            All Product
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="flex w-full  text-xl text-wrap py-3 bg-slate-200">
              <TableHead></TableHead>
              <TableHead className="flex-1">Product Name</TableHead>
              <TableHead className="flex-1">Product Image</TableHead>
              <TableHead className="flex-1">Status</TableHead>
              <TableHead className="flex-1">Qpay</TableHead>
              <TableHead className="flex-1">Start Date</TableHead>
              <TableHead className="flex-1">End Date</TableHead>
              <TableHead className="flex-1">start bid</TableHead>
              <TableHead className="flex-1"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow className="flex items-center text-lg hover:cursor-pointer whitespace-nowrap border-b-2 border-solid">
                  <TableCell>
                    <Checkbox checked={CheckBoxArray.includes(product._id)} onClick={() => CheckboxFunc(product._id)} />
                  </TableCell>
                  <TableCell className="font-medium flex-1">{product.productName}</TableCell>
                  <TableCell className="font-medium flex-1 flex items-center justify-center">
                    <Image src={product.frontImage} width={500} height={500} className="w-28 h-28 object-cover rounded-full" alt="zurag" />
                  </TableCell>
                  <TableCell className="flex-1">{product.status}</TableCell>
                  <TableCell className="flex-1">Qpay</TableCell>
                  <TableCell className="flex-1">{dayjs(product.startDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell className="flex-1">{dayjs(product.endDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell className="flex-1">{product.startBid}</TableCell>
                  <TableCell className="flex-1 flex gap-4 items-center">
                    <Trash
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                    />

                    <Send
                      onClick={() => {
                        setOpen(true);
                        setProductId(product._id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {open && <AdminMessageSendDialog setFeedBackInput={setFeedBackInput} productId={productId} open={open} loadProduct={loadProduct} setOpen={setOpen} />}
        {feedBackInput && <div className="absolute inset-0 opacity-50 bg-slate-500"></div>}
        {feedBackInput && <FeedBackInput productId={productId} loadProduct={loadProduct} setFeedBackInput={setFeedBackInput} />}
      </div>
      <Toaster />
    </AdminLayout>
  );
};
export default Home;
