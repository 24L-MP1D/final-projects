'use client';

import { Login } from '@/components/Login';
import { Protect } from '@/components/Protect';
import { SignedIn } from '@/components/SignedIn';
import { SignedOut } from '@/components/SignedOut';

export default function Layout({ children }: { children: React.ReactNode }) {
  function logout() {
    localStorage.removeItem('authToken');
    window.location.reload();
  }

  return (
    <>
      <SignedIn>
        <button className="btn" onClick={logout}>
          Logout
        </button>
        <Protect role="admin1">{children}</Protect>
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </>
  );
}
