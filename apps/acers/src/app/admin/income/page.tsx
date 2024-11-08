'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../(client)/components/ui/Table';
import { DashboardAside } from '../components/DashboardAside';

export default function Home() {
  interface user {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repassword: string;
  }

  // const [currentPage, setCurrentPage] = useState(1);
  // const PerPage = 15;
  // const totalPages = Math.ceil(incomes.length / incomesPerPage);
  // const indexOfLastIncome = currentPage * incomesPerPage;
  // const indexOfFirstIncome = indexOfLastIncome - incomesPerPage;
  // const currentIncomes = incomes.slice(indexOfFirstIncome, indexOfLastIncome);

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };
  return (
    <div className="flex gap-6">
      <DashboardAside />
      <div className="bg-slate-100 rounded-xl mx-auto  mt-2 p-5">
        <div className="text-center font-bold">САНХҮҮГИЙН ҮЗҮҮЛЭЛТ </div>
        {/* <div className="h-[100px] w-[200px] rounded-xl bg-pink-200 p-3 ml-5 mt-4">Income amount </div> */}
        <Table className="border-[1px] border-[#b3c5e0] w-[800px] ml-5 mt-5 rounded-xl bg-white p-3 ">
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
      {/* <div className="flex justify-center mt-4 gap-4">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Өмнөх хуудас
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} className={currentPage === index + 1 ? 'font-bold' : ''} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Дараагийн хуудас
        </button>
      </div> */}
    </div>
  );
}
