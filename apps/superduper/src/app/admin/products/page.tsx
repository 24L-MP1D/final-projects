'use client';
import { ProductType } from '@/components/productType';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
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

  console.log(products);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="flex w-full text-xl">
            <TableHead className="flex-1">Product Name</TableHead>
            <TableHead className="flex-1">Product Image</TableHead>
            <TableHead className="flex-1">Status</TableHead>
            <TableHead className="flex-1">Qpay</TableHead>
            <TableHead className="flex-1">Created Date</TableHead>
            <TableHead className="flex-1">start bid</TableHead>
            <TableHead className="flex-1"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow className="flex items-center text-lg hover:cursor-pointer whitespace-nowrap">
                <TableCell className="font-medium flex-1">{product.productName}</TableCell>
                <TableCell className="font-medium flex-1 flex items-center justify-center">
                  <Image src={product.frontImage} width={500} height={500} className="w-28 h-28 object-cover rounded-full" alt="zurag" />
                </TableCell>

                <TableCell className="flex-1">{product.status}</TableCell>
                <TableCell className="flex-1">Qpay</TableCell>
                <TableCell className="flex-1">{dayjs(product.createdAt).format('YYYY-MM-DD')}</TableCell>
                <TableCell className="flex-1">{product.startBid}</TableCell>
                <TableCell className="flex-1">
                  <Trash
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default Home;
