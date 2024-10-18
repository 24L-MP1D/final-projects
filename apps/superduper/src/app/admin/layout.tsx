
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

