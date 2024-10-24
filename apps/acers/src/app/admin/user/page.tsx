'use client';

import { DashboardAside } from '../components /DashboardAside';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components /ui/Table';

export default function Home() {
  return (
    <div className="flex">
      <DashboardAside />
      <div className="text-center text-bold text-center"> USER </div>
      <Table className="border-[1px] border-[#d1d5db] ml-5 mt-5  w-[800px] rounded-xl bg-white  ">
        <TableCaption>Хэрэглэгчийн бүртгэлийн жагсаалт </TableCaption>
        <TableHeader>
          <TableRow className="justify-between">
            <TableHead>Username</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="">phoneNumber</TableHead>
            <TableHead className="">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="justify-between">
            <TableCell className="font-medium">.userName</TableCell>
            <TableCell>._id</TableCell>
            <TableCell>.email</TableCell>
            <TableCell className="">.phoneNumber</TableCell>
            <TableCell className="">.Role</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
