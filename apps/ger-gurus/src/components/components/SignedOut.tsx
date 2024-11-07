'use client';

import { ReactNode } from 'react';
import { useAuthStore } from './useAuthStore';

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
