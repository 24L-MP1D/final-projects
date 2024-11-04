'use client';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Confirm() {
  const [recoveryemail, setRecoveryEmail] = useState<string | null>(null);
  const [otp, setOPT] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('otpemail');
    setRecoveryEmail(email);
  }, []);

  function onSubmit() {
    localStorage.setItem('otp', otp);
    const res = axios
      .post('api/admin/otpget', {
        recoveryemail,
        otp,
      })
      .then((res) => {
        if (res.status === 200) {
          (window as Window).location = '/renew';
          localStorage.removeItem('otp');
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          toast.error('Бүртгэлгүй хэрэглэгч байна. Та бүртгүүлнэ үү');
          localStorage.removeItem('otp');
          return;
        } else {
          toast.error('Алдаа гарлаа. Дахин оролдоно уу');
          localStorage.removeItem('otp');
        }
      });
  }

  return (
    <div className="flex flex-col items-center gap-5 py-20">
      <h1 className="text-lg text-[#09090B] font-semibold">Баталгаажуулах</h1>
      <h2 className="text-nowrap text-[#18181B]">{recoveryemail} хаягт илгээсэн баталгаажуулах кодыг оруулна уу</h2>

      <InputOTP maxLength={6} value={otp} onChange={setOPT}>
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
      <Button className="w-full max-w-[334px] mx-auto bg-[#2563EB] rounded-full" onClick={onSubmit}>
        Баталгаажуулах
      </Button>
    </div>
  );
}
