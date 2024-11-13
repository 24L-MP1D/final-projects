'use client';

import { useAuthStore } from '@/app/components/auth/useAuthStore';
import { ProductType } from '@/components/productType';
import { ProfileAside } from '@/components/profileAside';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function App() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const search = useSearchParams();
  const queryValue = search.get('seller') || '';
  const currentUser = useAuthStore((state) => state.currentUser);
  const [count, setCount] = useState(8);
  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products', {
        method: 'PUT',
        body: JSON.stringify({ userId: currentUser?._id, limit: count }),
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

  useEffect(() => {
    if (currentUser) loadProduct();
  }, [currentUser, page]);
  if (!products.length)
    return (
      <div className="min-h-screen">
        <ProfileAside queryValue={queryValue} />
        <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] items-center flex">
          <div className="text-3xl">Одоогоор бүтээгдэхүүн байхгүй байна.</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-200 flex gap-5">
      <ProfileAside queryValue={queryValue} />
      <div className="flex-1 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="flex w-full whitespace-nowrap py-3 bg-slate-200">
              <TableHead className="flex-1">Бүтээгдэхүүний нэр</TableHead>
              <TableHead className="flex-1">Бүтээгдэхүүний зураг</TableHead>
              <TableHead className="flex-1">Төлөв</TableHead>
              <TableHead className="flex-1">Төлбөр</TableHead>
              <TableHead className="flex-1">Эхлэх огноо</TableHead>
              <TableHead className="flex-1">Дуусах огноо</TableHead>
              <TableHead className="flex-1">Үнийн санал</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <div className="border">
                  <TableRow className="flex items-center text-lg hover:cursor-pointer whitespace-nowrap border-b-2 border-solid">
                    <TableCell className="font-medium flex-1 text-wrap">{product.productName}</TableCell>
                    <TableCell className="font-medium flex-1 flex items-center justify-center">
                      <Image src={product.frontImage || '/'} width={500} height={500} className="w-28 h-28 object-cover rounded-full" alt="zurag" />
                    </TableCell>
                    <TableCell className="flex-1 text-center">{product.status}</TableCell>
                    <TableCell className="flex-1 text-center">Qpay</TableCell>
                    <TableCell className="flex-1 text-center">{dayjs(product.startDate).format('YYYY-MM-DD')}</TableCell>
                    <TableCell className="flex-1 text-center">{dayjs(product.endDate).format('YYYY-MM-DD')}</TableCell>
                    <TableCell className="flex-1 text-center">{product.startBid} ₮</TableCell>
                  </TableRow>
                </div>
              );
            })}
          </TableBody>
        </Table>
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

              <div> Цааш үзэх</div>

            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
