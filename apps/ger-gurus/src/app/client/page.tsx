'use client';

import ClientCategory from '@/components/ClientCategory';
import ClientFeature from '@/components/ClientFeature';
import ClientHeader from '@/components/ClientHeader';
import ClientFooter from '@/components/ClientHomeFooter';
import ClientQuote from '@/components/ClientQuote';
import FixButton from '@/components/FixButtons';

export default function Page() {
  return (
    <main>
      <ClientHeader />
      <div className="h-20 w-auto"></div>
      <ClientFeature />
      <ClientQuote />
      <ClientCategory />
      <FixButton />
      <ClientFooter />
    </main>
  );
}
