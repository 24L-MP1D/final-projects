'use client';

import { createContext, Suspense, useState } from 'react';
import Footer from '../components/layout/footer';
import Header, { notifications } from '../components/layout/header';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}
export type state = {
  notif: notifications[];
  setNotif: (value: notifications[]) => void;
  favourite: string[];
  setFavourite: (value: string[]) => void;
  setSearchValue: (value: string) => void;
  searchValue: string;
};

export const RealtimeNotif = createContext<state | null>(null);
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [favourite, setFavourite] = useState<string[]>([]);

  const [notif, setNotif] = useState<notifications[]>([]);
  const [searchValue, setSearchValue] = useState('');
  return (
    <Suspense>
      <div className="max-w-[1280px] mx-auto">
        <RealtimeNotif.Provider value={{ notif, favourite, searchValue, setSearchValue, setFavourite, setNotif }}>
          <Header />
          <div>{children}</div>
        </RealtimeNotif.Provider>

        <Footer />
      </div>
    </Suspense>
  );
}
