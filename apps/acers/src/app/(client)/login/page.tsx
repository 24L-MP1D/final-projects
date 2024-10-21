'use client';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Page() {
  // function Submit() {
  //   fetch('api/user', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((res) => {
  //     if (res.ok) {
  //       console.log('Success');
  //     } else {
  //       console.log('Error');
  //     }
  //   });
  // }

  return (
    <div className=" vh-100% mx-auto">
      <div className="w-[250px] border-[1px] border-slate-50 rounded-md shadow p-4 flex flex-col gap-3   mx-auto">
        <div className="text-center"> Нэвтрэх</div>

        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="И-мэйл" className="border-[1px] border-slate-200 hover:border-slate-400 hover:bg-slate-50" />
          <Input type="text" placeholder="Нууц үг" className="border-[1px] border-slate-200 hover:border-slate-400" />
          <Button className="bg-blue-200">Нэвтрэх</Button>
        </div>
        <div className="text-sm text-slate-500 text-center">
          <p className="">Шинэ хэрэглэгч?</p>
          <Link href="/register" className="text-blue-400">
            {' '}
            Бүртгүүлэх
          </Link>
        </div>
      </div>
    </div>
  );
}
