import { Suspense } from 'react';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </Suspense>
  );
}
