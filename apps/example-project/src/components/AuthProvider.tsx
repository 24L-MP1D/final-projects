'use client';

import { fetcher } from '@/lib/fetcher';
import { ReactNode, useEffect } from 'react';
import { create } from 'zustand';

type User = {
  _id: string;
  email: string;
  role: string;
  displayName: string;
};

type AuthState = {
  currentUser: User | null | undefined;
  setCurrentUser: (by: User | null | undefined) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

export function AuthProvider({ children }: { children: ReactNode }) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    fetcher()
      .get('/api/users/me')
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return <>{children}</>;
}
