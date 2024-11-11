'use client';

import ClientCategory from '@/components/ClientCategory';
import ClientFeature from '@/components/ClientFeature';
import ClientHeader from '@/components/ClientHeader';
import ClientQuote from '@/components/ClientQuote';

export default function Page() {
  return (
    <main>
      <ClientHeader />
      <div className="h-20 w-auto"></div>
      <ClientFeature />
      <ClientQuote />
      <ClientCategory />
      <div className="h-[2000px] w-auto"></div>
    </main>
  );
}
