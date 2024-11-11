'use client';

import { fetcher } from '@/lib/fetcher';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './useAuthStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    fetcher()
      .get('/api/user')
      .then(({ data, status }) => {
        if (status === 200) {
          setCurrentUser(data);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return <>{children}</>;
}
