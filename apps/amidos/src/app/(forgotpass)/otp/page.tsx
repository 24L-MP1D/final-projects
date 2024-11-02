'use client';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type OTPData = {
  otp: string[];
};

export default function Confirm() {
  const [recoveryemail, setRecoveryEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPData>();

  useEffect(() => {
    const email = localStorage.getItem('otpemail');
    setRecoveryEmail(email);
  }, []);

  const onSubmit: SubmitHandler<OTPData> = (data) => {
    console.log('hello');
    const otpCode = data.otp.join('');
    axios
      .post('/api/admin/otpget', { recoveryemail: recoveryemail, otp: otpCode })
      .then((res) => {
        if (res.status === 200) {
          (window as Window).location = '/renew';
          localStorage.removeItem('otpemail');
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          window.location.href = '/forgotpass';
        } else {
          toast.error('Алдаа гарлаа. Дахин оролдоно уу');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-5 py-20">
        <h1 className="text-lg text-[#09090B] font-semibold">Баталгаажуулах</h1>
        <h2 className="text-nowrap text-[#18181B]">{recoveryemail} хаягт илгээсэн баталгаажуулах кодыг оруулна уу</h2>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} {...register('otp.0', { required: true })} />
            <InputOTPSlot index={1} {...register('otp.1', { required: true })} />
            <InputOTPSlot index={2} {...register('otp.2', { required: true })} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} {...register('otp.3', { required: true })} />
            <InputOTPSlot index={4} {...register('otp.4', { required: true })} />
            <InputOTPSlot index={5} {...register('otp.5', { required: true })} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-[#71717A] text-sm">Дахин илгээх (30)</div>
        <Button className="w-full max-w-[334px] mx-auto bg-[#2563EB] rounded-full" type="submit">
          Баталгаажуулах
        </Button>
      </div>
    </form>
  );
}
