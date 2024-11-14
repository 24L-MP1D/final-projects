'use client';
import '@/app/global.css';
import { Login } from '@/components/components/Login';
import { SignedIn } from '@/components/components/SignedIn';
import { SignedOut } from '@/components/components/SignedOut';
import { ToastProvider } from '@/components/providers/toaster-provider';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="cupcake">
      <Head>
        <title>Verse Dashboard</title>
        <meta name="description" content="verse.mn dashboard" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Pangolin&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-base-100 text-base-content font-pangolin">
        <SignedIn>
          <ToastProvider />
          {children}
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </body>
    </html>
  );
}
