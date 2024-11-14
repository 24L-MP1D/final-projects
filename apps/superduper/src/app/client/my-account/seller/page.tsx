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
      <div className="min-h-screen bg-blue-50">
        <ProfileAside queryValue={queryValue} />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
          <div className="text-3xl text-blue-700">Одоогоор бүтээгдэхүүн байхгүй байна.</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 flex gap-5">
      <ProfileAside queryValue={queryValue} />
      <div className="flex-1 bg-white shadow-lg rounded-lg p-5">
        <Table>
          <TableHeader>
            <TableRow className="flex w-full whitespace-nowrap py-3 bg-blue-100 rounded-t-lg">
              <TableHead className="flex-1 text-blue-800">Бүтээгдэхүүний нэр</TableHead>
              <TableHead className="flex-1 text-blue-800">Бүтээгдэхүүний зураг</TableHead>
              <TableHead className="flex-1 text-blue-800">Төлөв</TableHead>
              <TableHead className="flex-1 text-blue-800">Төлбөр</TableHead>
              <TableHead className="flex-1 text-blue-800">Эхлэх огноо</TableHead>
              <TableHead className="flex-1 text-blue-800">Дуусах огноо</TableHead>
              <TableHead className="flex-1 text-blue-800">Үнийн санал</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} className="flex items-center text-lg hover:bg-blue-50 whitespace-nowrap border-b border-blue-100">
                <TableCell className="font-medium flex-1">{product.productName}</TableCell>
                <TableCell className="flex-1 flex items-center justify-center">
                  <Image src={product.frontImage || '/'} width={500} height={500} className="w-28 h-28 object-cover rounded-full border-2 border-blue-200" alt="zurag" />
                </TableCell>
                <TableCell className="flex-1 text-center text-blue-600">{product.status}</TableCell>
                <TableCell className="flex-1 text-center text-blue-600">Qpay</TableCell>
                <TableCell className="flex-1 text-center text-blue-600">{dayjs(product.startDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell className="flex-1 text-center text-blue-600">{dayjs(product.endDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell className="flex-1 text-center text-blue-600">{product.startBid} ₮</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {products.length >= count * page && (
          <div className="flex justify-center mt-10">
            <Button disabled={loading} onClick={() => setPage(page + 1)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200">
              {loading && <Image src={'/images/spinner.svg'} alt="loading" width={20} height={20} className="animate-spin" />}
              <span>Цааш үзэх</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
