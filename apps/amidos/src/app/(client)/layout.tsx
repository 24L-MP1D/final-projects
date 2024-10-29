import { Suspense } from 'react';
import Footer from '../../components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="m-auto">
        {children}
        <div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
