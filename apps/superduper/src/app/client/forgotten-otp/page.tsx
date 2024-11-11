'use client';

import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/Input OTP';
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

  console.log(otpCode);
  return (
    <div>
      <div className=" container mx-auto w-[500px] border-2 rounded-lg mt-[50px] flex flex-col gap-6">
        <p className="text-[24px] font-bold mt-8 text-center">ОТП дугаараа оруулна уу</p>
        <p>ОТП дугаараа оруулаад ИЛГЭЭХ товчийг дарна уу.</p>

        <div className="flex justify-center">
          <InputOTP onChange={setOtpCode} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

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
