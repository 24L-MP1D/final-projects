'use client';

import { HomePageInfo } from '@/components/HomePageInfo';
import { SchoolPageHeader } from '@/components/SchoolPageHeader';

const urlParams = new URLSearchParams(window.location.search);
const authtoken = urlParams.get('authtoken');
if (authtoken) {
  localStorage.setItem('authtoken', authtoken);
  window.history.replaceState({}, document.title, '/');
}

export default function Page() {
  return (
    <div className=" ">
      <SchoolPageHeader />
      <HomePageInfo />
      <div className="h-[2000px] w-[1000px]"></div>
    </div>
  );
}
