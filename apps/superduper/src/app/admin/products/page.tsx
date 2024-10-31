'use client';
import { AdminLayout } from '@/components/adminLayout';
import { AdminMessageSendDialog } from '@/components/adminMessageSendDialog';
import { FeedBackInput } from '@/components/feedBack';
import { ProductType } from '@/components/productType';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import dayjs from 'dayjs';
import { Send, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<string>('');
  const [feedBackInput, setFeedBackInput] = useState(false);
  const [text, setText] = useState('');

  const loadProduct = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      if (confirm('are you sure ?')) {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        if (response.status == 200) {
          alert('successfully deleted');
        }
      }
      loadProduct();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <AdminLayout>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="flex w-full text-xl text-wrap py-3 bg-slate-200">
              <TableHead className="flex-1">Product Name</TableHead>
              <TableHead className="flex-1">Product Image</TableHead>
              <TableHead className="flex-1">Status</TableHead>
              <TableHead className="flex-1">Qpay</TableHead>
              <TableHead className="flex-1">Start Date</TableHead>
              <TableHead className="flex-1">End Date</TableHead>
              <TableHead className="flex-1">start bid</TableHead>
              <TableHead className="flex-1"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow className="flex items-center text-lg hover:cursor-pointer whitespace-nowrap border-b-2 border-solid">
                  <TableCell className="font-medium flex-1">{product.productName}</TableCell>
                  <TableCell className="font-medium flex-1 flex items-center justify-center">
                    <Image src={product.frontImage} width={500} height={500} className="w-28 h-28 object-cover rounded-full" alt="zurag" />
                  </TableCell>
                  <TableCell className="flex-1">{product.status}</TableCell>
                  <TableCell className="flex-1">Qpay</TableCell>
                  <TableCell className="flex-1">{dayjs(product.startDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell className="flex-1">{dayjs(product.endDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell className="flex-1">{product.startBid}</TableCell>
                  <TableCell className="flex-1 flex gap-4 items-center">
                    <Trash
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                    />

                    <Send
                      onClick={() => {
                        setOpen(true);
                        setProductId(product._id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {open && <AdminMessageSendDialog setFeedBackInput={setFeedBackInput} productId={productId} open={open} loadProduct={loadProduct} setOpen={setOpen} />}
        {feedBackInput && <div className="absolute inset-0 opacity-50 bg-slate-500"></div>}
        {feedBackInput && <FeedBackInput productId={productId} loadProduct={loadProduct} setFeedBackInput={setFeedBackInput} />}
      </div>
      <Toaster />
    </AdminLayout>
  );
};
export default Home;
