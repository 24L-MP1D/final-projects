'use client';
import axios from 'axios';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './useAuthStore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  useEffect(() => {
    axios
      .get('/api/users/me', { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  // useEffect(() => {
  //   fetcher()
  //     .get('/api/users/me')
  //     .then(({ data }) => {
  //       setCurrentUser(data);
  //     })
  //     .catch(() => {
  //       setCurrentUser(null);
  //     });
  // }, []);
  return <div>{children}</div>;
}
