'use client';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/table';
import { TableHeader } from '@/components/ui/table';

export default function Order() {
  return (
    <div className="ml-6 my-6 ">
      <h1 className="text-2xl p-2">Хүргэлтийн захиалга</h1>
      <Table className="bg-white border-b-[1px] w-[1218px] rounded-none">
        <TableHeader>
          <TableRow className="bg-[#D6D8DB] text-lg">
            <TableHead className="max-w-[191px] text-lg font-semibold px-6 text-black py-[14px]">№-</TableHead>
            <TableHead className="max-w-[209px] text-lg font-semibold px-6 text-black py-[14px]">Захиалсан хоол</TableHead>
            <TableHead className="max-w-[168px] text-lg font-semibold px-6 text-black py-[14px]">Мөнгөн дүн</TableHead>
            <TableHead className="max-w-[129px] text-lg font-semibold px-6 text-black py-[14px]">Тоо/ширхэг</TableHead>
            <TableHead className="max-w-[129px] text-lg font-semibold px-6 text-black py-[14px] text-wrap">Захиалагчийн утасны дугаар, Имэйл хаяг</TableHead>
            <TableHead className="max-w-[214px] text-lg font-semibold px-6 text-black py-[14px] text-center">Захиалагчийн хаяг</TableHead>
            <TableHead className="max-w-[214px] text-lg font-semibold px-6 text-black py-[14px] text-center">Нийт дүн</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className=" py-[26px] max-w-[156px]">
              <p className="text-sm font-semibold px-6">#</p>
            </TableCell>
            <TableCell className="px-6 py-4 max-w-[156px] flex flex-col text-left gap-2">
              <p className="text-sm font-semibold"></p>
            </TableCell>
            {/* <TableCell className="px-6 max-w-[156px]">{dayjs(item.time).format('YYYY-MM-DD')}</TableCell>
                        <TableCell className="px-6 max-w-[156px]">{dayjs(item.time).format('HH:mm')}</TableCell> */}
            <TableCell className="px-6 max-w-[156px]"></TableCell>
            <TableCell className="px-6 max-w-[156px]"></TableCell>
            <TableCell className="px-6 py-4 max-w-[156px]"></TableCell>
            <TableCell className="px-6 max-w-[156px]"></TableCell>
            <TableCell className="px-6 py-4 max-w-[156px]"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
