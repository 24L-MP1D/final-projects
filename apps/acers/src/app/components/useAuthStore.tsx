'use client';

import { create } from 'zustand';

type User = {
  _id: any;
  email: string;
  role: string;
  firstName: string;
};

type AuthState = {
  currentUser: User | null | undefined;
  setCurrentUser: (by: User | null | undefined) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
