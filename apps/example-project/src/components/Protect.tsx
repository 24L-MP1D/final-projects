'use client';

import { useAuthStore } from '@/components/useAuthStore';
import { ReactNode } from 'react';

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
