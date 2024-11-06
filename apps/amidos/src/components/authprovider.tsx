'use client';

import { fetcher } from '@/lib/fetcher';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './useauthstore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    fetcher()
      .get('/api/admin/me')
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return <>{children}</>;
}
