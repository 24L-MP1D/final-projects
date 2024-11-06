'use client';

import { Suspense } from 'react';
import { DashboardAside } from './components/DashboardAside';

export default function Home() {
  return (
    <div>
      <Suspense>
        <DashboardAside />
      </Suspense>
    </div>
  );
}
