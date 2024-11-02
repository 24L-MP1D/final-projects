'use client';

import { createContext, Suspense, useState } from 'react';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
type Context = {
  frontImage: File | null;
  backImage: File | null;
  detailImage: File | null;
  signatureImage: File | null;
  damagedImage: File | null;
  setFrontImage: (value: File) => void;
  setBackImage: (value: File) => void;
  setDetailImage: (value: File) => void;
  setSignatureImage: (value: File) => void;
  setDamagedImage: (value: File) => void;
  additionalImage: File | null;
  setAdditionalImage: (value: File) => void;
};
export const Context = createContext<Context | null>(null);
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [frontImage, setFrontImage] = useState<File | null>(null);

  const [backImage, setBackImage] = useState<File | null>(null);

  const [additionalImage, setAdditionalImage] = useState<File | null>(null);
  const [detailImage, setDetailImage] = useState<File | null>(null);

  const [signatureImage, setSignatureImage] = useState<File | null>(null);

  const [damagedImage, setDamagedImage] = useState<File | null>(null);

  return (
    <Suspense>
      <div>
        <Header />
        <Context.Provider
          value={{
            frontImage,
            additionalImage,
            setAdditionalImage,
            setFrontImage,
            setBackImage,
            setDetailImage,
            setSignatureImage,
            setDamagedImage,
            backImage,
            detailImage,
            signatureImage,
            damagedImage,
          }}
        >
          <div>{children}</div>
        </Context.Provider>
        <Footer />
      </div>
    </Suspense>
  );
}
