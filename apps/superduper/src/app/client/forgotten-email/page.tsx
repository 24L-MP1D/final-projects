'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function Submit() {
    setLoading(true);
    axios
      .put('/api/forgotPassword/email', { email })
      .then(({ data, status, statusText }) => {
        localStorage.setItem('email', JSON.stringify(data.email));
        if (status === 200) {
          toast('Имэйлээ шалгана уу!');
          window.location.href = '/client/forgotten-otp';
        } else {
          status === 404;
          toast('Энэ и-мэйл бүртгүүлээгүй байна!');
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        toast(message);
        console.log(message);
        setLoading(false);
      });
  }

  return (
    <div>
      <div className=" container mx-auto w-[500px] border-2 rounded-lg mt-[50px] flex flex-col gap-6">
        <p className="text-[24px] font-bold mt-8">Имэйл хаягаа оруулна уу</p>
        <p>Имэйл хаягаа оруулаад ИЛГЭЭХ товчийг дарна уу. Та таван минутын дотор ОТП дугаартай имэйл хүлээн авах болно.</p>
        <div>
          <input onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="border-2 bg-slate-50 rounded-3xl w-full p-3" />
        </div>
        <Button className="bg-blue-500 mb-8 disabled:cursor-not-allowed" onClick={Submit} disabled={loading}>
          {loading && <Image src={'/images/spinner.svg'} alt="a" width={40} height={40} />}
          <div>Илгээх</div>
        </Button>
        <Toaster />
      </div>
    </div>
  );
}
