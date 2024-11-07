'use client';

import { ReactNode } from 'react';
import { useAuthStore } from './useAuthStore';

export function SignedIn({ children }: { children: ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) {
    return null;
  }
  return <>{children}</>;
}
