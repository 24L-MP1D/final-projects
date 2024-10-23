'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Login() {
  interface Login {
    email: string;
    password: string;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Login>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Login> = async ({ email, password }) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const token = await response.json();
      console.log(token);
      console.log('Login successful');
      localStorage.setItem('authtoken', token.authtoken);
      router.push('/register');
    } else {
      console.error('Login failed');
      alert('Login failed');
    }
  };

  return (
    <div className="vh-100 mx-auto">
      <form className="w-[250px] border-[1px] border-slate-50 rounded-md shadow p-4 flex flex-col gap-3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">Нэвтрэх</div>
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="И-мэйл" className="border-[1px] border-slate-200 hover:border-slate-400 hover:bg-slate-50" {...register('email', { required: true })} />
          {errors.email && <span className="text-red-400 text-[12px] ml-2">Email-ээ оруулна уу</span>}

          <Input type="password" placeholder="Нууц үг" className="border-[1px] border-slate-200 hover:border-slate-400" {...register('password', { required: true })} />
          {errors.password && <span className="text-red-400 text-[12px] ml-2">Нууц үгээ оруулна уу</span>}

          <Button className="bg-blue-200" type="submit">
            Нэвтрэх
          </Button>
        </div>
        <div className="text-sm text-slate-500 text-center">
          <p className="">Шинэ хэрэглэгч?</p>
          <Link href="/register" className="text-blue-400">
            Бүртгүүлэх
          </Link>
        </div>
      </form>
    </div>
  );
}
