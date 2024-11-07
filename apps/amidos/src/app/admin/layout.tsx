'use client';

import { AuthProvider } from '@/components/authprovider';
import { Logout } from '@/components/logout';
import { Protect } from '@/components/protect';
import { SignedInAmidos } from '@/components/signedin';
import { SignedOutAmidos } from '@/components/signedout';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <AuthProvider>
        <Protect role="admin">{children}</Protect>
      </AuthProvider>
      <SignedOutAmidos>
        <div className="flex flex-col justify-center items-center gap-4 mt-24">
          <div className="text-7xl font-bold">404</div>
          <div className="text-lg font-medium">Сайн байна уу. Та нэвтрэх шаардлагатай байна!</div>
          <Link href="/login">
            <Button>Нэвтрэх хэсэг рүү шилжих</Button>
          </Link>
        </div>
      </SignedOutAmidos>
      <SignedInAmidos>
        <Logout />
      </SignedInAmidos>
    </div>
  );
}
