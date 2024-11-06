'use client';
import axios from 'axios';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './useAuthStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  useEffect(() => {
    axios
      .get('/api/users/me', {
        withCredentials: true,
      })
      .then(({ data }) => setCurrentUser(data))
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return <>{children}</>;
}
