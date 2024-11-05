'use client';

import { ReactNode } from 'react';
import { useAuthStore } from './useauthstore';

export function SignedOutAmidos({ children }: { children: ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const token = localStorage.getItem('accesstoken');
  if (token) {
    return null;
  }
  if (currentUser === undefined) {
    return null;
  }

  if (currentUser !== null) {
    return null;
  }
  return <>{children}</>;
}
