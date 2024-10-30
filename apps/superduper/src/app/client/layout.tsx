import { Suspense } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div>
        <div>{children}</div>
      </div>
    </Suspense>
  );
}
