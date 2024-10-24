'use client';

import { SchoolPageHeader } from "../../components/SchoolPageHeader";
import { SchoolPageIntroduction } from "../../components/SchoolPageIntroduction";


import { HomePageInfo } from '../../components/HomePageInfo';

export default function Page() {
  return (
    <div className=" ">
        <SchoolPageHeader />
        <SchoolPageIntroduction />
      <HomePageInfo />
    </div>
  );
}
