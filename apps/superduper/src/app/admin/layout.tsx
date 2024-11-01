'use client';
import { createContext, ReactNode, useState } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}
type Context = {
  layoutAside: string;
  setLayoutAside: (value: string) => void;
};
export const Context = createContext<Context | null>(null);

export default function RootLayout({ children }: RootLayoutProps) {
  const [layoutAside, setLayoutAside] = useState('');
  return (
    <div>
      <Context.Provider value={{ layoutAside, setLayoutAside }}>{children}</Context.Provider>
    </div>
  );
}
