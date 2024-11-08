'use client';

import { ReactNode } from 'react';
import { toast } from 'sonner';

import { useAuthStore } from './useauthstore';

export function Protect({ children, role }: { children: ReactNode; role: string }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) {
    toast.error('Бүртгэлгүй байна! Бүртгүүлэх хуудас руу чиглүүлж байна...');
    
    return;
  }
  console.log;

  if (currentUser.role != role) {
    toast.error('Админ эрхгүй хэрэглэгч байна! Нэвтрэх хуудас руу чиглүүлж байна');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
    return;
  }

  return <>{children}</>;
}
