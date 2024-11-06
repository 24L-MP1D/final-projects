'use client';

import { AdminLayout } from '@/components/adminLayout';
import { BidType } from '@/components/bidType';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import dayjs from 'dayjs';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../layout';
const Home = () => {
  const [productId, setProductId] = useState('');
  const [bids, setBids] = useState<BidType[]>([]);
  const [CheckBoxArray, setCheckBoxArray] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const loadBids = async () => {
    const response = await fetch('/api/bids', {
      method: 'PUT',
      body: JSON.stringify({ searchValue }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();

    setBids(data);
  };
  const value = useContext(Context);
  const approveSell = () => {
    console.log('Successfully approved the Sell request');
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
    value?.setLayoutAside('Bids');
    loadBids();
  }, [searchValue]);
  if (!bids) return <AdminLayout>Ачааллаж байна</AdminLayout>;
  return (
    <AdminLayout>
      <div>
        <div className="max-w-[300px] relative items-center mt-6 mb-4 ml-4 flex gap-2 w-full px-4 py-2 rounded-lg bg-slate-100">
          <Search width={20} height={20} />
          <input className="flex-1 bg-slate-100 outline-none border-0" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder="search value..." />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="flex w-full  text-xl text-wrap py-3 bg-slate-200">
              <TableHead className=""></TableHead>
              <TableHead className="flex-1">Бүтээгдэхүүн</TableHead>
              <TableHead className="flex-1">Хэрэглэгч</TableHead>
              <TableHead className="flex-1">Үнэ хэлэх</TableHead>
              <TableHead className="flex-1">Үүсгэсэн огноо</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => {
              return (
                <TableRow className="flex items-center text-lg hover:cursor-pointer whitespace-nowrap border-b-2 border-solid">
                  <TableCell></TableCell>
                  <TableCell className="font-medium flex-1">
                    <div className="px-6">{bid.productInfo[0].productName}</div>
                    <Image src={bid.productInfo[0].frontImage} width={500} height={500} className="w-28 h-28 object-cover rounded-full" alt="zurag" />
                  </TableCell>
                  <TableCell className="font-medium flex-1 ">{bid.userInfo[0].email}</TableCell>
                  <TableCell className="font-medium flex-1 ">{bid.bid} ₮</TableCell>
                  <TableCell className="font-medium flex-1">{dayjs(bid.createdAt).format('YYYY-MM-DD')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};
export default Home;
