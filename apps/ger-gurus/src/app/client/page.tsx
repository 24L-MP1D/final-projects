'use client';

import { HomePageInfo } from '@/components/HomePageInfo';
import { SchoolPageHeader } from '@/components/SchoolPageHeader';

export default function Page() {
  return (
    <main>
      <SchoolPageHeader />
      <HomePageInfo />
    </main>
  );
}
