'use client';
import { TableHead } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import axios from 'axios';
import * as React from 'react';
import { toast } from 'sonner';
import LeftBar from '../components/leftbar';

export type Oneorder = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
export type Orders = {
  address: string;
  phonenumber: string;
  order: Oneorder[];
  totalprice: number;
  otp: string;
  id: string;
  deliveryperson: string;
  name: string;
};

const deliverystaff = [
  { name: 'Тэмүүжин', phonenumber: '98723478' },
  { name: 'Ууганбилэг', phonenumber: '89785674' },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [ordersData, setOrdersdata] = React.useState<Orders[]>([]);
  const [deliveryperson, setDeliveryperson] = React.useState('');
  const [email, setEmail] = React.useState('');
  console.log(typeof ordersData);

  function renderorders() {
    axios
      .get('/api/admin/successfullorder')
      .then((res) => setOrdersdata(res.data))
      .catch(function (error) {
        toast.error('Алдаа гарлаа');
      });
  }
  React.useEffect(() => {
    renderorders();
  }, []);

  const adddeliveryperson = (order: Orders) => {
    axios
      .put('/api/admin/successfullorder', { id: order.id, otp: order.otp, address: order.address, orderdetail: order.order, deliveryperson, email })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Хүргэлтийн ажилтанд амжилттай хувиарлагдлаа');
          renderorders();
        }
      })
      .catch(function (error) {
        toast.error('Алдаа гарлаа');
      });
  };
  //   function makeadmin(user: Users) {
  //     if (user.role === 'admin') {
  //       axios
  //         .put('/api/admin/removeadmin', { id: user._id })
  //         .then((res) => {
  //           if (res.status === 200) {
  //             toast.success('Амжилттай хэрэглэгч боллоо');
  //           }
  //         })
  //         .catch(function (error) {
  //           toast.error('Алдаа гарлаа. Дахин оролдоно уу');
  //         })
  //         .finally(() => renderusers());
  //     } else {
  //       axios
  //         .put('/api/admin/users', { id: user._id })
  //         .then((res) => {
  //           if (res.status == 200) {
  //             toast.success('Амжилттай админ боллоо');
  //           }
  //         })
  //         .catch(function (error) {
  //           toast.error('Алдаа гарлаа. Дахин оролдоно уу');
  //         })
  //         .finally(() => renderorders());
  //     }
  //   }

  return (
    <div className="flex  w-full  bg-gradient-to-r from-pink-100  to-white">
      <LeftBar />
      <div className=" mt-30 ml-6 ">
        <div className="text-5xl italic mt-16  mb-4">Хүргэлтийн захиалгууд</div>
        <div className="rounded-md border bg-white p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-wrap">Захиалга</TableHead>
                  <TableHead className="text-wrap">Захиалгын мэдээлэл</TableHead>
                  <TableHead className="text-wrap">Нийт үнийн дүн</TableHead>
                  <TableHead className="text-wrap">Хүргэлтийн ажилтан сонгох</TableHead>
                  <TableHead className="text-wrap">Хүргэлтийн ажилтантай холбогдох</TableHead>
                  <TableHead className="text-wrap">Хүргэлтэнд хувиарлах</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.otp}</TableCell>

                    {order.order.map((oneorder) => (
                      <>
                        <TableCell>{oneorder.name}</TableCell>
                        <TableCell className="text-center">{oneorder.price}.0₮</TableCell>
                      </>
                    ))}

                    <TableCell>
                      <Select onValueChange={setDeliveryperson}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Хүргэлтийн ажилтан" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="text-center">
                            {deliverystaff.map((delivery) => (
                              <SelectItem value={delivery.phonenumber} className="text-center">
                                {delivery.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{order.deliveryperson}</TableCell>
                    <Button onClick={() => adddeliveryperson(order)} className="mt-2">
                      Хувиарлах
                    </Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground"></div>
        </div>
      </div>
    </div>
  );
}
