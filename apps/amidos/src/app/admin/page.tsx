import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import LeftBar from './components/leftbar';

export default function Home() {
  return (
    <div>
      <div className="flex m-10 ml-0">
        <LeftBar />
        <div className=" w-[600px] h-[500px] bg-slate-300 ml-[20px] ">
          <Button className="default  text-white" variant="default">
            Хоол нэмэх
          </Button>
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow className="text-center ">
                  <TableHead className="w-[100px] text-bold">№</TableHead>
                  <TableHead className="text-bold">Хоолны нэр, код</TableHead>
                  <TableHead className="text-bold">Орц</TableHead>
                  <TableHead className="text-center text-bold">Үнэ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
