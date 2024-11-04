'use client';

import { useAuthStore } from '@/components/useAuthStore';
import { ReactNode } from 'react';

export function SignedIn({ children }: { children: ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) {
    return null;
  }
  return <>{children}</>;
}
