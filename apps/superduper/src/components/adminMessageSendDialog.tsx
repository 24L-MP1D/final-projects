import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductType } from './productType';
import { Dialog, DialogContent, DialogHeader } from './ui/Dialog';
import { BackgroundGradient } from './ui/background-gradiant';
import { Button } from './ui/button';

type AdminMessageSendDialog = {
  open: boolean;
  setOpen: (value: boolean) => void;
  productId: string;
  loadProduct: () => void;
  setFeedBackInput: (value: boolean) => void;
};
export const AdminMessageSendDialog = ({ open, productId, setFeedBackInput, loadProduct, setOpen }: AdminMessageSendDialog) => {
  const [product, setProduct] = useState<ProductType>();

  const updateProductStatus = async (status: string) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({
          status,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      loadProduct();
      setOpen(false);
    } catch (err) {
      throw new Error('update hiihed aldaa garlaa');
    }
  };
  const oneProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    oneProduct();
  }, []);

  if (!product) return;
  <Dialog open={open}>
    <DialogContent className="sm:max-w-md px-2 py-6 text-center content-center">
      <div>ачааллаж байна...</div>
    </DialogContent>
  </Dialog>;
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <DialogHeader className="flex items-end">
            <X className="flex-1 hover:cursor-pointer " onClick={() => setOpen(false)} />
          </DialogHeader>
          <Image src={product.frontImage} alt="jordans" height="400" width="400" className="object-contain" />
          <div className="text-2xl text-black dark:text-neutral-200">Бүтээгдэхүүний нэр: {product.productName}</div>
          <div className="text-2xl">Үнийн санал эхлүүлэх: {product.startBid}</div>
          <div className="text-2xl">Төлөв: {product.status}</div>
          <div className="flex gap-4 mt-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-800" onClick={() => updateProductStatus('Accept')}>
            Зөвшөөрөх
            </Button>
            <Button
              onClick={() => {
                setFeedBackInput(true);
                setOpen(false);
              }}
              className="flex-1 bg-red-700 hover:bg-red-800"
            >
              Үгүйсгэх
            </Button>
          </div>
        </BackgroundGradient>
      </DialogContent>
    </Dialog>
  );
};
