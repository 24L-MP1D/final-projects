'use client';

import { HomePageInfo } from '@/components/HomePageInfo';
import { SchoolPageHeader } from '@/components/SchoolPageHeader';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const authtoken = urlParams.get('authtoken');
      if (authtoken) {
        localStorage.setItem('authtoken', authtoken);
        window.history.replaceState({}, document.title, '/');
      }
    }
  }, []);
  return (
    <main>
      <SchoolPageHeader />
      <HomePageInfo />
    </main>
  );
}
