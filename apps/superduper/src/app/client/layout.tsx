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
};
export const RealtimeNotif = createContext<state | null>(null);
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [notif, setNotif] = useState<notifications[]>([]);
  return (
    <Suspense>
      <div className="max-w-[1280px] mx-auto">
        <Header />
        <RealtimeNotif.Provider value={{ notif, setNotif }}>
          <div>{children}</div>
        </RealtimeNotif.Provider>

        <Footer />
      </div>
    </Suspense>
  );
}
