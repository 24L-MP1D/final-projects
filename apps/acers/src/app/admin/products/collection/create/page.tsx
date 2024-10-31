'use client';

import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreateCollection from './createCollection';

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex">
      <UsefulDiv>
        <button
          onClick={() => {
            router.push('/admin/products/collection');
          }}
        >
          <MoveLeft size={20} />
        </button>
        <CreateCollection />
      </UsefulDiv>
    </div>
  );
}

const UsefulDiv = ({ children }: { children: any }) => {
  return <div className="p-4 border-slate-600 border-[1px] rounded-2xl">{children}</div>;
};
