'use client';
import { createContext, ReactNode, useState } from 'react';
import { Protection } from '../components/auth/protect';
import { SignedIn } from '../components/auth/signedIn';
import { SignedOut } from '../components/auth/signedOut';
import Signin from '../components/auth/singin';

type AdminLayoutContext = {
  layoutAside: string;
  setLayoutAside: (value: string) => void;
};
export const Context = createContext<AdminLayoutContext | null>(null);

export default function RootLayout({ children }: { children: ReactNode }): any {
  const [layoutAside, setLayoutAside] = useState('');

  return (
    <>
      <SignedIn>
        <Context.Provider value={{ layoutAside, setLayoutAside }}>
          <Protection role="admin">
            <>{children}</>
          </Protection>
        </Context.Provider>
      </SignedIn>
      <SignedOut>
        <Signin />
      </SignedOut>
    </>
  );
}
