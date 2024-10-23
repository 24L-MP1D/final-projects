'use client';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Page() {
  interface IFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repassword: string;
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => Submit();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm<IFormInputs>();

  function Submit() {
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        console.log('Success');
      } else {
        console.log('Error');
      }
    });
  }
  const password = watch('password', '');
  const email = watch('email', '');
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 8;
  const isValid = hasNumber && hasSpecialChar && hasNumber && hasUpperCase && isValidLength;
  const emailIsValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);

  return (
    <div className=" vh-100% mx-auto">
      <form className="w-[300px] border-[1px] border-slate-50 rounded-md shadow p-4 flex flex-col gap-3  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">Хэрэглэгчээр бүртгүүлэх хэсэг</div>
        <Input type="text" placeholder="Овог" className="border-[1px] border-slate-200 hover:border-slate-400" {...register('firstName', { required: true })} />
        {errors.firstName && <span className="text-red-400 text-[12px] ml-2">Овог нэрээ оруулна уу </span>}
        <Input type="text" placeholder="Нэр" className="border-[1px] border-slate-200 hover:border-slate-400" {...register('lastName', { required: true })} />
        {errors.lastName && <span className="text-red-400 text-[12px] ml-2">Овог нэрээ оруулна уу</span>}
        <Input
          type="text"
          placeholder="И-мэйл"
          className="border-[1px] border-slate-200 hover:border-slate-400"
          {...register('email', {
            required: true,
            validate: {
              emailIsValid: (value) => /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email),
            },
          })}
        />
        {errors.email && <span className="text-red-400 text-[12px] ml-2">И-мэйл хаяг шаардлагатай</span>}
        <Input
          type="password"
          placeholder="Нууц үг"
          className="border-[1px] border-slate-200 hover:border-slate-400"
          {...register('password', {
            required: '**Password is required',
            minLength: { value: 8, message: '**Password must be more than 4 characters' },
            maxLength: { value: 12, message: '**Password cannot exceed more than 12 characters' },
            validate: {
              hasUpperCase: (value) => /[A-Z]/.test(value) || 'Том үсэг агуулсан байх', // Must have an uppercase letter
              hasLowerCase: (value) => /[a-z]/.test(value) || 'Жижиг үсэг агуулсан байх', // Must have a lowercase letter
              hasNumber: (value) => /\d/.test(value) || 'Тоог агуулсан байх', // Must have a number
              hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Тэмдэгт агуулсан байх',
            },
          })}
        />
        {errors.password && (
          <ul className="mt-2 text-[12px] ml-2">
            <li className={hasUpperCase ? 'text-green-500' : 'text-red-400'}>{hasUpperCase ? '✔️ Том үсэг агуулсан' : 'Том үсэг агуулсан байх'}</li>
            <li className={hasLowerCase ? 'text-green-500' : 'text-red-400'}>{hasLowerCase ? '✔️ Жижиг үсэг агуулсан' : 'Жижиг үсэг агуулсан байх'}</li>
            <li className={hasNumber ? 'text-green-500' : 'text-red-400'}>{hasNumber ? '✔️ Тоог агуулсан' : 'Тоог агуулсан байх'}</li>
            <li className={hasSpecialChar ? 'text-green-500' : 'text-red-400'}>{hasSpecialChar ? '✔️ Тэмдэгт агуулсан' : 'Тэмдэгт агуулсан байх'}</li>
            <li className={isValidLength ? 'text-green-500' : 'text-red-400'}>{isValidLength ? '✔️ Хамгийн багадаа 8 тэмдэгт' : 'Хамгийн багадаа 8 тэмдэгт'}</li>
          </ul>
        )}

        <Input
          type="password"
          placeholder="Нууц үг давтах"
          className="border-[1px] border-slate-200 hover:border-slate-400"
          {...register('repassword', { required: 'Password must be same', validate: (value) => value === getValues('password') })}
        />
        {errors.repassword && <span className="text-red-400 text-[12px] ml-2">Нууц үг адилхан байх</span>}
        <Button type="submit" className="bg-blue-200">
          Бүртгүүлэх
        </Button>
        <div className="text-sm text-slate-500 text-center">
          <p className="">Бүртгэлтэй хэрэглэгч бол </p>
          <Link href="/login" className="text-blue-400 ">
            {' '}
            Нэвтрэх
          </Link>
        </div>
      </form>
    </div>
  );
}
