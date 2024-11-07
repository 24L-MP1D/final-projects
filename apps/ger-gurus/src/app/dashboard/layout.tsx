'use client';
import '@/app/global.css';
import { Login } from '@/components/components/Login';
import { SignedIn } from '@/components/components/SignedIn';
import { SignedOut } from '@/components/components/SignedOut';

import { ToastProvider } from '@/components/providers/toaster-provider';

// const openSans = Open_Sans({
//   subsets: ['latin', 'cyrillic-ext'],
//   weight: ['400', '500', '600', '700'],
// });

// export const metadata = {
//   title: 'Verse dashboard',
//   description: 'verse.mn dashboard',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  function logout() {
    localStorage.removeItem('authtoken');
    window.location.reload();
  }

  return (
    <html>
      <body>
        hi
        <SignedIn>
          <div>Nevtersens</div>
          <ToastProvider />
          {children}
        </SignedIn>
        <SignedOut>
          <div>Guests</div>
          <Login />
        </SignedOut>
      </body>
    </html>
  );
}
