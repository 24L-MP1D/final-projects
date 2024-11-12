'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from './ui/button';
import { useAuthStore } from './useAuthStore';

export function Protect({ children, roles }: { children: ReactNode; roles: string[] }) {
  const currentUser = useAuthStore((state) => state.currentUser);

  console.log(currentUser);
  if (currentUser == undefined) {
    return <div>loading</div>;
  }

  const router = useRouter();

  if (currentUser == null) {
    return (
      <div className="flex flex-col gap-3 max-w-[400px] m-auto">
        <span>
          Энэхүү хуудас руу зөвхөн{' '}
          {roles.map((role) => (
            <span className="font-bold">{role}</span>
          ))}{' '}
          эрхтэй хэрэглэгчид нэвтэрнэ.
        </span>
        <div className="flex justify-center gap-2">
          <Button onClick={() => router.push('/register')}>Бүртгүүлэх</Button>
          <Button onClick={() => router.push('/login')}>Нэвтрэх</Button>
        </div>
      </div>
    );
  }

  if (!roles.includes(currentUser.role)) {
    return (
      <div className="flex flex-col gap-3 max-w-[400px] m-auto">
        <span>
          Энэхүү хуудас руу зөвхөн{' '}
          {roles.map((role) => (
            <span className="font-bold">{role}</span>
          ))}{' '}
          эрхтэй хэрэглэгчид нэвтэрнэ.
        </span>
        <span>Та {currentUser.role} эрхтэй байна.</span>
        <div className="flex justify-center gap-2">
          <Button onClick={() => router.push('/subscriptions')}>Эрхээ шинэчлэх</Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
