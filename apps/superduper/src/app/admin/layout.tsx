'use client';
import { createContext, ReactNode, useState } from 'react';
import { Protection } from '../components/auth/protect';
import { SignedIn } from '../components/auth/signedIn';
import { SignedOut } from '../components/auth/signedOut';
import Signin from '../components/auth/singin';

interface RootLayoutProps {
  children: ReactNode;
}
type adminLayoutContext = {
  layoutAside: string;
  setLayoutAside: (value: string) => void;
};
export const Context = createContext<adminLayoutContext | null>(null);

export default function RootLayout({ children }: RootLayoutProps) {
  const [layoutAside, setLayoutAside] = useState('');

  return (
    <>
      <SignedIn>
        <Protection role="admin">
          <Context.Provider value={{ layoutAside, setLayoutAside }}>{children}</Context.Provider>
        </Protection>
      </SignedIn>
      <SignedOut>
        <Signin />
      </SignedOut>
    </>
  );
}
