'use client';

import { HomePageInfo } from '@/components/HomePageInfo';
import { SchoolPageHeader } from '@/components/SchoolPageHeader';

export default function Page() {
  return (
    <div>
      <SchoolPageHeader />
      <HomePageInfo />
    </div>
  );
}
