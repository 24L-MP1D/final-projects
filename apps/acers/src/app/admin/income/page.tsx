'use client';

import { DashboardAside } from '../components /DashboardAside';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components /ui/Table';

export default function Home() {
  return (
    <div className="flex ">
      <DashboardAside />
      <div className="flex flex-col gap-4">
        <div className="h-[100px] w-[200px] rounded-xl bg-pink-200 p-3 ml-5 mt-4">Income amount </div>
        <Table className="border-[1px] border-[#d1d5db] ml-5 rounded-xl">
          <TableCaption>Орлогын журнал </TableCaption>
          <TableHeader>
            <TableRow className="justify-between">
              <TableHead>Нэхэмжлэх</TableHead>
              <TableHead>Төлбөрийн статус</TableHead>
              <TableHead>Төлбөрийн хэлбэр</TableHead>
              <TableHead className="">Төлбөрийн дүн</TableHead>
              <TableHead className="">Төлбөрийн дүн</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="justify-between">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
