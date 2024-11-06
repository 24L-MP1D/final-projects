'use client';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
const User = z
  .object({
    username: z.string().min(1, { message: 'Хамгийн багадаа 1 оронтой байх шаардлагатай' }),
    email: z.string().email('Имэйл буруу байна давтан оруулна уу'),
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
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
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
    axios
      .post('api/admin/signup', {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          reset();
          toast.success('Амжилттай бүртгэгдлээ');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        if (error.response.status === 400) {
          reset();
          toast.error('Бүртгэгдсэн хэрэглэгч байна. Нэвтрэх хэсэг рүү чиглүүлж байна');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          return;
        } else if (error.response.status === 402 && error.data === 'Нэр хамгийн багадаа 2 үсэг орсон байх') {
          return toast.error('Нэр хамгийн багадаа 2 үсэг орсон байх');
        } else if (error.response.status === 402 && error.data === 'Имэйл буруу байна') {
          return toast.error('Имэйл буруу байна');
        } else if (error.response.status === 402 && error.data === 'Нууц үг шаардлага хангахгүй байна') {
          return toast.error('Нууц үг шаардлага хангахгүй байна');
        } else toast.error('Алдаа гарлаа. Дахин оролдоно уу');
      });
  };

  return (
    <div className="flex flex-col gap-12 items-center">
      <form className="flex flex-col gap-4 pt-[100px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <p className="text-tersiaryBlack font-semibold text-2xl self-center">Бүртгүүлэх</p>
          <div className="flex flex-col gap-4 w-[334px]">
            <Input id="name" placeholder="Нэр" className="rounded-[18px]" {...register('username', { required: 'Нэрээ оруулна уу' })} />
            {errors.username && (
              <span role="alert" className="text-red-600">
                {errors.username.message}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <Input id="email" placeholder="Имэйл хаяг" className="rounded-[18px]" {...register('email', { required: 'Имэйл хаягаа оруулна уу' })} />
              {errors.email && (
                <span role="alert" className="text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>
            <Input id="password" placeholder="Нууц үг" type="password" className="rounded-[18px]" {...register('password', { required: 'Нууц үгээ оруулна уу' })} />
            {errors.password && (
              <span role="alert" className="text-red-600">
                {errors.password.message}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <Input id="confirmedPassword" placeholder="Нууц үг давтах" type="password" className="rounded-[18px]" {...register('confirmedPassword', { required: 'Нууц үгээ давтан оруулна уу' })} />
              {errors.confirmedPassword && (
                <span role="alert" className="text-red-600">
                  {errors.confirmedPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-[334px]">
          <Button className={`rounded-[18px] bg-[#52071B]  hover:bg-[#8B0000] text-[#FAFAFA] text-sm font-medium  disabled:opacity-30`} type="submit">
            {loading ? <span className="loading loading-spinner loading-md text-white">Уншиж байна...</span> : <span className="text-red">Үүсгэх</span>}
          </Button>
        </div>
      </form>
      <Link href="/login">
        <Button className="bg-white border-primaryBlue border rounded-[18px] text-primaryBlue text-sm font-medium hover:bg-gray-50 w-[334px] text-center" type="button">
          Нэвтрэх
        </Button>
      </Link>
    </div>
  );
}
