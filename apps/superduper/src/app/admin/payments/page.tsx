'use client';
import { AdminLayout } from '@/components/adminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { IconBrandVisa } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { Context } from '../layout';

const approvedSellRequest = [
  {
    ObjectId: '1',
    category: 'Урлаг ба цуглуулга',
  },
  {
    ObjectId: '2',
    category: 'Үнэт эдлэл ба цаг',
  },
  {
    ObjectId: '3',
    category: 'Aвтомашинууд',
  },
];

export default function TableDemo() {
  const value = useContext(Context);
  useEffect(() => {
    value?.setLayoutAside('Payment');
  }, []);
  return (
    <AdminLayout>
      <div className="container w-[550px] peer-has-[]: mx-auto flex justify-center p-6 bg-slate-100 rounded-sm">
        <Table>
          <TableCaption>Таны саяхан зөвшөөрсөн худалдагчийн хүсэлтийн жагсаалт.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Ангиллын нэр</TableHead>
              <TableHead className="text-center">Зөвшөөрлийн байдал</TableHead>
              <TableHead className="text-center">Төлбөрийг хүлээн авсан</TableHead>
              <TableHead className="text-center">Төлбөрийг дамжуулсан</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvedSellRequest.map((approved) => {
              return (
                <TableRow key={approved.ObjectId}>
                  <TableCell>{approved.ObjectId}</TableCell>
                  <TableCell className="font-medium">{approved.category}</TableCell>
                  <TableCell className="text-center">Зөвшөөрсөн</TableCell>
                  <TableCell className="text-center">Тийм</TableCell>
                  <TableCell className="text-center">
                    <IconBrandVisa />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow></TableRow>

            <div className="container mx-auto flex">
              <div>
                <Button variant="outline" onClick={() => (window.location.href = 'http://localhost:3000/admin')}>
                  Хаах
                </Button>
              </div>
            </div>
          </TableFooter>
        </Table>
      </div>
    </AdminLayout>
  );
}
