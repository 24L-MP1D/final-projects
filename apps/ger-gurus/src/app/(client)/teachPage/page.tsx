'use client';

import { SchoolPageHeader } from "../../components/SchoolPageHeader";
import { SchoolPageIntroduction } from "../../components/SchoolPageIntroduction";


import { HomePageInfo } from '../../components/HomePageInfo';
import { School } from '../../components/School';

export default function Page() {
  return (
    <div className=" ">
        <SchoolPageHeader />
        <SchoolPageIntroduction />
      <School />
      <HomePageInfo />
    </div>
  );
}
