import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
      <html lang="en">
        <body>
          <div className="bg-[#F7F7F8]">
          {children}         
          </div>
        </body>
      </html>
    );
  }
