'use client';

import { fetcher } from '@/lib/fetcher';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './useAuthStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    fetcher()
      .get('/api/user')
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return <>{children}</>;
}
