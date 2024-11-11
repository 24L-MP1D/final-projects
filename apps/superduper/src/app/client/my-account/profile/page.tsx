'use client';
import Image from 'next/image';
import { useContext } from 'react';
import { RealtimeNotif } from '../../layout';

export default function App() {
  const value = useContext(RealtimeNotif);

  if (!value?.products.length)
    return (
      <div className="min-h-screen">
        <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] items-center flex">
          <Image src={'/images/spinner.svg'} alt="loading" width={100} height={100} />
          <div className="font-bold text-3xl">Loading...</div>
        </div>
      </div>
    );

  return <div className="min-h-screen bg-slate-[#6b6b6b]"></div>;
}
