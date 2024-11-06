'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Page() {
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  function Submit() {
    setLoading(true);
    const email = JSON.parse(localStorage.getItem('email') || '{}');
    axios
      .put('/api/forgotPassword/otp', { otp: otpCode, email })
      .then(({ data, status, statusText }) => {
        if (status === 200) {
          toast('Successful!');
          window.location.href = '/client/forgotten-resetPassword';
        } else {
          status === 404;
          toast('Insert your OTP number!');
        }
        console.log(data);
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
        <p className="text-[24px] font-bold mt-8">ОТП дугаараа оруулна уу</p>
        <p>ОТП дугаараа оруулаад ИЛГЭЭХ товчийг дарна уу.</p>
        <div>
          <input placeholder="Insert OTP" className="border-2 bg-slate-50 rounded-3xl w-full p-3" onChange={(e) => setOtpCode(e.target.value)} />
        </div>
        <Button onClick={Submit} className="bg-blue-500 mb-8" disabled={loading}>
          {loading && <Image src={'/image/spinner.svg'} alt="a" width={40} height={40} />}
          <div>Илгээх</div>
        </Button>
        <Toaster />
      </div>
    </div>
  );
}