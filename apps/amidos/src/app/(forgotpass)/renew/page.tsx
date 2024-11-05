'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
const User = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Хамгийн багадаа нэг жижиг үсэг, нэг том үсэг, нэг тэмдэгт орсон байх')
      .min(8, { message: 'Хамгийн багадаа 8 тэмдэгт орсон байх' }),
    confirmedPassword: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Хамгийн багадаа нэг жижиг үсэг, нэг том үсэг, нэг тэмдэгт орсон байх')
      .min(8, { message: 'Хамгийн багадаа 8 тэмдэгт орсон байх' }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: 'Давтан нууц үг буруу байна',
    path: ['confirmedPassword'],
  });
type Inputs = {
  password: string;
  confirmedPassword: string;
};

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  useEffect(() => {
    const OTP = localStorage.getItem('otp');
    setOtp(OTP ?? '');
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(User),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    const email = localStorage.getItem('otpemail');
    reset();
    axios
      .put('api/admin/renewpass', {
        email: email,
        password: data.password,
        otp: otp,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          reset();
          toast.success('Нууц үг амжилттай шинэчилэгдлээ. Нэвтрэх хэсэг рүү чиглүүлж байна...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          localStorage.removeItem('otpemail');
          localStorage.removeItem('otp');
          return;
        }
      })
      .catch(function (error) {
        if (error.status == 401) {
          setLoading(false);
          reset();
          toast.error('Дээрх хэрэглэгч олдсонгүй');
        }
        setLoading(false);
        reset();
        toast.error('Алдаа гарлаа дахин оролдоно уу');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-[334px] mx-auto grid gap-5 py-20">
        <h1 className="text-lg text-[#09090B] font-semibold text-center">Нууц үг сэргээх</h1>
        <Input type="password" placeholder="Шинэ нууц үг" className="rounded-full" {...register('password', { required: 'Нууц үгээ оруулна уу' })} />
        {errors.password && (
          <span role="alert" className="text-red-600">
            {errors.password.message}
          </span>
        )}
        <Input type="password" placeholder="Шинэ нууц үг давтах" className="rounded-full" {...register('confirmedPassword', { required: 'Нууц үгээ давтан оруулна уу' })} />
        {errors.confirmedPassword && (
          <span role="alert" className="text-red-600">
            {errors.confirmedPassword.message}
          </span>
        )}
        <Button className="w-full bg-[#52071B]  hover:bg-[#8B0000] rounded-full" type="submit">
          {loading ? (
            <span className="loading loading-spinner loading-md text-white">Уншиж байна...</span>
          ) : (
            <span
              className="text-white
            "
            >
              Нууц үг шинэчлэх
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
