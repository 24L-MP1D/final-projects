'use client';

import { useAuthStore } from '@/components/useAuthStore';
import { ReactNode } from 'react';

export function SignedOut({ children }: { children: ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (currentUser === undefined) {
    return null;
  }

  if (currentUser !== null) {
    return null;
  }
  return <>{children}</>;
}
