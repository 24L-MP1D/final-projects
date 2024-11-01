'use client';

import { Protect } from '@/components/auth/protect';
import { SignedIn } from '@/components/auth/SignedIn';
import { SignedOut } from '@/components/auth/SignedOut';
import SignIn from '@/components/auth/SingIn';
import axios from 'axios';

export default function Layout({ children }: { children: React.ReactNode }) {
  function logOut() {
    axios
      .post('/api/users/logout', {}, { withCredentials: true })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => console.error('errpr', error));
  }
  return (
    <>
      <SignedIn>
        <Protect role="admin">{children}</Protect>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </>
  );
}
