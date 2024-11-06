'use client';

import { DashboardAside } from '../components/DashboardAside';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export default function Home() {
  interface user {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repassword: string;
  }

  return (
    <div className="flex ">
      <DashboardAside />
      <div className="text-center">INCOME</div>
      {/* <div className="h-[100px] w-[200px] rounded-xl bg-pink-200 p-3 ml-5 mt-4">Income amount </div> */}
      <Table className="border-[1px] border-[#d1d5db] w-[800px] ml-5 mt-5 rounded-xl bg-white ">
        <TableCaption>Орлогын журнал </TableCaption>
        <TableHeader className="">
          <TableRow className=" flex justify-between">
            <TableHead>Нэхэмжлэх</TableHead>
            <TableHead>Төлбөрийн статус</TableHead>
            <TableHead>Төлбөрийн хэлбэр</TableHead>
            <TableHead>Төлбөрийн дүн</TableHead>
            <TableHead>Төлбөрийн дүн</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="flex justify-between">
            <TableCell className="font-medium">dd</TableCell>
            <TableCell>PaymentStatus</TableCell>
            <TableCell>PaymentMethod</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
