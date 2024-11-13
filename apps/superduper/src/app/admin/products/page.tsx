'use client';
import '@/app/styles.css';
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

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [open, setOpen] = useState(false);

  const [productId, setProductId] = useState<string>('');

  const [feedBackInput, setFeedBackInput] = useState(false);

  const [show, setShow] = useState(false);

  const [date, setDate] = React.useState<DateRange | undefined>();

  const [searchValue, setSearchValue] = useState('');

  const [userId, setUserId] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(6);
  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products', {
        method: 'PUT',
        body: JSON.stringify({
          page,
          limit: count,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const filtbyStatus = async (status: string) => {
    try {
      setShow(false);
      const response = await fetch(`/api/products?status=${status}&startDate=${date?.from ? date.from : ''}&endDate=${date?.to ? date.to : ''}`);
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
  }, [date, page]);
  if (!products.length)
    return (
      <AdminLayout>
        <div className="min-h-screen">
          <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] items-center flex">
            <div className="loader">
              <div className="loader-bar bar-1"></div>
              <div className="loader-bar bar-2"></div>
              <div className="loader-bar bar-3"></div>
              <div className="loader-bar bar-4"></div>
            </div>
            <div className="font-bold text-3xl">Ачаалж байна...</div>
          </div>
        </div>
      </AdminLayout>
    );
  return (
    <AdminLayout>
      <div onClick={() => show && setShow(false)}>
        <div className="flex gap-2 items-center mt-6 mb-2">
          {CheckBoxArray.length > 0 && <Button>Олонг устгах</Button>}
          <div className="flex justify-center max-w-[140px] w-full relative gap-3 items-center ">
            <div onClick={() => setShow(true)} className="flex gap-2 hover:cursor-pointer border-2 w-full p-2 items-center justify-center rounded-lg cursor-pointer">
              <div>Төлөв</div>
              <div>
                <ChevronDown />
              </div>
            </div>

            {show && (
              <div className="flex hover:cursor-pointer flex-col border rounded-lg gap-2 absolute top-10 w-full left-0 bg-white z-50">
                <div onClick={() => filtbyStatus('Pending')} className=" py-2 border-b w-full text-center">
                  Хүлээгдэж байна
                </div>
                <div onClick={() => filtbyStatus('Accept')} className="py-2 border-b w-full text-center">
                  Зөвшөөрөх
                </div>
                <div onClick={() => filtbyStatus('Deny')} className="py-2 border-b w-full text-center">
                  Үгүйсгэх
                </div>
              </div>
            )}
          </div>

          <div>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <div className="max-w-[300px] relative items-center flex gap-2 w-full px-4 py-2 rounded-lg bg-slate-100">
            <Search width={20} height={20} />
            <input className="flex-1 bg-slate-100 outline-none border-0" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="хайх" placeholder="Бүтээгдэхүүний нэр..." />
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
          <Button
            className="active:bg-slate-600"
            onClick={() => {
              setPage(products.length);
              loadProduct();
            }}
          >
            Бүх бүтээгдэхүүн
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="flex w-full text-xl py-3 bg-slate-200">
              <TableHead></TableHead>
              <TableHead className="flex-1">Бүтээгдэхүүний нэр</TableHead>
              <TableHead className="flex-1">Бүтээгдэхүүний зураг</TableHead>
              <TableHead className="flex-1">Төлөв</TableHead>
              <TableHead className="flex-1">Төлбөр</TableHead>
              <TableHead className="flex-1">Эхлэх огноо</TableHead>
              <TableHead className="flex-1">Дуусах огноо</TableHead>
              <TableHead className="flex-1">Эхлэх Үнэ</TableHead>
              <TableHead className="flex-1"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow className="flex items-center text-lg hover:cursor-pointer text-wrap border-b-2 border-solid">
                  <TableCell>
                    <Checkbox checked={CheckBoxArray.includes(product._id)} onClick={() => CheckboxFunc(product._id)} />
                  </TableCell>
                  <TableCell className="font-medium flex-1">{product.productName}</TableCell>
                  <TableCell className="font-medium flex-1 flex items-center justify-center">
                    <Image src={product.frontImage} width={500} height={500} className="w-28 h-28 object-cover rounded-full" alt="zurag" />
                  </TableCell>
                  <TableCell className="flex-1 text-right">{product.status}</TableCell>
                  <TableCell className="flex-1 text-right">Qpay</TableCell>
                  <TableCell className="flex-1 text-center">{dayjs(product.startDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell className="flex-1 text-center">{dayjs(product.endDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell className="flex-1 text-center">{product.startBid}</TableCell>
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
                        setUserId(product.userId);
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
        {feedBackInput && <FeedBackInput productId={productId} userId={userId} loadProduct={loadProduct} setFeedBackInput={setFeedBackInput} />}
      </div>
      <Toaster />
      {products.length >= count * page && (
        <div className="flex justify-center mt-10">
          <Button
            disabled={loading}
            onClick={() => {
              setPage(page + 1);
            }}
            className="flex items-center gap-1"
          >
            {loading && <Image src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}
            <div> Цааш үзэх </div>
          </Button>
        </div>
      )}
    </AdminLayout>
  );
};
export default Home;
