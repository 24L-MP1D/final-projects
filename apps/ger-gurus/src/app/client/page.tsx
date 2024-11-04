'use client';

import { HomePageInfo } from '@/components/HomePageInfo';
import { SchoolPageHeader } from '@/components/SchoolPageHeader';

export default function Page() {
  return (
    <div className=" ">
      <SchoolPageHeader />
      <HomePageInfo />
      <div className="h-[2000px] w-[1000px]"></div>
    </div>
  );
}
