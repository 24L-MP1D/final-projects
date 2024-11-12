'use client';

import axios from 'axios';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './useAuthStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const checkMe = async () => {
    const token = localStorage.getItem('authtoken');
    const res = await axios.get('/api/user/me', { headers: { authtoken: token } });
    if (!res.data) {
      setCurrentUser(null);
    }
    setCurrentUser(res.data);
  };

  useEffect(() => {
    checkMe();
  }, []);

  return <>{children}</>;
}
