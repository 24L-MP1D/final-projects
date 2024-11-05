'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import dayjs from 'dayjs';
import { Search } from 'lucide-react';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

export type tableType =
  | {
      id: ObjectId;
      table: number;
      reservedSeats: string;
      time: string;
      phoneNumber: number;
      day: Date;
    }
  | undefined;

const Order = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [incomeFilter, setIncomeFilter] = useState('Өнөөдөр');
  const [uploadOrder, setUploadOrder] = useState<tableType[]>([]);

  const loadFiltIncome = async () => {
    if (incomeFilter === 'Өнөөдөр') {
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - 1);
      const response = await fetch(`/api/admin/tablesOrder?startTime=${startTime}&endTime=${endTime}`);
      const data = await response.json();
      setUploadOrder(data);
    }

    if (incomeFilter === '7хоног') {
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - 7);
      const response = await fetch(`/api/admin/tablesOrder?startTime=${startTime}&endTime=${endTime}`);
      const data = await response.json();
      setUploadOrder(data);
    }
    if (incomeFilter === '1сар') {
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - 30);
      const response = await fetch(`/api/admin/tablesOrder?startTime=${startTime}&endTime=${endTime}`);
      const data = await response.json();
      setUploadOrder(data);
    }
  };
  useEffect(() => {
    loadFiltIncome();
  }, [incomeFilter]);

  return (
    <div className="flex max-w-[1440px] mx-auto">
      <div className="flex flex-col w-full">
        <div className="mx-[23.5px] mt-[34px] mb-6 flex justify-between ">
          <div className="flex  gap-2">
            <Button
              onClick={() => {
                setIncomeFilter('Өнөөдөр');
                loadFiltIncome();
              }}
              className={` ${
                incomeFilter === 'Өнөөдөр' ? 'bg-black text-white' : 'bg-white text-black'
              }  w-[94px] border-[#ECEDF0] hover:bg-slate-400 hover:font-bold hover:text-white border-[1px]  h-[36px] py-1.5 px-3 rounded-md text-[14px] `}
            >
              Өнөөдөр
            </Button>
            <Button
              onClick={() => {
                setIncomeFilter('7хоног');
                loadFiltIncome();
              }}
              className={` ${
                incomeFilter === '7хоног' ? 'bg-black text-white' : 'bg-white text-black'
              }  w-[94px] border-[#ECEDF0] hover:bg-slate-400 hover:font-bold hover:text-white border-[1px] h-[36px] py-1.5 px-3 rounded-md text-[14px] `}
            >
              7 хоног
            </Button>

            <Button
              onClick={() => {
                setIncomeFilter('1сар');
                loadFiltIncome();
              }}
              className={` ${
                incomeFilter === '1сар' ? 'bg-black text-white' : 'bg-white text-black'
              }  w-[94px] border-[#ECEDF0] hover:bg-slate-400 hover:font-bold hover:text-white border-[1px] h-[36px] py-1.5 px-3 rounded-md text-[14px] `}
            >
              1 сар
            </Button>
          </div>
          <div className="flex items-center gap-1 px-2 rounded-[8px] border-[#D6D8DB] border">
            <Search className="" />
            <Input className="w-[302px] h-9 outline-none resize-none border-none shadow-none text-sm font-normal focus-visible:ring-0 " type="input" placeholder="Бүтээгдэхүүн хайх" />
          </div>
        </div>
        <div className="rounded-[12px] shadow-xl border border-[#ECEDF0] ml-[23.5px] mr-6 pb-4">
          <div className="py-[20px] px-6 font-bold text-xl">Ширээ захиалгын мэдээлэл</div>
          <div className="">
            <Table className="bg-[##F7F7F8] border-b-[1px] w-[1218px] rounded-none">
              <TableHeader>
                <TableRow className="bg-[#D6D8DB]">
                  <TableHead className="max-w-[191px] text-xs font-semibold px-6 text-black py-[14px]">Ширээний дугаар</TableHead>
                  <TableHead className="max-w-[209px] text-xs font-semibold px-6 text-black py-[14px]">Үйлчлүүлэгчийн тоо</TableHead>
                  <TableHead className="max-w-[168px] text-xs font-semibold px-6 text-black py-[14px]">Огноо</TableHead>
                  <TableHead className="max-w-[129px] text-xs font-semibold px-6 text-black py-[14px]">Захиалгат цаг</TableHead>
                  <TableHead className="max-w-[214px] text-xs font-semibold px-6 text-black py-[14px] text-center">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadOrder.map(
                  (item: tableType) =>
                    item && (
                      <TableRow>
                        <TableCell className=" py-[26px] max-w-[156px]">
                          <p className="text-sm font-semibold px-6">#{item.table}</p>
                        </TableCell>
                        <TableCell className="px-6 py-4 max-w-[156px] flex flex-col text-left gap-2">
                          <p className="text-sm font-semibold">{item.reservedSeats}</p>
                        </TableCell>
                        {/* <TableCell className="px-6 max-w-[156px]">{dayjs(item.time).format('YYYY-MM-DD')}</TableCell>
                        <TableCell className="px-6 max-w-[156px]">{dayjs(item.time).format('HH:mm')}</TableCell> */}
                        <TableCell className="px-6 max-w-[156px]">{String(item.day)}</TableCell>
                        <TableCell className="px-6 max-w-[156px]">{item.time}</TableCell>
                        <TableCell className="px-6 py-4 max-w-[156px]">
                          <div className="border px-[10px] py-[6px] text-center rounded-full">other status...</div>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
