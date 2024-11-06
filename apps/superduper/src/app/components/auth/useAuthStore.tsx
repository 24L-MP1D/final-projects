'use client';

import { create } from 'zustand';
export type User = {
  _id: string;
  email: string;
  role: string;
  firstname: string;
};
type AuthState = {
  currentUser: User | null | undefined;
  setCurrentUser: (by: User | null | undefined) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
