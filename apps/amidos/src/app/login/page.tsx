'use client';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/components/useauthstore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const User = z.object({
  email: z.string().email('Имэйл буруу байна давтан оруулна уу'),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Хамгийн багадаа нэг жижиг үсэг, нэг том үсэг, нэг тэмдэгт орсон байх')
    .min(8, { message: 'Хамгийн багадаа 8 тэмдэгт орсон байх' }),
});
type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

export default function Login() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(User),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    axios
      .post('api/admin/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          reset();
          console.log(res.data.token);
          localStorage.setItem('accesstoken', res.data.token);
          toast.success('Амжилттай нэвтэрлээ');
          setTimeout(() => {
            window.location.href = '/admin/users';
          }, 1000);

          return;
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setLoading(false);
          reset();
          return toast.error('Бүртгэлгүй хэрэглэгч байна. Та бүртгүүлнэ үү');
        } else {
          setLoading(false);
          reset();
          toast.error('Алдаа гарлаа. Дахин оролдоно уу');
        }
      });
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <form className="flex flex-col gap-4 pt-[100px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <p className="text-tersiaryBlack font-semibold text-2xl self-center">Нэвтрэх</p>
          <div className="flex flex-col gap-4 w-[334px]">
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
          </div>
        </div>
        <div className="flex flex-col gap-12 w-[334px]">
          <Button className={`rounded-[18px] bg-[#52071B]  hover:bg-[#8B0000] text-[#FAFAFA] text-sm font-medium  disabled:opacity-30`} type="submit">
            {loading ? (
              <span className="loading loading-spinner loading-md text-white">Уншиж байна...</span>
            ) : (
              <span
                className="text-white
            "
              >
                Нэвтрэх
              </span>
            )}
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-4 items-center">
        <Link href="/forgotpass" className="underline">
          Нууц үг сэргээх
        </Link>
        <Link href="/signup">
          <Button className="bg-white border-primaryBlue border rounded-[18px] text-primaryBlue text-sm font-medium hover:bg-gray-50 w-[334px] text-center" type="button">
            Бүртгүүлэх
          </Button>
        </Link>
      </div>
    </div>
  );
}
