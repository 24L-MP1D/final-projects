'use client';

import { ReactNode } from 'react';
import { useAuthStore } from './useAuthStore';

export function Protect({ children, role }: { children: ReactNode; role: string }) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) {
    return null;
  }

  if (!currentUser.roles?.includes(role)) {
    return <div>❌ Forbidden</div>;
  }

  return <>{children}</>;
}
