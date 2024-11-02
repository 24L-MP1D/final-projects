'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function Logincomponent() {
  return (
    <div className="flex flex-col gap-4 m-auto">
      <div className="flex flex-col gap-6">
        <p className="text-tersiaryBlack font-semibold text-2xl self-center">Нэвтрэх</p>
        <div className="flex flex-col gap-4 w-[334px]">
          <div className="flex flex-col gap-2">
            <Input id="email" placeholder="Имэйл хаяг" className="rounded-[18px]" />
          </div>
          <Input id="password" placeholder="Нууц үг" type="password" className="rounded-[18px]" />
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
      <div className="flex flex-col gap-12 w-[334px]">
        <Button className={`rounded-[18px] bg-primaryBlue text-[#FAFAFA] text-sm font-medium hover:bg-blue-700 disabled:opacity-30`} type="submit">
          Нэвтрэх
        </Button>
        <div className="flex flex-col gap-12">
          <Link href="/forgetpass" className="self-center underline text-#71717A text-sm font-normal">
            Нууц үг мартсан
          </Link>
          <Link href="/signup">
            <Button className="bg-white border-primaryBlue border rounded-[18px] text-primaryBlue text-sm font-medium hover:bg-gray-50 w-[334px] self-center">Бүртгүүлэх</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
