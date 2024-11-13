'use client';

import { useAuthStore } from '@/app/components/auth/useAuthStore';
import { ProductType } from '@/components/productType';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
type Qpay = {
  qPay_shortUrl: string;
  qr_image: string;
  urls: URls[];
  invoice_id: string;
  qr_text: string;
};
type URls = {
  logo: string;
  link: string;
  name: string;
};
export default function App() {
  const [getItemFromLocal, setGetItemFromLocal] = useState<ProductType>();
  const [qpayInformation, setQpayInformation] = useState<Qpay>();
  const [paymentStatus, setPaymentStatus] = useState();
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();
  const qpayCheckPayment = async () => {
    const productResponse = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        getFromLocal: getItemFromLocal,
        userId: currentUser?._id,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const productData = await productResponse.json();

    setGetItemFromLocal(undefined);
    localStorage.removeItem('addProduct');
    router.push(`/client/success?id=${productData.insertedId}`);
    const response = await fetch('/api/qpay', {
      method: 'PUT',
      body: JSON.stringify({
        invoice_id: qpayInformation?.invoice_id,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setPaymentStatus(data);
  };
  const QpayGenerate = async () => {
    const response = await fetch(`/api/qpay`, {
      method: 'POST',
      body: JSON.stringify({
        amount: 40000,
        productId: '672dcfdaa245f8231b8747c2',
      }),

      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setQpayInformation(data);
  };
  useEffect(() => {
    QpayGenerate();
    const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
    setGetItemFromLocal(addProductObject);
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <div>{qpayInformation?.qr_text && <QRCode className="w-full h-full max-w-[400px] mx-auto" level="H" value={qpayInformation.qr_text} />}</div>
      <div className="flex justify-center mt-6">
        <Button onClick={qpayCheckPayment}>Төлбөр шалгах</Button>
      </div>
    </div>
  );
}
