'use client';

import { ReactNode } from 'react';
import { useAuthStore } from './useauthstore';

export function SignedInAmidos({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('accesstoken');
  if (!token) {
    return null;
  }
  const currentUser = useAuthStore((state) => state.currentUser);

  if (currentUser?.role == 'admin') {
    return null;
  }
  return <>{children}</>;
}
